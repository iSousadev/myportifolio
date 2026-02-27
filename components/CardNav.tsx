"use client";

import { useEffect, useRef, useState } from "react";
import StaggeredMenu from "@/components/staggered-menu";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav = ({ items, className = "" }: CardNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const isScrollingDown = delta > 0;
        const hasMeaningfulMove = Math.abs(delta) > 6;

        if (currentScrollY <= 24) {
          setIsVisible(true);
        } else if (hasMeaningfulMove) {
          setIsVisible(!isScrollingDown);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = items
    .flatMap((item) => item.links ?? [])
    .filter(
      (link, index, arr) =>
        arr.findIndex((entry) => entry.href === link.href) === index,
    )
    .slice(0, 6);

  return (
    <div
      className={`card-nav-container fixed left-1/2 top-4 z-[99] w-[calc(100%-1rem)] max-w-4xl -translate-x-1/2 transition-all duration-300 sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] lg:top-5 lg:w-[78%] ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[140%] opacity-0 pointer-events-none"} ${className}`}
    >
      <nav className="relative mx-auto w-full overflow-hidden rounded-2xl">
        <div className="flex h-11 items-center justify-between px-3 sm:px-4 lg:hidden">
          <span className="text-sm font-semibold text-white transition-colors duration-200 hover:text-white/80 sm:text-base">
            iSousa.dev
          </span>
          <StaggeredMenu
            position="right"
            items={navLinks.map((link) => ({
              label: link.label,
              ariaLabel: link.ariaLabel,
              link: link.href,
            }))}
            socialItems={[
              { label: "GitHub", link: "https://github.com/iSousadev" },
              {
                label: "LinkedIn",
                link: "https://www.linkedin.com/in/rodolfosousadev/",
              },
              { label: "X", link: "https://x.com/naodocover" },
            ]}
            displaySocials
            displayItemNumbering={false}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen
            colors={["#0d1019", "#121622"]}
            accentColor="#8f9bb3"
            isFixed
          />
        </div>

        <div className="hidden h-11 items-center justify-center px-5 lg:flex">
          <div className="flex items-center gap-7 text-sm font-semibold text-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                className="whitespace-nowrap rounded-full px-3 py-1 transition-colors duration-200 hover:text-white/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
