import {Hero} from "@/components/home/Hero"
import WhyChooseUs from "@/components/home/WhyChoose";
import HomeCourses from "@/components/home/HomeCourses";
import HomeVideos from "@/components/home/HomeVideos";
import Directorpage from "@/components/home/Director";
import HeroPlus from "@/components/home/HeroPlus";
import Testimonials from "@/components/home/Testimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import DailyRoutine from "@/components/home/DailyRoutine";
import HomeQuizSection from "@/components/home/HomeQuizSection";


export const metadata = {
  title: "Prince Defence Academy | NDA, CDS & AFCAT Preparation",
  description: "Prepare for NDA, CDS and AFCAT with structured defence exam preparation, expert guidance and focused training.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="">
      <main>

        <Hero/>
        <HeroPlus/>
        <HomeCourses/>
        <HomeQuizSection/>
        <WhyChooseUs/>
        <DailyRoutine/>
        <HomeVideos/>
        <Directorpage/>
        <Testimonials/>
        <HomeFAQ/>

      </main>
    </div>
  );
}
