import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SubjectCategories } from "@/components/SubjectCategories";
import { SocialProof } from "@/components/SocialProof";
import { FeatureSection } from "@/components/FeatureSection";
import { CoursePreview } from "@/components/CoursePreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SubjectCategories />
      <SocialProof />
      <FeatureSection />
      <CoursePreview />
      <Footer />
    </div>
  );
};

export default Index;
