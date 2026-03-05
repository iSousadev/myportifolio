import CardNav, { type CardNavItem } from "@/components/CardNav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { WorkSection } from "@/components/work-section";
import { ContactSection } from "@/components/contact-section";
import { Beta } from "@/components/beta";

const cardNavItems: CardNavItem[] = [
  {
    label: "Sessoes",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Inicio", href: "#home", ariaLabel: "Ir para secao Inicio" },
      { label: "Sobre", href: "#about", ariaLabel: "Ir para secao Sobre" },
      { label: "Projetos", href: "#work", ariaLabel: "Ir para secao Work" },
      { label: "Skills", href: "#skills", ariaLabel: "Ir para secao Skills" },
      {
        label: "Contato",
        href: "#contact",
        ariaLabel: "Ir para secao Contato",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <Beta />
      <CardNav items={cardNavItems} />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      {/* <ServicesSection /> */}
      <ContactSection />
    </main>
  );
}
