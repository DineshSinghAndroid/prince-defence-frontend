
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

// FLOATING MATH FORMULAS & ALGORITHMS BACKGROUND FOR ROUNDED BOXES
const MathAlgorithmPattern = ({ variant = 1 }) => (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-30">
        {variant === 1 && (
            <svg
                className="h-full w-full"
                viewBox="0 0 160 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <text x="16" y="28" fill="#F5C76A" fontSize="9" fontFamily="monospace" fontWeight="bold">lim (sin x)/x = 1</text>
                <text x="22" y="48" fill="white" fontSize="11" fontFamily="serif" fontStyle="italic">∫ e&#739; dx = e&#739; + C</text>
                <text x="14" y="68" fill="#F5C76A" fontSize="10" fontFamily="serif">sin²θ + cos²θ = 1</text>
                <text x="26" y="88" fill="white" fontSize="10" fontFamily="monospace">O(n log n)</text>
                <text x="18" y="108" fill="white" fontSize="11" fontFamily="serif" fontStyle="italic">E = mc²</text>
                <text x="22" y="128" fill="#F5C76A" fontSize="10" fontFamily="serif">e^(iπ) + 1 = 0</text>
                <text x="16" y="148" fill="white" fontSize="9" fontFamily="monospace">f(x) = ∑ aₙ xⁿ</text>

                {/* Subtle Algorithm Graph / Flow nodes */}
                <circle cx="45" cy="175" r="5" stroke="#F5C76A" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <line x1="50" y1="175" x2="85" y2="175" stroke="#F5C76A" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="90" cy="175" r="5" stroke="#F5C76A" strokeWidth="1" fill="none" />
                <line x1="90" y1="180" x2="90" y2="205" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="90" cy="210" r="5" stroke="white" strokeWidth="1" fill="none" />
                <text x="100" y="178" fill="white" fontSize="8" fontFamily="monospace">DFS()</text>
                <text x="100" y="213" fill="#F5C76A" fontSize="8" fontFamily="monospace">BFS()</text>
            </svg>
        )}
        {variant === 2 && (
            <svg
                className="h-full w-full"
                viewBox="0 0 160 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <text x="20" y="28" fill="white" fontSize="10" fontFamily="serif">|A - λI| = 0</text>
                <text x="24" y="48" fill="#F5C76A" fontSize="10" fontFamily="serif" fontStyle="italic">∑ k = n(n+1)/2</text>
                <text x="16" y="68" fill="white" fontSize="10" fontFamily="monospace">BinarySearch()</text>
                <text x="20" y="88" fill="#F5C76A" fontSize="10" fontFamily="serif" fontStyle="italic">∇ × B = μ₀J</text>
                <text x="16" y="108" fill="white" fontSize="9" fontFamily="serif">d/dx(tan x) = sec²x</text>
                <text x="16" y="128" fill="#F5C76A" fontSize="9" fontFamily="monospace">T(n) = 2T(n/2) + O(n)</text>
                <text x="24" y="148" fill="white" fontSize="10" fontFamily="serif" fontStyle="italic">x = (-b±√Δ)/2a</text>

                {/* Tree / Algorithm Graph */}
                <circle cx="80" cy="175" r="6" stroke="white" strokeWidth="1" fill="none" />
                <line x1="75" y1="180" x2="55" y2="205" stroke="#F5C76A" strokeWidth="1" />
                <line x1="85" y1="180" x2="105" y2="205" stroke="#F5C76A" strokeWidth="1" />
                <circle cx="50" cy="210" r="5" stroke="#F5C76A" strokeWidth="1" fill="none" />
                <circle cx="110" cy="210" r="5" stroke="#F5C76A" strokeWidth="1" fill="none" />
                <text x="30" y="228" fill="white" fontSize="8" fontFamily="monospace">Left</text>
                <text x="98" y="228" fill="white" fontSize="8" fontFamily="monospace">Right</text>
            </svg>
        )}
        {variant === 3 && (
            <svg
                className="h-full w-full"
                viewBox="0 0 160 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <text x="24" y="30" fill="#F5C76A" fontSize="11" fontFamily="serif" fontStyle="italic">F = m · a</text>
                <text x="18" y="52" fill="white" fontSize="10" fontFamily="serif">v² = u² + 2as</text>
                <text x="18" y="74" fill="#F5C76A" fontSize="9" fontFamily="monospace">QuickSort(A, p, r)</text>
                <text x="16" y="96" fill="white" fontSize="10" fontFamily="serif" fontStyle="italic">∫ e^(-x²) dx = √π/2</text>
                <text x="22" y="118" fill="#F5C76A" fontSize="10" fontFamily="serif">Δp · Δx ≥ ℏ/2</text>
                <text x="18" y="140" fill="white" fontSize="9" fontFamily="monospace">while (left &le; right)</text>
                <text x="22" y="162" fill="#F5C76A" fontSize="10" fontFamily="serif" fontStyle="italic">P(A|B) = P(B|A)·P(A)/P(B)</text>
                <text x="22" y="184" fill="white" fontSize="10" fontFamily="serif">λ = h / (m·v)</text>

                {/* Algorithmic Flowchart Nodes */}
                <rect x="42" y="200" width="76" height="16" rx="4" stroke="white" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                <text x="56" y="211" fill="white" fontSize="8" fontFamily="monospace">EXECUTE</text>
                <line x1="80" y1="216" x2="80" y2="236" stroke="#F5C76A" strokeWidth="1" />
                <polygon points="80,242 77,235 83,235" fill="#F5C76A" />
                <polygon points="80,246 108,258 80,270 52,258" stroke="#F5C76A" strokeWidth="1" fill="none" />
                <text x="68" y="261" fill="#F5C76A" fontSize="8" fontFamily="monospace">VALID?</text>
            </svg>
        )}
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
                        <div className="mt-10 grid max-w-lg grid-cols-3 gap-2 sm:gap-4  pt-6 text-center sm:text-left mx-auto sm:mx-0">

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

                                    <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DCE8F5]/15 shadow-xl">
                                        <MathAlgorithmPattern variant={1} />
                                        <div className="absolute inset-x-0 bottom-0 top-3 sm:top-4 z-10">
                                            <Image
                                                src="/images/hero-student1-cropped.webp"
                                                alt="Air Force Achiever"
                                                fill
                                                priority
                                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
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
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <ImageTag>SSB</ImageTag>
                                </div>


                                {/* NDA */}
                                <div className="group relative h-48 w-24 transition-transform duration-300 hover:-translate-y-1 sm:h-64 sm:w-36 lg:h-76 lg:w-40">

                                    <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DCE8F5]/15 shadow-xl">
                                        <MathAlgorithmPattern variant={2} />
                                        <div className="absolute inset-x-0 bottom-0 top-3 sm:top-4 z-10">
                                            <Image
                                                src="/images/hero-student3-cropped.webp"
                                                alt="NDA Achiever"
                                                fill
                                                priority
                                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    <ImageTag>NDA</ImageTag>
                                </div>

                            </div>


                            {/* COLUMN 3 */}
                            <div className="flex flex-col justify-center">

                                {/* ARMY */}
                                <div className="group relative h-60 w-24 transition-transform duration-300 hover:-translate-y-1 sm:h-80 sm:w-36 lg:h-[350px] lg:w-40">

                                    <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DCE8F5]/15 shadow-xl">
                                        <MathAlgorithmPattern variant={3} />
                                        <div className="absolute inset-x-0 bottom-0 top-3.5 sm:top-5 z-10">
                                            <Image
                                                src="/images/hero-student2-cropped.webp"
                                                alt="Army Achiever"
                                                fill
                                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                                                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
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
