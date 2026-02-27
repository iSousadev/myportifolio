"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const DEFAULT_COLORS = ["#0d1019", "#121622"];
const EMPTY_ITEMS: StaggeredMenuItem[] = [];
const EMPTY_SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [];

const withAlpha = (color: string, alpha: number) => {
  if (!color.startsWith("#")) return color;
  const hex = color.replace("#", "");
  const normalized =
    hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function StaggeredMenu({
  position = "right",
  colors = DEFAULT_COLORS,
  items = EMPTY_ITEMS,
  socialItems = EMPTY_SOCIAL_ITEMS,
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#ffffff",
  openMenuButtonColor = "#ffffff",
  accentColor = "#7c8aa5",
  isFixed = true,
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLButtonElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!open) return;
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) {
      setOpen(false);
      onMenuClose?.();
      return;
    }

    const offscreen = position === "left" ? -100 : 100;
    const itemEls = panel.querySelectorAll<HTMLElement>("[data-menu-item]");
    const socialEls = panel.querySelectorAll<HTMLElement>("[data-social-item]");

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false);
        onMenuClose?.();
      },
    });

    tl.to([...itemEls, ...socialEls], {
      y: 8,
      opacity: 0,
      duration: 0.16,
      stagger: 0.025,
      ease: "power2.in",
    }).to(
      panel,
      {
        xPercent: offscreen,
        duration: 0.26,
        ease: "power3.in",
      },
      0.05,
    ).to(
      overlay,
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.out",
      },
      0.1,
    );

    tlRef.current = tl;
  }, [onMenuClose, open, position]);

  const openMenu = useCallback(() => {
    if (open) return;
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) {
      setOpen(true);
      onMenuOpen?.();
      return;
    }

    const itemEls = panel.querySelectorAll<HTMLElement>("[data-menu-item]");
    const socialEls = panel.querySelectorAll<HTMLElement>("[data-social-item]");

    tlRef.current?.kill();
    setOpen(true);
    onMenuOpen?.();

    gsap.set([...itemEls, ...socialEls], { y: 12, opacity: 0 });
    const tl = gsap.timeline();
    tl.to(overlay, {
      opacity: 1,
      duration: 0.16,
      ease: "power2.out",
    }).to(
      panel,
      {
        xPercent: 0,
        duration: 0.34,
        ease: "power3.out",
      },
      0,
    ).to(
      itemEls,
      {
        y: 0,
        opacity: 1,
        duration: 0.32,
        stagger: 0.04,
        ease: "power3.out",
      },
      0.12,
    ).to(
      socialEls,
      {
        y: 0,
        opacity: 1,
        duration: 0.26,
        stagger: 0.035,
        ease: "power3.out",
      },
      0.22,
    );

    tlRef.current = tl;
  }, [onMenuOpen, open]);

  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, open, openMenu]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    const offscreen = position === "left" ? -100 : 100;
    gsap.set(panel, { xPercent: offscreen });
    gsap.set(overlay, { opacity: 0 });
  }, [position]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeMenu]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`relative pointer-events-auto ${className ?? ""}`}
      style={
        {
          "--sm-accent": accentColor,
        } as CSSProperties
      }
    >
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 transition-colors duration-200 hover:bg-white/10"
        style={{
          color: changeMenuColorOnOpen && open ? openMenuButtonColor : menuButtonColor,
        }}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {mounted &&
        createPortal(
          <div
            className={`${
              isFixed ? "fixed inset-0 z-[120]" : "absolute inset-0 z-20"
            } pointer-events-none ${open ? "block" : "hidden"}`}
          >
            <button
              ref={overlayRef}
              type="button"
              aria-label="Close menu"
              onClick={closeOnClickAway ? closeMenu : undefined}
              className="absolute inset-0 bg-black/30 pointer-events-auto"
              style={{
                backdropFilter: "saturate(145%) blur(12px)",
                WebkitBackdropFilter: "saturate(145%) blur(12px)",
              }}
            />

            <aside
              id="staggered-menu-panel"
              ref={panelRef}
              aria-hidden={!open}
              className={`absolute top-0 h-full w-full max-w-none p-5 sm:p-6 ${
                position === "left" ? "left-0" : "right-0"
              } pointer-events-auto backdrop-blur-xl`}
              style={{
                background: `linear-gradient(135deg, ${withAlpha(colors[0], 0.5)}, ${withAlpha(colors[1] ?? colors[0], 0.35)})`,
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.16)",
                backdropFilter: "saturate(165%) blur(18px)",
                WebkitBackdropFilter: "saturate(165%) blur(18px)",
              }}
            >
              <div className="flex h-full flex-col pt-12">
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <ul className="space-y-1.5">
                  {items.map((item, index) => (
                    <li key={item.link}>
                      <a
                        data-menu-item
                        href={item.link}
                        aria-label={item.ariaLabel}
                        onClick={closeMenu}
                        onPointerEnter={() => setHoveredIndex(index)}
                        onPointerLeave={() => setHoveredIndex(null)}
                        onPointerDown={() => setHoveredIndex(index)}
                        onPointerUp={() => setHoveredIndex(null)}
                        onPointerCancel={() => setHoveredIndex(null)}
                        onFocus={() => setHoveredIndex(index)}
                        onBlur={() => setHoveredIndex(null)}
                        className="group inline-flex cursor-pointer items-end gap-2.5 text-white/90 transition-colors duration-300"
                      >
                        {displayItemNumbering && (
                          <span className="text-[11px] font-medium text-white/55">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        )}
                        <span
                          className="text-2xl font-semibold uppercase tracking-tight transition-all duration-300 sm:text-[2rem]"
                          style={{
                            color:
                              hoveredIndex === index
                                ? "#ff3b30"
                                : undefined,
                            transform:
                              hoveredIndex === index
                                ? "translateX(6px) scale(1.08)"
                                : undefined,
                          }}
                        >
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {displaySocials && socialItems.length > 0 && (
                  <div className="mt-auto border-t border-white/15 pt-5">
                    <p className="mb-2.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
                      Social
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {socialItems.map((social) => (
                        <a
                          key={social.label}
                          data-social-item
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-white/75 transition-colors hover:text-white"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default StaggeredMenu;
