import ScrollReveal from "../animations/ScrollReveal";

const selections = [
  {
    batch: "1/2026",
    total: 182,
    detail: "X Group - 113, Y Group - 69",
  },
  {
    batch: "2/2025",
    total: 110,
    detail: "X Group - 67, Y Group - 43",
  },
  {
    batch: "1/2025",
    total: 85,
    detail: "X Group - 51, Y Group - 34",
  },
  {
    batch: "1/2025",
    total: 21,
    detail: "INDIAN NAVY - SSR",
  },
  {
    batch: "1/2025",
    total: 35,
    detail: "Tech - 10, GD - 19, Clerk - 6",
  },
  {
    batch: "2/2024",
    total: 28,
    detail: "INDIAN NAVY - SSR",
  },
  {
    batch: "1/2024",
    total: 78,
    detail: "X Group - 46, Y Group - 32",
  },
  {
    batch: "2/2023",
    total: 204,
    detail: "X Group - 119, Y Group - 85",
  },
  {
    batch: "1/2023",
    total: 174,
    detail: "X Group - 139, Y Group - 35",
  },
  {
    batch: "2/2023",
    total: 34,
    detail: "INDIAN NAVY - SSR",
  },
  {
    batch: "1/2023",
    total: 48,
    detail: "INDIAN NAVY - SSR",
  },
];



const questions = [
  {
    question: "Which are the courses offered by Prince Defence Academy?",
    answer:
      "Prince Defence Academy offers multiple courses such as NDA, Air Force, Navy, Army, SSC and SSB interviews, along with other competitive recruitment exams.",
  },
  {
    question: "Who can join Prince Defence Academy?",
    answer:
      "Students from Class 10, Class 12 or graduates can apply, depending on the course. Our team will help you pick the right one.",
  },
  {
    question: "Is hostel facility available at Prince Defence Academy?",
    answer:
      "Yes. We have a safe, comfortable hostel and a mess that serves fresh, healthy meals.",
  },
  {
    question: "Do Prince Defence provide physical training and SSB preparation?",
    answer:
      "Yes. Daily physical training, a gym and sports are part of the routine, and SSB students get regular guidance and mock practice.",
  },
  {
    question: "How can I take admission at Prince Defence Academy Sikar?",
    answer:
      "Visit our campus, call us or fill in the enquiry form on our website. We’ll guide you through every step.",
  },
];

export default function HomeFAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#DFE7F1] px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pb-10 lg:pt-20"
    >
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <header className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[rgba(35,79,61,0.25)] bg-white px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-(--green) sm:text-sm">
              FAQ
            </span>

            <h2
              id="faq-heading"
              className="mt-4 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl lg:text-4xl"
            >
              Frequently Asked{" "}
              <span className="text-(--gold)">Questions</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-(--muted) sm:text-base">
              Helpful information about courses, admissions and the
              academy.
            </p>
          </header>
        </ScrollReveal>

        <div className="home-faq-accordion mt-8 space-y-3">
          {questions.map((item, index) => (
            <ScrollReveal
              key={item.question}
              delay={Math.min(index * 60, 240)}
              duration={500}
            >
              <details
                name="home-faq"
                className="group rounded-2xl border border-slate-200 bg-white px-5 shadow-sm open:border-(--gold)/50 sm:px-6"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-(--navy) marker:hidden sm:text-base">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-xl font-normal text-(--gold) transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-7 text-(--muted)">
                  {item.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>


      {/* Selection Records */}
      <ScrollReveal animation="up" delay={100} duration={700}>
        <div className="mt-10 w-full -z-1 overflow-hidden rounded-3xl p-4 sm:p-6 lg:p-7">

          <style>{`
            @keyframes selection-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            .selection-marquee-track {
              animation: selection-marquee 28s linear infinite;
            }

            .selection-marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="font-extrabold text-[var(--navy)]  montserrat text-center pb-8">
            OUR SELECTIONS
          </div>

          <div className="w-full overflow-hidden">
            <div className="selection-marquee-track flex w-max items-stretch gap-4">
              {[...selections, ...selections].map((item, index) => (
                <article
                  key={`${item.batch}-${index}`}
                  className="relative h-full min-w-[180px] max-w-[260px] overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-tr from-[#ABD2FA]/70 via-white to-white shadow-[0_16px_35px_rgba(15,23,42,0.12)] before:absolute before:left-0 before:top-0 before:h-20 before:w-20 before:rounded-tl-xl before:border-l-2 before:border-t-2 before:border-[#031968]"
                >
                  <div className="flex h-full flex-col items-center justify-between gap-3 pt-6 text-center">

                    <div className="w-full">
                      <h4 className="montserrat text-sm font-bold leading-6 text-[var(--navy)] sm:text-base">
                        {item.batch}
                      </h4>

                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        {item.detail}
                      </p>
                    </div>

                    <div className="w-full">
                      <p className="font-[var(--font-montserrat)] text-2xl font-extrabold text-[var(--green)] sm:text-3xl">
                        {item.total}
                      </p>

                      <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        Selections
                      </span>
                    </div>

                    <div className="w-full rounded-b-xl bg-gradient-to-r from-[#FCAD38] to-[#EB7F31] py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Batch Record
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
