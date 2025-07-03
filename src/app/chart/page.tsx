"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Area, AreaChart } from "recharts";

// 비트코인 가격 데이터를 1분 단위로 30분치 가져오는 함수 (Blockchain.com API 사용)
async function fetchBTC() {
  const res = await fetch("https://api.blockchain.com/v3/exchange/tickers/BTC-USD");
  if (!res.ok) throw new Error("데이터를 불러올 수 없습니다");
  return res.json();
}

// 이동평균선 계산 함수
function movingAverage(data: number[], window: number): (number|null)[] {
  return data.map((_, idx, arr) => {
    if (idx < window - 1) return null;
    const slice = arr.slice(idx - window + 1, idx + 1);
    return slice.reduce((a, b) => a + b, 0) / window;
  });
}

// RSI 계산 함수
function rsi(data: number[], period = 14): (number|null)[] {
  let rsis: (number|null)[] = [];
  let gains = 0, losses = 0;
  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (i <= period) {
      if (diff > 0) gains += diff;
      else losses -= diff;
      rsis.push(null);
      continue;
    }
    if (i === period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsis.push(100 - 100 / (1 + rs));
      continue;
    }
    const prevRsi = rsis[rsis.length - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    gains = ((gains * (period - 1)) + gain) / period;
    losses = ((losses * (period - 1)) + loss) / period;
    const rs = losses === 0 ? 100 : gains / losses;
    rsis.push(100 - 100 / (1 + rs));
  }
  rsis.unshift(null); // 첫 데이터는 null
  return rsis;
}

export default function ChartPage() {
  const [data, setData] = useState<any[]>([]);
  const [price, setPrice] = useState<number|null>(null);

  // 1분마다 가격을 가져와서 차트 데이터에 추가 (최대 30분치)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let time = new Date();
    fetchBTC().then((d) => {
      setPrice(d.last_trade_price);
      setData([{ time: time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), price: d.last_trade_price }]);
    });
    interval = setInterval(async () => {
      const d = await fetchBTC();
      time = new Date();
      setPrice(d.last_trade_price);
      setData((prev) => [
        ...prev.slice(-29), // 최근 30개(30분)만 유지
        { time: time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), price: d.last_trade_price },
      ]);
    }, 60 * 1000); // 1분마다
    return () => clearInterval(interval);
  }, []);

  // MA, RSI 계산
  const prices = data.map(d => d.price);
  const ma5 = movingAverage(prices, 5);
  const ma20 = movingAverage(prices, 20);
  const rsi14 = rsi(prices, 14);

  // 차트 데이터에 MA, RSI 추가
  const chartData = data.map((d, i) => ({
    ...d,
    ma5: ma5[i],
    ma20: ma20[i],
    rsi: rsi14[i],
  }));

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #181A20 60%, #23272f 100%)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "Pretendard, sans-serif",
      padding: 24,
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: '32px 0 8px 0' }}>비트코인 실시간 차트</h1>
      <div style={{ color: "#00e676", fontSize: 24, marginBottom: 24 }}>
        {price ? `₩${price.toLocaleString()} (USD)` : "로딩 중..."}
      </div>
      <div style={{ width: "100%", maxWidth: 700, height: 340, background: "#23272f", borderRadius: 16, padding: 16, marginBottom: 32, boxShadow: '0 4px 24px #00e67611' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#222" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#aaa" fontSize={12} />
            <YAxis stroke="#aaa" fontSize={12} domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "#222", border: "none", color: "#fff" }} />
            <Legend iconType="plainline" wrapperStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="price" stroke="#00e676" strokeWidth={2} dot={false} name="가격" />
            <Line type="monotone" dataKey="ma5" stroke="#2979ff" strokeWidth={2} dot={false} name="MA(5)" />
            <Line type="monotone" dataKey="ma20" stroke="#ffb300" strokeWidth={2} dot={false} name="MA(20)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", maxWidth: 700, height: 120, background: "#23272f", borderRadius: 16, padding: 16, boxShadow: '0 4px 24px #2979ff11' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#aaa" fontSize={12} />
            <YAxis stroke="#aaa" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "#222", border: "none", color: "#fff" }} />
            <Area type="monotone" dataKey="rsi" stroke="#2979ff" fill="#2979ff33" name="RSI(14)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ color: '#aaa', fontSize: 14, marginTop: 24, textAlign: 'center', maxWidth: 600 }}>
        <b>설명:</b> 가격(초록), MA(5, 파랑), MA(20, 노랑), RSI(아래 영역, 파랑) <br />
        실시간 데이터는 1분 단위로 30분치까지 보여집니다.<br />
        (MA, RSI는 데이터가 충분히 쌓이면 자동 계산됩니다)
      </div>
    </main>
  );
} 