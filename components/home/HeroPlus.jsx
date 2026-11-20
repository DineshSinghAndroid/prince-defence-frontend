import ScrollReveal from "../animations/ScrollReveal";
import HeroPlusSlider from "./HeroPlusSlider";

export default function HeroPlus() {
  return (
    <section className="overflow-x-hidden border-b border-slate-200/60 bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
       

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-6">
          {/* ---------- Text (left side, unchanged text) ---------- */}
          <ScrollReveal
            animation="up"
            delay={100}
            duration={700}
            className="h-full min-w-0"
          >
            <div className="flex h-full flex-col justify-center">
              

              {/* Heading */}
              <h3 className="poppins mt-4 text-2xl font-bold leading-snug text-(--navy) sm:text-3xl lg:text-4xl">
                Prince Defence Academy: 
                <span className="text-(--gold) text-xl lg:text-4xl"> Where Defence Dreams Become True</span>
              </h3>

              {/* Introduction */}
              <p className="mt-6 max-w-xl font-lato text-base font-semibold leading-6 text-black text-justify sm:text-lg sm:leading-8">
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

              <div className="mt-6 max-w-xl">
                <p className="mt-2 font-lato font-semibold text-base leading-6 text-black text-justify sm:text-lg sm:leading-8">
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

            </div>
          </ScrollReveal>

          {/* ---------- Image slider (right side) ---------- */}
          <HeroPlusSlider />
        </div>
      </div>
    </section>
  );
}
