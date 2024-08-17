"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/Auth/AuthContext";

const Header = dynamic(() => import("@/components/Layout/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Layout/Footer"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-container flex-col p-4 justify-between  min-h-screen">
            <div className="flex-4">
              <Header />
            </div>
            <div className="flex-4 flex-grow">{children}</div>
            <div className="flex-4">
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
