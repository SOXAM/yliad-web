import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import "./ui/layout.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yliad",
  description: "yliad web frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="container">
          <Header/>
          <div className="main">
            <Sidebar/>
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
