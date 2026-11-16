import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactForm from "../common/ContactForm";
import HeroBackground from "./HeroBackground";

export const Hero = () => {
    return (
        <section
            className="relative min-h-[100svh] overflow-hidden border-b border-white/10"
            aria-label="Prince Defence Academy introduction"
        >
            <HeroBackground />

            {/* Hero content */}

            <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36">
                <div className="grid w-full  grid-cols-1 justify-items-center items-center gap-10 lg:grid-cols-2">

                    {/* Left content */}
                    <div className="max-w-5xl text-white">
                        <span className="glass-card inline-block rounded-full px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white sm:text-sm">
                            INDIA&apos;s NO.1 DEFENCE ACADEMY
                        </span>

                        <h1 className="mt-5 cinzel text-2xl text-shadow-xs text-shadow-white/70 text-(--gold) font-extrabold leading-tight sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
                            Prince Defence Academy
                            <span className="block text-(--white)">
                                Build Your Career
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-white/90 sm:text-base sm:leading-8 lg:text-lg">
                           Welcome to the Best Defence Academy in Sikar for NDA, Airforce, Navy, Army and Para Forces preparation, Prince Defence Academy. Along with defence services, we are known for offering best preparation or courses for SSC (GD), Police, Civil Services and other competitive exams preparations.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-7 flex flex-row gap-3">
                            <Link
                                href="/courses"
                                className="gold-shimmer-cta group relative isolate inline-flex min-w-0 flex-1 items-center justify-center gap-2 inter rounded-xl bg-(--gold) px-3 py-3 text-center text-xs font-bold text-[#071b32] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-none sm:px-6 sm:text-sm"
                            >
                                <span
                                    aria-hidden="true"
                                    className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                                />
                                <span className="relative">Explore Courses</span>
                                <ArrowRight
                                    size={17}
                                    className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Link>

                            <Link
                                href="https://www.youtube.com/watch?v=TYeSoOQUhlY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group glass-card inline-flex min-w-0 flex-1 items-center justify-center gap-2 inter rounded-xl border px-3 py-3 text-center text-xs font-semibold text-white hover:bg-white/20 sm:flex-none sm:px-6 sm:text-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Campus Tour
                                <ArrowRight
                                    size={17}
                                    className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Link>
                        </div>

                        {/* Stats cards */}
                        <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                            <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                    3900+
                                </p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                    Selections
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                    2012
                                </p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                    Established
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                    13+
                                </p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                    Years Experience
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry card */}
                    <div className="w-full max-w-lg">
                        <ContactForm theme="glass" size="md" />
                    </div>
                </div>
            </div>

        </section>
    );
};