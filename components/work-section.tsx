"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FaGithub } from "react-icons/fa6";

type Category = "all" | "web" | "app" | "design";

interface Project {
  id: number;
  title: string;
  category: Category;
  image: string;
  description: string;
  date: string;
  technologies: string;
  role: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Pulse IA",
    category: "web",
    image: "/images/project-1.jpg",
    description:
      "Agente de voz com inteligência artificial capaz de manter memória entre sessões e analisar imagens em tempo real. O sistema utiliza IA generativa para conversas contextuais, com backend em Python e interface de voz interativa em React.",
    date: "2025",
    technologies: "Python, React, TypeScript, LiveKit, Google Gemini",
    role: "Full Stack Developer",
    link: "https://github.com/iSousadev/pulseia",
  },
  {
    id: 2,
    title: "Canal Ético",
    category: "web",
    image: "/images/project-2.jpg",
    description:
      "Plataforma web para registro de denúncias anônimas com foco em segurança e privacidade. O sistema permite envio de arquivos, comunicação segura e painel administrativo com controle de acesso.",
    date: "2025",
    technologies: "React, TypeScript, Supabase, PostgreSQL",
    role: "Full Stack Developer",
    link: "github.com/rodolfosousadev/canal-etico",
  },
  {
    id: 3,
    title: "Brand Identity & Travel App",
    category: "web",
    image: "/images/project-3.jpg",
    description:
      "Complete brand design system for a travel photography application.",
    date: "22 Mar 2025",
    technologies: "Figma, Illustrator",
    role: "UI/UX Designer",
    link: "github.com/rodolfosousadev/brand-identity-travel-app",
  },
];

const filters: { label: string; value: Category | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Web", value: "web" },
];

const categoryLabels: Record<string, string> = {
  web: "Full Stack",
  app: "Full Stack",
  design: "Full Stack",
};

const normalizeUrl = (link: string) =>
  link.startsWith("http://") || link.startsWith("https://")
    ? link
    : `https://${link}`;

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animateCards, setAnimateCards] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.05);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = (value: Category | "all") => {
    setAnimateCards(false);
    setActiveFilter(value);
    setTimeout(() => setAnimateCards(true), 50);
  };

  useEffect(() => {
    if (isVisible) setAnimateCards(true);
  }, [isVisible]);

  // Fechar modal e restaurar scroll
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Close modal on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedProject(null);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="work" className="min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:px-8">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">
            Meus Projetos
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold text-foreground md:text-4xl text-balance">
            Projetos Recentes
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          className={`animate-on-scroll delay-1 ${isVisible ? "visible" : ""} mt-10 flex flex-wrap items-center justify-center gap-2`}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-400 sm:px-5 ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer overflow-hidden rounded-xl bg-card text-left transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/20 ${
                animateCards
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: animateCards ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-all duration-500 group-hover:bg-primary/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 scale-50 transition-all duration-400 group-hover:opacity-100 group-hover:scale-100">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  {categoryLabels[project.category] || "Design"}
                </p>
                <p className="mt-1 font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-3">
                  Demo <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-2 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setSelectedProject(null)}
            aria-label="Fechar modal"
          />
          <div className="modal-content relative z-10 flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl lg:max-h-[86vh] lg:flex-row">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-300"
              aria-label="Fechar modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-56 w-full flex-shrink-0 overflow-hidden sm:h-64 lg:h-auto lg:min-h-[380px] lg:w-1/2">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 lg:block hidden" />
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 pr-10">
                <span className="text-xs font-medium tracking-wider uppercase text-primary">
                  Featured
                </span>
                <span className="text-xs text-muted-foreground">-</span>
                <span className="text-xs text-muted-foreground">
                  {categoryLabels[selectedProject.category]}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-tight text-foreground text-balance sm:text-2xl">
                {selectedProject.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground break-words">
                {selectedProject.description}
              </p>

              <p className="break-words">
                <span className="font-medium text-foreground">
                  Tecnologias:
                </span>
                <span className="text-muted-foreground break-words">
                  {" "}
                  {selectedProject.technologies}
                </span>
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                <a
                  href={normalizeUrl(selectedProject.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden 
                  rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground 
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <FaGithub className="h-3.5 w-3.5 relative z-10" />
                  <span className="relative z-10">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
