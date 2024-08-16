import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-container flex-col p-4 justify-between  min-h-screen">
          <div className="flex-2">
            <Header />
          </div>
          <div className="flex-8 flex-grow ">{children}</div>
          <div className="flex-2">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
