import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gold/40">
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label="Mann Manthan, home">
            <Image src={siteConfig.images.logoLockup.src} alt="" width={siteConfig.images.logoLockup.width} height={siteConfig.images.logoLockup.height} className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-[0.95rem] text-forest underline underline-offset-4">Back to home</Link>
        </div>
      </header>
      <main id="main" className="container-x section-y">
        <article className="max-w-[44rem]">
          <h1 className="h2">{title}</h1>
          <div className="mt-10 space-y-5 text-base leading-[1.7] text-ink/90 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-[1.5rem] [&_h2]:text-forest">{children}</div>
        </article>
      </main>
    </>
  );
}
