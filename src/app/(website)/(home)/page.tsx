import FeaturedTalentsSection from "./components/featured-talents-section";
import HeroSection from "./components/hero-section";
import SkillsSection from "./components/skills-section";
import StatSection from "./components/stat-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatSection />
      <SkillsSection />
      <FeaturedTalentsSection />
    </div>
  );
}
