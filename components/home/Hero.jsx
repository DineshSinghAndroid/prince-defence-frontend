
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

// PREMIUM FLOATING TAG
const ImageTag = ({ children }) => (
    <div className="absolute top-1/2 left-0 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-xl border border-[#F5C76A]/60 bg-gradient-to-br from-[#29466F]/95 via-[#172F54]/95 to-[#0B1E3B]/95 px-2.5 py-1 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#FFD477] group-hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)] sm:rounded-2xl sm:px-3.5 sm:py-1.5">
        <span className="whitespace-nowrap text-[11px] font-extrabold tracking-wide text-white sm:text-xs">
            {children}
        </span>
    </div>
);

export const Hero = () => {
    return (
        <section
            className="relative overflow-hidden bg-[#071b32]"
            aria-label="Prince Defence Academy introduction"
        >
            <div className="mx-auto grid min-h-[650px] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:min-h-[700px] lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pb-24 lg:pt-40">

                {/* LEFT CONTENT */}
                <ScrollReveal animation="fade" duration={700}>
                    <div className="max-w-xl text-white">

                        <h1 className="font-poppins text-2xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-[48px]">
                            Prince Defence Academy

                            <span className="mt-2 block text-xl font-bold text-(--gold) sm:text-3xl lg:text-[28px]">
                                Build Your Career In Armed Forces
                            </span>
                        </h1>

                        <p className="font-lato mt-5 max-w-lg text-sm leading-6 text-white sm:text-xl sm:leading-7">
                            Welcome to Rajasthan&apos;s premier defence academy
                            in Sikar for NDA, Air Force, Navy, Army and SSB
                            preparation, led by experienced officers and
                            subject mentors.
                        </p>

                        {/* BUTTONS */}
                        <div className="mt-7 flex flex-row items-center gap-2.5 sm:gap-3.5">

                            <Link
                                href="/courses"
                                className="group inline-flex min-w-0 flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white px-3.5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#071b32] whitespace-nowrap shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--gold) hover:text-white hover:shadow-lg"
                            >
                                <span>Explore Courses</span>
                                <ArrowRight
                                    size={15}
                                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Link>

                            <Link
                                href="https://www.youtube.com/watch?v=TYeSoOQUhlY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gold-shimmer-cta group relative isolate inline-flex min-w-0 flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white whitespace-nowrap backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/20 hover:shadow-lg"
                            >
                                <span
                                    aria-hidden="true"
                                    className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                                />
                                <span className="relative">Campus Tour</span>
                                <ArrowRight
                                    size={15}
                                    className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Link>

                        </div>

                        {/* STATS */}
                        <div className="mt-10 grid max-w-lg grid-cols-3 gap-2 sm:gap-4 border-t border-white/25 pt-6 text-center sm:text-left mx-auto sm:mx-0">

                            <div className="flex flex-col items-center">
                                <p className="text-base font-extrabold text-(--gold) whitespace-nowrap sm:text-xl lg:text-2xl">
                                    3900+
                                </p>
                                <p className="mt-0.5 text-[10px] font-medium text-white/80 whitespace-nowrap sm:mt-1 sm:text-xs">
                                    Total Selections
                                </p>
                            </div>

                            <div className="border-l border-white/20 flex flex-col items-center pl-1 sm:pl-4">
                                <p className="text-base font-extrabold text-(--gold) whitespace-nowrap sm:text-xl lg:text-2xl">
                                    2012
                                </p>
                                <p className="mt-0.5 text-[10px] font-medium text-white/80 whitespace-nowrap sm:mt-1 sm:text-xs">
                                    Established
                                </p>
                            </div>

                            <div className="border-l border-white/20 flex flex-col items-center pl-1 sm:pl-4">
                                <p className="text-base font-extrabold text-(--gold) whitespace-nowrap sm:text-xl lg:text-2xl">
                                    13+ Years
                                </p>
                                <p className="mt-0.5 text-[10px] font-medium text-white/80 whitespace-nowrap sm:mt-1 sm:text-xs">
                                    Defence Training
                                </p>
                            </div>

                        </div>
                    </div>
                </ScrollReveal>


                {/* RIGHT IMAGE COLLAGE */}
                <ScrollReveal
                    animation="fade"
                    delay={150}
                    duration={700}
                >
                    <div className="flex w-full items-center justify-center lg:justify-end">

                        <div className="flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-5">

                            {/* COLUMN 1 */}
                            <div className="flex flex-col gap-2.5 sm:gap-4">

                                {/* AIR FORCE */}
                                <div className="group relative h-44 w-24 transition-transform duration-300 hover:-translate-y-1 sm:h-60 sm:w-36 lg:h-72 lg:w-40">

                                    <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[20px] border border-white/30 bg-[#DCE8F5]/15 shadow-lg sm:rounded-b-[30px] lg:rounded-b-[34px]">
                                        <Image
                                            src="/images/achiever2.webp"
                                            alt="Air Force Achiever"
                                            fill
                                            priority
                                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                            className="object-contain object-bottom"
                                        />
                                    </div>

                                    <ImageTag>Air Force</ImageTag>
                                </div>


                                {/* NAVY */}
                                <div className="group relative h-24 w-24 overflow-visible rounded-2xl border border-[#f1d98f]/60 bg-gradient-to-br from-[#e7c36d] via-[#b89242] to-[#8a6828] shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:h-36 sm:w-36 sm:rounded-3xl lg:h-40 lg:w-40 lg:rounded-[32px]">

                                    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                                        <Image
                                            src="/images/achiever1.webp"
                                            alt="Navy Achiever"
                                            fill
                                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    <ImageTag>Navy</ImageTag>
                                </div>

                            </div>


                            {/* COLUMN 2 */}
                            <div className="-translate-y-4 flex flex-col gap-2.5 sm:-translate-y-6 sm:gap-4">

                                {/* SSB */}
                                <div className="group relative h-24 w-24 overflow-visible rounded-2xl border border-white/80 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:h-36 sm:w-36 sm:rounded-3xl lg:h-40 lg:w-40 lg:rounded-[32px]">

                                    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                                        <Image
                                            src="/images/achiever3.webp"
                                            alt="SSB Achiever"
                                            fill
                                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    <ImageTag>SSB</ImageTag>
                                </div>


                                {/* NDA */}
                                <div className="group relative h-48 w-24 transition-transform duration-300 hover:-translate-y-1 sm:h-64 sm:w-36 lg:h-76 lg:w-40">

                                    <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[20px] border border-white/30 bg-[#DCE8F5]/15 shadow-lg sm:rounded-b-[28px] lg:rounded-b-[32px]">
                                        <Image
                                            src="/images/achiever.webp"
                                            alt="NDA Achiever"
                                            fill
                                            priority
                                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                            className="object-contain object-bottom"
                                        />
                                    </div>

                                    <ImageTag>NDA</ImageTag>
                                </div>

                            </div>


                            {/* COLUMN 3 */}
                            <div className="flex flex-col justify-center">

                                {/* ARMY */}
                                <div className="group relative h-60 w-24 transition-transform duration-300 hover:-translate-y-1 sm:h-80 sm:w-36 lg:h-[350px] lg:w-40">

                                    <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[24px] border border-white/30 bg-[#DCE8F5]/15 shadow-lg sm:rounded-b-[36px] lg:rounded-b-[40px]">
                                        <Image
                                            src="/images/achiever4.webp"
                                            alt="Army Achiever"
                                            fill
                                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                            className="object-contain object-bottom"
                                        />
                                    </div>

                                    <ImageTag>Army</ImageTag>
                                </div>

                            </div>

                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};
