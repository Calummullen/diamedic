import { Header } from "./header";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { CTA } from "./cta";
import { FAQ } from "./faq";

export const LandingPage: React.FC = () => {
  return (
    <div className="font-montserrat bg-blue-200">
      <Header />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </div>
  );
};
