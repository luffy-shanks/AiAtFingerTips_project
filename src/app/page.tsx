import HeroSection from "@/components/HeroSection";
import ProductReveal from "@/components/ProductReveal";
import ExperienceSection from "@/components/ExperienceSection";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import CinematicCTA from "@/components/CinematicCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full bg-[#090909]">
      <HeroSection />
      <ProductReveal />
      <ExperienceSection />
      <InteractiveShowcase />
      <CinematicCTA />
    </main>
  );
}
