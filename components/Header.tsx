"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav state: the section crossing the upper-middle of the viewport.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Drawer links: close first (releases the scroll lock), then scroll with the CSS smooth behaviour.
  const navigateFromDrawer = useCallback((href: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView();
      history.pushState(null, "", href);
    }, 30);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ease-calm ${
          scrolled ? "border-b border-gold/40 bg-ivory/95 backdrop-blur" : "border-b border-transparent bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#home" aria-label="Mann Manthan, home" className="shrink-0">
            <Image
              src={siteConfig.images.logoLockup.src}
              alt=""
              width={siteConfig.images.logoLockup.width}
              height={siteConfig.images.logoLockup.height}
              priority
              sizes="200px"
              className="h-10 w-auto lg:h-12"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {siteConfig.nav.map((item) => {
                const active = activeId === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      className={`relative py-2 text-[0.95rem] transition-colors duration-200 hover:text-ink ${active ? "text-forest" : "text-ink/80"}`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-calm ${active ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={siteConfig.bookingHref} className="btn btn-primary hidden !min-h-[42px] !px-5 lg:inline-flex">
              Book a Session
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-[3px] text-forest hover:bg-forest/[0.07] lg:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={26} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={open} onClose={closeDrawer} onNavigate={navigateFromDrawer} activeId={activeId} />
    </>
  );
}
