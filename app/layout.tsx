import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto p-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

