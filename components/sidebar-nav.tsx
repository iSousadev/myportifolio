"use client";

import { useState, useEffect, useCallback } from "react";
import { Link2 } from "lucide-react";

const navItems = [
  { id: "home", label: "Inicio" },
  { id: "About", label: "Sobre" },
  { id: "work", label: "work" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Serviços" },
  { id: "contact", label: "Contato" },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
    
      {/* Scroll progress line */}
      <div className="fixed left-0 top-0 z-[60] h-full w-[2px]">
        <div
          className="w-full bg-primary/60 transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <nav className="bg-auto  fixed left-0 top-0 z-50 flex h-screen w-28 flex-col items-center justify-center py-6">
        {/* Nav Items */}
        <div className="flex flex-col items-center gap-10">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="group relative flex flex-col items-center"
              >
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-primary transition-all duration-300" />
                )}
                <span
                  className={`text-[14px] font-medium tracking-widest transition-all duration-300 [writing-mode:horizontal] ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground/60 group-hover:text-foreground"
                  }`}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Social link */}
        <a
          href="#contact"
          className="group relative text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          aria-label="Links sociais"
        >
          <Link2 className="h-5 w-5" />
        </a>
      </nav>
    </>
  );
}
