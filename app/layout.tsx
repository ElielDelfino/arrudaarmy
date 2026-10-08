import type { Metadata } from "next";
import {
  Big_Shoulders_Stencil,
  Oswald,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";

const bigShoulders = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arruda Army — Consultoria de Treino Online",
  description:
    "Treino e nutrição sob comando direto. Consultoria online do Arruda Army para quem decidiu levar o próprio treinamento a sério.",
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bigShoulders.variable} ${oswald.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-teal-900 text-chrome">
        <div className="grain" aria-hidden="true" />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
        <FloatingActions />
      </body>
    </html>
  );
}
