import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";

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
    <html className="h-full bg-gray-100">
      <body className="h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
