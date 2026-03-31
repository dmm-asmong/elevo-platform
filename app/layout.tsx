import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/layout/SideNav";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELEVO 교육 플랫폼",
  description: "AI·코딩 입문자를 위한 바이브코딩, 생성형AI, NotebookLM, GWS 커리큘럼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${syne.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen flex">
        <SideNav />
        <main className="flex-1 ml-0 lg:ml-[280px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
