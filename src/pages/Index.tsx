import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import QuotesSection from "@/components/QuotesSection";
import GallerySection from "@/components/GallerySection";
import ProposalSection from "@/components/ProposalSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <main className="relative">
      <FloatingHearts />
      <HeroSection />
      <LoveLetterSection />
      <QuotesSection />
      <GallerySection />
      <ProposalSection />
      <MusicPlayer />
    </main>
  );
};

export default Index;
