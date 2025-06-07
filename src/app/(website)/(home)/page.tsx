import Footer from "@/components/footer";
import FeaturedTalentsSection from "./components/featured-talents-section";
import HeroSection from "./components/hero-section";
import Walkthrough from "./components/how-it-works-section";
import SkillsSection from "./components/skills-section";
import StatSection from "./components/stat-section";
import WhyEnyata from "./components/why-enyata-section";
import { fetchTopTalents } from "@/api/talent";


export default async function Home() {
  const talents = await fetchTopTalents();
  console.log('top talent at page', talents)
  return (
    <div className='md:mt-[140px] mt-[40px]'>
      <HeroSection />
      <StatSection />
      <SkillsSection />
      <FeaturedTalentsSection talents={talents?.data} />
      <Walkthrough />
      <WhyEnyata />
      <Footer />
    </div>
  );
}
