import React from "react";
import Header from "../components/header/header";
import { FAQ } from "../components/faq/faq";
import { Guidelines } from "../components/guidelines/guidelines";
import { HeroSection } from "../components/hero/hero-section";
import { Footer } from "../components/footer/footer";

export interface HomePageProps {
  className?: string;
}
const HomePage: React.FC<HomePageProps> = ({}) => (
  <div className="flex flex-col min-h-screen text-neutral-900 font-normal">
    <Header />
    <div>
      <HeroSection />
      <FAQ />
      <Guidelines />
    </div>
    <Footer />
  </div>
);
export default HomePage;
