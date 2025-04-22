import Footer from "@/components/footer";
import FeaturedTalentsSection from "./components/featured-talents-section";
import HeroSection from "./components/hero-section";
import Walkthrough from "./components/how-it-works-section";
import SkillsSection from "./components/skills-section";
import StatSection from "./components/stat-section";
import WhyEnyata from "./components/why-enyata-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatSection />
      <SkillsSection />
      <FeaturedTalentsSection />
      <Walkthrough />
      <WhyEnyata />
      <Footer />
    </div>
  );
}
