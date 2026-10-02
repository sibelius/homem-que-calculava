import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/og";
import "./globals.css";

const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const body = Source_Sans_3({ variable: "--font-source", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description = "Os problemas de Beremiz Samir, do livro de Malba Tahan, em visualizações interativas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description,
  openGraph: { title: SITE_NAME, description, url: "/", siteName: SITE_NAME, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: SITE_NAME, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-display text-lg tracking-tight">
              O Homem que Calculava
            </Link>
            <span className="text-sm text-muted">Malba Tahan · visualizado</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line py-6 text-center text-sm text-muted">
          Baseado em <em>O Homem que Calculava</em> (1938), de Malba Tahan — pseudônimo de Júlio César de Mello e Souza.
        </footer>
      </body>
    </html>
  );
}
