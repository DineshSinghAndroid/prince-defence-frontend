import dynamic from "next/dynamic";

// 1. Upar ke Main Sections (Inhe normal import hi rakhna hai taaki turant dikhein)
import { Hero } from "@/components/home/Hero";
import HeroPlus from "@/components/home/HeroPlus";
import SelectionRecords from "@/components/home/SelectionRecords";
import HomeCourses from "@/components/home/HomeCourses";
import HomeQuizSection from "@/components/home/HomeQuizSection";
import WhyChooseUs from "@/components/home/WhyChoose";
import ScrollReveal from "@/components/animations/ScrollReveal";

// 🚀 2. Neeche ke Heavy Sections (Inhe dynamic import karein taaki JS bundle 50% chhota ho jaye)
const HomeFacilities = dynamic(() => import("@/components/home/HomeFacilities"));
const DailyRoutine = dynamic(() => import("@/components/home/DailyRoutine"));
const HomeVideos = dynamic(() => import("@/components/home/HomeVideos"));
const Directorpage = dynamic(() => import("@/components/home/Director"));
const HomeFAQ = dynamic(() => import("@/components/home/HomeFAQ"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));

export const metadata = {
  title: "Prince Defence Academy | NDA, CDS & AFCAT Preparation",
  description:
    "Prepare for NDA, CDS and AFCAT with structured defence exam preparation, expert guidance and focused training.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <HeroPlus />
        <SelectionRecords />
        <HomeCourses />
        <HomeQuizSection />
        <WhyChooseUs />
        
        {/* Dynamic Loaded Sections */}
        <HomeFacilities />
        <DailyRoutine />
        <HomeVideos />
        <Directorpage />
        <HomeFAQ />
        
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
      </main>
    </div>
  );
}
