"use client";

import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const roles = ["Full Stack Developer"];

const socialLinks = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rodolfosousadev/",
  },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/iSousadev" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/naodocover" },
];

function TypingText() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setText(currentRole.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <h2 className="mt-2 h-7 text-lg font-semibold text-foreground md:text-xl">
      <span>{text}</span>
      <span className="typing-cursor" />
    </h2>
  );
}

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 5 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }

    let animationFrame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 30, 99, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(233, 30, 99, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end justify-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 md:px-8 lg:items-center lg:pb-16"
    >
      
      
      <div
        className={`absolute inset-0 -translate-y-20 lg:hidden transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        <Image
          src="/images/profile.jpg"
          alt="Foto de perfil de Rodolfo"
          fill
          className="object-cover object-[50%_20%]"
          sizes="100vw"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/25 to-background/75" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 flex w-full max-w-7xl items-end lg:items-center">
        <div
          className={`w-full max-w-xl space-y-5 transition-all duration-1000 lg:ml-auto lg:mr-[52%] ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="hidden flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4 lg:flex">
            <span className="font-light tracking-wider">Siga-me</span>
            <span className="h-px w-8 bg-muted-foreground/40" />
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-primary/10"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h1 className="hidden text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:block lg:text-6xl">
              {"Ol\u00e1, Eu sou Rodolfo"}
            </h1>

            <h2 className="mt-2 w-full text-center text-xl font-semibold text-primary md:text-2xl lg:text-left lg:text-3xl">
              Desenvolvedor Full Stack
            </h2>

            <div className="hidden lg:block">
              <TypingText />
            </div>
          </div>

          <p className="mt-3 max-w-md text-left leading-relaxed text-muted-foreground sm:text-justify">
            {
              "Desenvolvedor Full Stack em forma\u00e7\u00e3o, com foco em aplica\u00e7\u00f5es web modernas"
            }
          </p>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="https://drive.google.com/file/d/1yQx6yJaoUZ6HMdGpcQT-yrVZuzi0mmvP/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group glow-hover relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-4xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <EyeIcon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">Ver CV</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rodolfosousadev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group glow-hover relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-4xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <FaLinkedinIn className="relative z-10 h-4 w-4" />
              <span className="relative z-10">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-y-0 right-0 hidden w-[50%] transition-all duration-1000 delay-300 lg:block ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        <Image
          src="/images/profile.jpg"
          alt="Foto de perfil de Rodolfo"
          fill
          className="object-cover"
          style={{ objectPosition: "center 44%" }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          loading="eager"
        />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div
        className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 transition-all duration-1000 delay-700 sm:flex ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <div className="h-8 w-px animate-pulse bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
