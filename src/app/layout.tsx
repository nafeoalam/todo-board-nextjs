import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col p-4 justify-between h-screen bg-black text-orange-400">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
