// app/layout.tsx or app/root/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";


type RootLayoutProps = {
  children: ReactNode;
};

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bagella",
  description: "Bagella is an ecommerce platform for saling company products",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="max-w-7xl my-8 mx-auto px-4 flex-grow w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
