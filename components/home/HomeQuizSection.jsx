import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

export default function HomeQuizSection() {
  return (
    <section
      aria-labelledby="home-quiz-heading"
      className="relative overflow-hidden bg-[#071b32] px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <ScrollReveal animation="up" className="w-full max-w-2xl">
          <span className="inline-flex text-[10px] font-extrabold tracking-[0.18em] text-(--gold) sm:text-[11px]">
            DAILY DEFENCE CHALLENGE
          </span>

          <h2
            id="home-quiz-heading"
            className="montserrat mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
          >
            Ready for today&apos;s
            <span className="block text-(--gold)">
              defence quiz?
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            Test your preparation with a timed daily challenge. Answer with
            focus, check your score, and learn from the explanations.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/quiz"
              className="group relative inline-flex min-h-12 overflow-hidden rounded-xl items-center justify-center gap-2 bg-(--gold) px-6 py-3 text-sm font-extrabold text-[#071b32] shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-(--gold)/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--gold)/40"
            >
              <span>Take Today&apos;s Quiz</span>
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/60 sm:text-sm">
              <ShieldCheck size={17} className="shrink-0 text-(--gold)" />
              One attempt per mobile number each day
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-xs font-medium text-white/70 sm:text-sm">
            <span>Timed practice</span>
            <span className="text-white/30">•</span>
            <span>Answer review</span>
            <span className="text-white/30">•</span>
            <span>Track your score</span>
          </div>
        </ScrollReveal>

        <ScrollReveal
          animation="up-zoom"
          delay={150}
          className="mx-auto w-full max-w-[430px] md:mx-0 md:justify-self-end"
        >
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between text-xs font-bold text-white/60">
              <span>QUESTION 01</span>
            </div>

            <p className="mt-4 text-base font-bold leading-7 text-white sm:text-lg">
              Every question is a chance to move closer to your goal.
            </p>

            <div className="mt-5 space-y-2.5" aria-hidden="true">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                  A
                </span>
                <span className="h-2 w-2/3 rounded-full bg-white/25" />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-(--gold)/50 bg-(--gold)/15 px-3.5 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--gold) text-[10px] font-extrabold text-[#071b32]">
                  B
                </span>
                <span className="h-2 w-1/2 rounded-full bg-(--gold)/70" />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                  C
                </span>
                <span className="h-2 w-3/4 rounded-full bg-white/25" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
