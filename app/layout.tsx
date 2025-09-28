import type { Metadata } from "next";
import "./globals.css";

import { inter, geistSans, geistMono } from "@/app/ui/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "E Commerce Website",
  description: "E Commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
