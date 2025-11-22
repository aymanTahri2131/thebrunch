import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ReveillonMenu } from "@/components/ReveillonMenu";
import { Realisations } from "@/components/Realisations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { RET } from "@/components/RET";
import { AVTG } from "@/components/AVTG";
import { Leaf, Heart, Star, Quote } from "lucide-react";
niconst Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ReveillonMenu />
      <AVTG />
      <RET />
      <Realisations />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
