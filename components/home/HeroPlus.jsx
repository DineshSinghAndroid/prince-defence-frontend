import ScrollReveal from "../animations/ScrollReveal";
import HeroPlusSlider from "./HeroPlusSlider";

export default function HeroPlus() {
  return (
    <section className="overflow-x-hidden border-b border-slate-200/60 bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
          <h2 className="montserrat text-2xl font-bold leading-tight text-(--navy) sm:text-3xl lg:text-4xl">
            Where Defence Dreams Become <br />
            <span className="text-(--gold)">Proud Achievements</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {/* ---------- Image slider ---------- */}
          <HeroPlusSlider />

          {/* ---------- Text (unchanged) ---------- */}
          <ScrollReveal
            animation="up"
            delay={180}
            duration={700}
            className="h-full min-w-0"
          >
            <div className="flex h-full flex-col justify-center lg:pl-4">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
               
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-(--gold) sm:text-sm">
                  Introduction
                </span>
              </div>

              {/* Heading */}
              <h3 className="cinzel mt-4 text-2xl font-bold leading-snug text-(--navy) sm:text-3xl lg:text-4xl">
                Prince Defence Academy
              </h3>

              {/* Introduction */}
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 text-justify sm:text-lg sm:leading-8">
                Started in 2012, &nbsp;
                <span className="font-semibold text-(--navy)">
                  Prince Defence Academy
                </span>{" "}
                has helped thousands of candidates secure selections in defence
                exams, including NDA, Navy, AirForce, Army, SSC and Police etc.
                Prince Defence Academy, Sikar, is known for providing the best
                education and physical training. Prince Defence Academy creates
                a learning environment and provides physical training under the
                guidance of retired army officials.
              </p>

              <div className="mt-6 max-w-xl border-l-4 border-(--gold) pl-5">
                <p className="mt-2 text-base leading-8 text-slate-600 text-justify sm:text-lg sm:leading-8">
                  The main motive of PDA Sikar is to produce Armed Personnel
                  from every corner of India and build a successful career in
                  the Indian Defence Forces. We not only believe in delivering
                  academic education, but at Prince Defence, we also focus on
                  the overall development of every student. Here students are
                  offered structured classroom teaching, regular tests,
                  doubt-solving sessions, physical training, personality
                  development, and SSB and interview preparation.
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-8 flex flex-row justify-between md:justify-start md:gap-10 lg:gap-12">
                {["Discipline", "Expert Mentors", "Results"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-(--navy)"
                  >
              
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
