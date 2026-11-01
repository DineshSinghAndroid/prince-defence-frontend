import DailyQuizClient from "@/components/quiz/DailyQuizClient";

export const metadata = {
  title: "Daily Defence Quiz | Practice NDA, Air Force, Navy, Army Questions | Prince Defence Academy",
  description:
    "Practice free daily defence exam questions across General Studies, Maths, Science and English for NDA, CDS, AFCAT, Navy & Air Force with Prince Defence Academy Rajasthan.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "Daily Defence Quiz | Prince Defence Academy Rajasthan",
    description:
      "Free daily test questions and explanations for NDA, CDS, Navy and Air Force aspirants.",
    url: "/quiz",
    siteName: "Prince Defence Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function QuizPage() {
  return <DailyQuizClient />;
}
