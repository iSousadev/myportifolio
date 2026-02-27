"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

type FormState = {
  name: string;
  email: string;
  project: string;
  message: string;
};

type FormField = keyof FormState;

// const contactInfo = [
//   { icon: MapPin, label: "Location", value: "San Francisco, CA" },
//   { icon: Mail, label: "Email", value: "user@gmail.com" },
//   { icon: Phone, label: "Phone", value: "+1 999-888-777" },
// ];

const socialLinks = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rodolfosousadev/",
  },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/iSousadev" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/naodocover" },
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<FormField | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name as FormField]: value,
    }));
  };

  return (
    <section id="contact" className="min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:px-8">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">
            Entre em contato
          </p>

          <h2 className="mt-2 text-center text-3xl font-bold text-foreground md:text-4xl text-balance">
            Contato
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:flex-row">
          {/* Contact Info Side */}

          <div
            className={`slide-in-left ${
              isVisible ? "visible" : ""
            } flex-shrink-0 space-y-8 lg:w-72`}
          >
            <p className="text-muted-foreground leading-relaxed text-sm">
              Vamos trabalhar juntos! Sinta-se à vontade para entrar em contato
              para colaborações ou apenas um olá amigável.
            </p>

            {/* <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="group flex items-center gap-4"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>

                    <p className="text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Social links */}

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4">
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
          </div>

          {/* Form */}

          <form
            ref={formRef}
            className={`slide-in-right ${
              isVisible ? "visible" : ""
            } flex-1 space-y-5`}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                {
                  id: "name" as FormField,
                  label: "Name",
                  type: "text",
                },
                {
                  id: "email" as FormField,
                  label: "Email",
                  type: "email",
                },
              ].map((field) => (
                <div key={field.id} className="group relative">
                  <label
                    htmlFor={field.id}
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === field.id || formState[field.id]
                        ? "-top-2.5 text-xs text-primary bg-background px-1"
                        : "top-3.5 text-sm text-muted-foreground"
                    }`}
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formState[field.id]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-primary focus:shadow-sm focus:shadow-primary/10 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="group relative">
              <label
                htmlFor="project"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "project" || formState.project
                    ? "-top-2.5 text-xs text-primary bg-background px-1"
                    : "top-3.5 text-sm text-muted-foreground"
                }`}
              >
                Project
              </label>

              <input
                id="project"
                name="project"
                type="text"
                value={formState.project}
                onChange={handleChange}
                onFocus={() => setFocusedField("project")}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-primary focus:shadow-sm focus:shadow-primary/10 focus:outline-none"
              />
            </div>

            <div className="group relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "message" || formState.message
                    ? "-top-2.5 text-xs text-primary bg-background px-1"
                    : "top-3.5 text-sm text-muted-foreground"
                }`}
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-primary focus:shadow-sm focus:shadow-primary/10 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="group glow-hover relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <span className="relative z-10">Enviar Mensagem</span>

              <Send className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </div>

        {/* Footer */}

        <div
          className={`animate-on-scroll delay-3 ${
            isVisible ? "visible" : ""
          } mt-16 flex flex-col items-center justify-center gap-3 pt-10 text-center sm:mt-24 sm:flex-row sm:gap-4 sm:text-left`}
        >
          <p className="gap-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} iSousadev. Todos os direitos
            reservados.
          </p>
          <a
            href="https://github.com/iSousadev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <FaGithub className="h-4 w-4" />
            iSousadev
          </a>
        </div>
      </div>
    </section>
  );
}
