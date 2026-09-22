import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "JKUAT Bioresources",
  description: "Digital platform for managing and accessing bioresource information at JKUAT.",
  icons: {
    icon: "/assets/images/jkuat-logo.jpg",
    shortcut: "/assets/images/jkuat-logo.jpg",
    apple: "/assets/images/jkuat-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
