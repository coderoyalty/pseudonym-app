import React from "react";
import Header from "../header/header";
import { FAQ } from "../faq/faq";
import { Guidelines } from "../guidelines/guidelines";
import { HeroSection } from "../hero/hero-section";
import { Footer } from "../footer/footer";

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
