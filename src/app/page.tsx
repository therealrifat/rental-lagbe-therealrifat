import CategorySection from "@/components/shared/home/category";
import Banner from "@/components/shared/home/banner";
import FeatureSection from "@/components/shared/home/featureSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <CategorySection />
      <FeatureSection/>
    </div>
  );
}
