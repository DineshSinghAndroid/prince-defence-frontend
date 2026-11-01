import dynamic from "next/dynamic";


import { Hero } from "@/components/home/Hero";
import HeroPlus from "@/components/home/HeroPlus";
import ScrollReveal from "@/components/animations/ScrollReveal";

const SelectionRecords = dynamic(() => import("@/components/home/SelectionRecords"));
const HomeCourses = dynamic(() => import("@/components/home/HomeCourses"));
const HomeQuizSection = dynamic(() => import("@/components/home/HomeQuizSection"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChoose"));
const HomeFacilities = dynamic(() => import("@/components/home/HomeFacilities"));
const DailyRoutine = dynamic(() => import("@/components/home/DailyRoutine"));
const HomeVideos = dynamic(() => import("@/components/home/HomeVideos"));
const Directorpage = dynamic(() => import("@/components/home/Director"));
const HomeFAQ = dynamic(() => import("@/components/home/HomeFAQ"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));

export const metadata = {
  title: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
  description:
    "Join Prince Defence Academy Sikar, Rajasthan's No. 1 defence coaching institute for NDA, Air Force, Navy, Army & SSB with residential schooling & hostel. 3900+ selections.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
    description:
      "Join Prince Defence Academy Sikar, Rajasthan's No. 1 defence coaching institute for NDA, Air Force, Navy, Army & SSB with residential schooling & hostel. 3900+ selections.",
    url: "https://www.princedefence.com",
    siteName: "Prince Defence Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/campusbg-2.webp",
        width: 1200,
        height: 630,
        alt: "Prince Defence Academy Sikar Rajasthan - Best Defence Academy in Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
    description:
      "Join Prince Defence Academy Sikar, Rajasthan's No. 1 defence institute for NDA, Air Force, Navy, Army & SSB with residential schooling & hostel.",
    images: ["/images/campusbg-2.webp"],
  },
};

// FAQ Schema for Google rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which are the courses offered by Prince Defence Academy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prince Defence Academy offers multiple courses such as NDA, Air Force, Navy, Army, SSC and SSB interviews, along with other competitive recruitment exams.",
      },
    },
    {
      "@type": "Question",
      name: "Who can join Prince Defence Academy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students from Class 10, Class 12 or graduates can apply, depending on the course. Our team will help you pick the right one.",
      },
    },
    {
      "@type": "Question",
      name: "Is hostel facility available at Prince Defence Academy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We have a safe, comfortable hostel and a mess that serves fresh, healthy meals.",
      },
    },
    {
      "@type": "Question",
      name: "Does Prince Defence provide physical training and SSB preparation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Daily physical training, a gym and sports are part of the routine, and SSB students get regular guidance and mock practice.",
      },
    },
    {
      "@type": "Question",
      name: "How can I take admission at Prince Defence Academy Sikar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit our campus, call us or fill in the enquiry form on our website. We’ll guide you through every step.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div>
      {/* FAQ Schema for Search Engine Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
