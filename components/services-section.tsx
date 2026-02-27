"use client"

import { Globe, Smartphone, PenTool, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Modern and responsive websites using cutting-edge technologies and best practices in the market.",
    items: ["Responsive Design", "Optimized Performance", "SEO Friendly", "Modern Interfaces"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Mobile application development focused on user experience and performance.",
    items: ["React Native", "Cross-platform", "UI/UX Focused", "API Integration"],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Intuitive interface design and memorable user experiences for digital products.",
    items: ["Wireframing", "Prototyping", "Design System", "User Research"],
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="services" className="min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:px-8">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">What I Offer</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-foreground md:text-4xl text-balance">
            My Services
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`scale-in ${isVisible ? "visible" : ""} group relative overflow-hidden rounded-2xl border border-border p-6 transition-all duration-500 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 sm:p-8`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mb-8 space-y-3">
                    {service.items.map((item, j) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70"
                      >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary/60 transition-all duration-300 group-hover:bg-primary group-hover:scale-125" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:gap-3"
                  >
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
