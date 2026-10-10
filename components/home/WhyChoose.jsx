import {

    ShieldCheck,
    ArrowUpRight,
    Eye
} from "lucide-react";



import Image from "next/image";
import Link from "next/link";
import facilities from "@/data/facilities.json"
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






const homeFacilities = facilities.facilities.filter((item) => item.onHome).slice(0, 6)


export default function WhyChooseUs() {
    return (
        <section
            id="why-choose-us"
            className="[content-visibility:auto] [contain-intrinsic-size:900px] bg-(--background) px-5 py-16 sm:px-8 lg:px-12 lg:pt-24 lg:pb-15 relative"
            aria-labelledby="why-choose-heading"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}

                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border uppercase border-[rgba(35,79,61,0.25)] bg-white/70 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-(--green) sm:text-sm">
                        Why to Choose Prince Defence Academy?
                    </span>

                    <ScrollReveal animation="up">

                        <h2
                            id="why-choose-heading"
                            className="mt-4 montserrat text-2xl font-bold leading-tight text-(--navy) sm:text-3xl lg:text-4xl"
                        >
                            <span className="text-(--gold) montserrat"> Building </span>  Aspirants Into Future
                            Defence Professionals
                        </h2>

                    </ScrollReveal>

                    <p className="mt-4 text-xs leading-6 text-(--muted) inter sm:text-base lg:text-medium">
                        When it comes to taking admission at Prince Defence Academy Sikar, parents and students should know the key reasons why Prince Defense Academy is the best choice for defence & competitive exam preparation.


                    </p>
                </div>



                {/* Selection section */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">



                        {/* Selection highlight */}

                        <ScrollReveal animation="right">
                            <div className="rounded-3xl bg-(--green) p-7 text-white sm:p-9 lg:h-180">

                                <span className="text-sm font-semibold tracking-widest text-(--gold)">
                                    OUR TOTAL SELECTIONS
                                </span>

                                <div className="mt-5 flex items-end gap-2">
                                    <span className="font-(--font-montserrat) text-5xl font-extrabold sm:text-6xl">
                                        3965
                                    </span>

                                    <span className="mb-2  text-white/70">
                                        Selections
                                    </span>
                                </div>

                                <div className="relative mt-6 h-48 lg:h-80 w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src="/images/nda01.webp"
                                        alt="NDA selections"
                                        fill
                                        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 40vw, 40vw"
                                        quality={85}
                                        className="object-cover"
                                    />
                                </div>

                                <p className="mt-5 max-w-md inter text-sm leading-6 text-white/75">
                                    We empower young aspirants with the right guidance, disciplined training, and expert mentorship to pursue a career in the Armed Forces.
                                    Our focused approach helps students build confidence, leadership, determination, and a strong sense of service.
                                </p>

                                <Link
                                    href="/results"
                                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-(--gold)"
                                >
                                    View Selection Results
                                    <ArrowUpRight size={17} />
                                </Link>

                            </div>
                        </ScrollReveal>


                        {/* Facilities  */}
                        <ScrollReveal
                            animation="left"
                        >
                            <div >
                                <span className="text-lg font-semibold tracking-widest text-(--gold)">
                                    OUR FACILITIES
                                </span>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-5 ">
                                    {homeFacilities.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={`/facilities/${item.slug}`}
                                            aria-label={`Learn more about ${item.title}`}
                                            className="block glass rounded-xl overflow-hidden relative
    before:absolute before:top-0 before:left-0 before:w-20 before:h-20
    before:border-l-2 before:border-t-2 before:border-(--navy)
    before:rounded-tl-xl
    after:absolute after:bottom-0 after:right-0 after:w-20 after:h-20
    after:border-r-2 after:border-b-2 after:border-(--navy)
    after:rounded-br-xl
    shadow-[0_10px_28px_rgba(8,24,48,0.28)]
    hover:scale-105 hover:shadow-[0_18px_42px_rgba(8,24,48,0.4)]
    transition-[transform,box-shadow] duration-300 ease-in-out"
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">


                                                    {item.images?.length > 0 && (<Image
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        fill
                                                        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 28px), 213px"
                                                        quality={85}
                                                        fetchPriority="low"
                                                        className="object-cover"
                                                    />)}



                                                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-4 pb-4 pt-12">


                                                        <div className="text-center">

                                                            <span className="block text-xl font-semibold montserrat text-(--white)">
                                                                {item.title}
                                                            </span>



                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <p className="mt-2 text-xs line-clamp-3 leading-5 inter text-(--muted) px-4">
                                                {item.longDescription}
                                            </p>

                                            <span className="mt-2 inline-flex items-center gap-2 text-xs px-4 pb-2 font-semibold text-(--navy)">
                                                Learn More
                                                <ArrowUpRight size={17} />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex justify-center">
                                    <Link
                                        href="/facilities"
                                        className="mt-7 py-2 px-4 items-center rounded-2xl text-xs inline-flex border border-(--gold) gap-2 montserrat font-semibold text-(--gold) hover:-translate-y-1"
                                    >
                                        View All <Eye size={15} />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

            </div>
        </section>
    );
}