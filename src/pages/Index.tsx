import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import QuotesSection from "@/components/QuotesSection";
import GallerySection from "@/components/GallerySection";
import ProposalSection from "@/components/ProposalSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <>
      {/* Mobile Background */}
      <main
        className="relative min-h-screen md:hidden"
        style={{
          backgroundImage: "url('/Third.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        <FloatingHearts />
        <HeroSection />
        <LoveLetterSection />
        <QuotesSection />
        <GallerySection />
        <ProposalSection />
        <MusicPlayer />
      </main>

      {/* Desktop Background */}
      <main
        className="relative min-h-screen hidden md:block"
        style={{
          backgroundImage: "url('/Home.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        <FloatingHearts />
        <HeroSection />
        <LoveLetterSection />
        <QuotesSection />
        <GallerySection />
        <ProposalSection />
        <MusicPlayer />
      </main>
    </>
  );
};

export default Index;
