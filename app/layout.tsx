import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tawleh Manager",
  description: "Restaurant table-service operating system.",
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

