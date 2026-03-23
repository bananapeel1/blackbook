import type { Metadata, Viewport } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import { ToastProvider } from "@/lib/toast-context";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blackbook | Trusted Marine Services",
  description:
    "The trusted marine services marketplace for sailors, yacht charters, and superyacht crews. Book repairs, provisioning, transfers, and concierge services before you arrive.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000a1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-on-surface font-body antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
