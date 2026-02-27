"use client";

import { useState } from "react";
import {
  Code,
  Server,
  ChevronDown,
  Database,
  Brain,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const experiences = [
  {
    icon: Code,
    title: "Frontend Development",
    duration: "Projetos acadêmicos e pessoais",
    details: [
      "React & Next.js Applications",
      "TypeScript e JavaScript (ES6+)",
      "Tailwind CSS & UI moderna",
      "SEO, Performance e Acessibilidade",
    ],
  },
  {
    icon: Server,
    title: "Backend Development",
    duration: "Experiência no PROINTER (CEST)",
    details: [
      "Node.js & Express",
      "FastAPI e Python",
      "PHP (ScriptCase)",
      "APIs REST e validação com Pydantic",
    ],
  },
  {
    icon: Database,
    title: "Banco de Dados",
    duration: "Modelagem e segurança de dados",
    details: [
      "PostgreSQL & MySQL",
      "Supabase",
      "Row Level Security (RLS)",
      "Modelagem Relacional",
    ],
  },
  {
    icon: Brain,
    title: "IA & Automação",
    duration: "Projetos com visão computacional e IA generativa",
    details: [
      "Python & OpenCV (OMR)",
      "Integração com Google Gemini",
      "Processamento de imagens",
      "Automação de geração de documentos",
    ],
  },
];

export function SkillsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="skills" className="min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:px-8">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Header */}
        <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">
            Tecnologias
          </p>

          <h2 className="mt-2 text-center text-3xl font-bold text-foreground md:text-4xl">
            Minhas Skills Técnicas
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-center leading-relaxed text-muted-foreground">
            Experiência prática com desenvolvimento Full Stack, criação de APIs,
            banco de dados e aplicações web modernas.
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-5 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-20">
          {/* Experience List */}
          <div
            className={`slide-in-left ${
              isVisible ? "visible" : ""
            } flex-1 space-y-5`}
          >
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              const isOpen = openIndex === i;

              return (
                <div
                  key={exp.title}
                  className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500
              
              ${
                isOpen
                  ? "border-primary/40 bg-card shadow-lg shadow-primary/5"
                  : "border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              }`}
                >
                  {/* Left highlight bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-[3px] bg-primary transition-all duration-500 ${
                      isOpen
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-6"
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-md transition-all duration-300
                  
                  ${isOpen ? "bg-primary/20 scale-110" : "bg-primary/10"}`}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-foreground sm:text-lg">
                        {exp.title}
                      </p>

                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {exp.duration}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300
                  
                  ${isOpen ? "bg-primary/20 rotate-180" : "bg-secondary"}`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 ${
                          isOpen ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expandable Details */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                      <div className="border-t border-border/50 pt-5">
                        <ul className="space-y-3">
                          {exp.details.map((detail, j) => (
                            <li
                              key={detail}
                              className="flex items-center gap-3 text-sm text-muted-foreground"
                              style={{
                                transitionDelay: isOpen ? `${j * 80}ms` : "0ms",
                              }}
                            >
                              <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />

                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
