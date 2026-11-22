import CategorySection from "@/components/shared/home/category";
import Banner from "@/components/shared/home/banner";
import FeatureSection from "@/components/shared/home/featureSection";
import WhyChooseUs from "@/components/shared/home/why-choose-us";
import TrustedEquipment from "@/components/shared/home/trusted-equipment";

export default function Home() {
  return (
    <div>
      <Banner />
      <CategorySection />
      <FeatureSection/>
      <WhyChooseUs />
      <TrustedEquipment />
    </div>
  );
}
