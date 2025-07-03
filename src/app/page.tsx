import Image from "next/image";

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181A20 60%, #23272f 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Pretendard, sans-serif',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -120,
        left: -120,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, #00e67633 0%, #181A2000 80%)',
        zIndex: 0,
        filter: 'blur(8px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: -120,
        right: -120,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, #2979ff33 0%, #181A2000 80%)',
        zIndex: 0,
        filter: 'blur(8px)'
      }} />
      <div style={{ zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.2rem', letterSpacing: '-2px', lineHeight: 1.1 }}>
          Bitle
        </h1>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 400, color: '#aaa', marginBottom: '2rem' }}>
          AI 기반 실시간 금융 데이터 분석 서비스
        </h2>
        <p style={{ color: '#bbb', lineHeight: 1.7, marginBottom: 32 }}>
          전 세계 주식, 코인, 외환 시장의 데이터를 실시간으로 분석하고,<br />
          복잡한 지표와 AI로 트레이딩 전략을 똑똑하게 추천해드립니다.<br />
          <br />
          데이터 기반의 과학적 투자를 지금 경험해보세요.
        </p>
        <a href="/chart" className="bitle-cta-btn">
          시작하기
        </a>
      </div>
      <style>{`
        .bitle-cta-btn {
          display: inline-block;
          background: linear-gradient(90deg, #00e676 0%, #2979ff 100%);
          color: #181A20;
          font-weight: 700;
          font-size: 18px;
          padding: 14px 40px;
          border-radius: 32px;
          text-decoration: none;
          box-shadow: 0 4px 24px #00e67622;
          transition: transform 0.15s;
        }
        .bitle-cta-btn:hover {
          transform: scale(1.04);
        }
      `}</style>
    </main>
  );
}
