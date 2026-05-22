import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Diet Coke | Open Something Iconic",
  description: "Experience the cold rush of modern refreshment. Zero sugar. Full attitude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#090909] text-[#F5F5F5]`}>
        <div className="film-grain"></div>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
