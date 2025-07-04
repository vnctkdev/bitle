import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{
        margin: 0,
        background: '#181A20',
        color: '#fff',
        fontFamily: 'Pretendard, sans-serif',
      }}>
        <header style={{
          width: '100%',
          height: 64,
          background: '#1a1d23cc',
          borderBottom: '1px solid #23272f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          backdropFilter: 'blur(8px)',
        }}>
          <a href="/" className="bitle-nav-logo">
            Bitle
          </a>
          <nav style={{ display: 'flex', gap: 24 }}>
            <a href="/chart" className="bitle-nav-link">
              차트
            </a>
          </nav>
        </header>
        <div style={{ paddingTop: 72, minHeight: '100vh' }}>
          {children}
        </div>
        <style>{`
          .bitle-nav-link {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 8px;
            transition: background 0.2s;
            background: none;
          }
          .bitle-nav-link:hover {
            background: #23272f;
          }
          .bitle-nav-logo {
            font-weight: 700;
            font-size: 24px;
            color: #fff;
            text-decoration: none;
            letter-spacing: -1px;
          }
        `}</style>
      </body>
    </html>
  )
}
