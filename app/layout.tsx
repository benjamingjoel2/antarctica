import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, VT323 } from "next/font/google";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";
import { PenguinMode } from "@/components/penguin/PenguinMode";
import { site } from "@/config/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({}),
  applicationName: site.name,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#030b17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children, modal }: { children: ReactNode; modal?: ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-[1rem] focus:top-[1rem] focus:z-[200] focus:rounded-full focus:bg-orange focus:px-[1rem] focus:py-[0.6rem] focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <Menu />
          <main id="main">{children}</main>
          <Footer />
          <CookieConsent />
          <PenguinMode />
          {modal}
          <PageTransition />
        </Providers>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: site.name,
            slogan: site.tagline,
            description: site.description,
            url: site.url,
            email: site.contact.email,
            areaServed: "Antarctica",
          }}
        />
      </body>
    </html>
  );
}
