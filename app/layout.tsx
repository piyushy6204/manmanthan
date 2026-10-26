import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cormorant-garamond/index.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/dm-sans/index.css";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-full.jpg", width: 1000, height: 1000, alt: siteConfig.images.logoFull.alt }],
  },
  twitter: { card: "summary", title: siteConfig.title, description: siteConfig.description, images: ["/images/logo-full.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF7F0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-forest focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
