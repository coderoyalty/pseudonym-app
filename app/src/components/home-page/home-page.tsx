import React from "react";
import Header from "../header/header";
import { FAQ } from "../faq/faq";
import { Guidelines } from "../guidelines/guidelines";
import { HeroSection } from "../hero/hero-section";
import { Footer } from "../footer/footer";
import SignupForm from "../signup-form/signup-form";
import LoginForm from "../login-form/login-form";

export interface HomePageProps {
  className?: string;
}
const HomePage: React.FC<HomePageProps> = ({}) => (
  <div className="flex flex-col min-h-screen text-neutral-900 font-normal">
    <Header />
    <div>
      <HeroSection />
      <FAQ />
      {/* TODO: remove add a router package. rm signup-form and loginform component from the home-page*/}
      <div className="max-w-[375px] my-12 mx-auto border p-4 rounded-md shadow-md">
        <SignupForm />
      </div>
      <div className="max-w-[375px] my-12 mx-auto border p-4 rounded-md shadow-md">
        <LoginForm />
      </div>
      <Guidelines />
    </div>
    <Footer />
  </div>
);
export default HomePage;
