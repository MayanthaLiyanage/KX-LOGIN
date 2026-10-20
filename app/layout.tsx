import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KX // Gaming Identity - Player Authentication",
  description: "Next-generation gaming console login with PlayStation inspired 2D interaction",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceGrotesk.className} h-full antialiased dark`}
    >
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col bg-[#060c24] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
