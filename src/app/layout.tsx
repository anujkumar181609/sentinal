import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Sentinel — AI-Powered Anti-Money Laundering Intelligence System',
  description:
    'A cinematic interactive presentation engine for Sentinel AML AI, featuring persistent 3D world architecture, GNN graph intelligence, real-time streaming feature extraction, and automated FinCEN SAR generation.',
  keywords: [
    'Anti-Money Laundering',
    'AML AI Engine',
    'Graph Neural Networks',
    'FinCEN SAR Generation',
    'ISO 20022 Stream Ingestion',
    'SHAP Explainable AI',
    'FATF Compliance',
  ],
  authors: [{ name: 'Sentinel AI Architecture Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-[#0A0A0A] text-white selection:bg-[#C5A880]/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
