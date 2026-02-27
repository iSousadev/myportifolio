"use client";

import { Briefcase, Award, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation";

const stats = [
  { icon: Briefcase, value: 8, suffix: "+", label: "Years Experience" },
  { icon: Award, value: 20, suffix: "+", label: "Completed Projects" },
  { icon: Users, value: 5, suffix: "+", label: "Companies Worked" },
];

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
}: {
  icon: typeof Briefcase;
  value: number;
  suffix: string;
  label: string;
  delay: string;
}) {
  const { count, ref } = useCountUp(value, 1500);



  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${delay} group rounded-xl border border-border p-5 text-center transition-all duration-500 hover:border-primary/50 hover:bg-primary/5`}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-3xl font-bold text-foreground tabular-nums">
        {count.toString().padStart(2, "0")}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:px-8"
    >
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">
            Introdução
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold text-foreground md:text-4xl text-balance">
            Sobre Mim
          </h2>
        </div>

        <div className="mt-12 flex flex-col items-center gap-10 sm:mt-16 lg:flex-row lg:items-start lg:gap-12">
          {/* Image */}
          <div
            className={`slide-in-left ${
              isVisible ? "visible" : ""
            } relative h-80 w-full max-w-xs flex-shrink-0 overflow-hidden rounded-xl sm:w-72`}
          >
            <Image
              src="/images/profile.jpg"
              alt="Rodolfo Sousa"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 288px"
            />

            <div className="absolute inset-0 rounded-xl border border-primary/10" />

            {/* Corner accents */}
            <div className="absolute -bottom-2 -right-0 h-20 w-16 rounded-br-xl border-b-2 border-r-2 border-primary/40" />
          </div>

          {/* Content */}
          <div
            className={`slide-in-right ${isVisible ? "visible" : ""} flex-1 space-y-5`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
              {/* About text */}
              <div className="mt-0 max-w-xl space-y-4 text-left leading-relaxed text-muted-foreground sm:text-justify lg:mt-12">
                <p className="uppercase text-primary">
                  Desenvolvedor Full Stack em formação
                </p>
                <p>
                  Sou estudante de Sistemas de Informação e desenvolvedor Full
                  Stack em formação, com experiência em projetos reais e
                  desenvolvimento de aplicações web modernas.
                </p>

                <p>
                  Gosto de transformar ideias em projetos e estou sempre
                  aprendendo novas tecnologias para evoluir como desenvolvedor.
                </p>
              </div>

              {/* Stats */}
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:w-44 lg:grid-cols-1">
                {stats.map((stat, i) => (
                  <StatCard
                    key={stat.label}
                    {...stat}
                    delay={`delay-${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Button
            <a
              href="https://drive.google.com/file/d/1tdgXYAQgkK55R2ECrPZHepdCsKx1ZkRv/view"
              target="_blank"
              className="group glow-hover relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-primary px-7 py-3.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <span className="relative z-10">Ver CV</span>

              <Download className="h-4 w-4 relative z-10 transition-transform group-hover:translate-y-0.5" />
            </a> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 transition-all duration-1000 delay-700 sm:flex ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 text-center">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>

    </section>
  );
}
