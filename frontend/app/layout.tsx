import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/services/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Energy Care - Clean Energy. Brighter Tomorrow.",
  description: "Solar solutions, energy-efficient products and professional services for homes and businesses across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
