import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js TypeScript Tailwind Motion",
  description: "A Next.js project with TypeScript, Tailwind CSS, and Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

