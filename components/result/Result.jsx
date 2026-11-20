

import result from "@/data/results.json";
import ScrollReveal from "../animations/ScrollReveal";
import ProspectusCard from "./ProspectusCard";
import Link from "next/link";
import ResultsSlider from "./ResultsSlider";
import YearResultImage from "./YearResultImage";

const resultCategories = [
    { label: "All Results", href: "/results", value: "all" },
    { label: "Air Force", href: "/results/air-force", value: "air-force" },
    { label: "Army", href: "/results/army", value: "army" },
    { label: "Navy", href: "/results/navy", value: "navy" },
    { label: "NDA", href: "/results/nda", value: "nda" },
];

const matchesCategory = (item, category) => {
    if (category === "all") return true;

    const searchable = `${item.title} ${item.category}`.toLowerCase();

    if (category === "air-force") return searchable.includes("air force");
    if (category === "army") return searchable.includes("army");
    if (category === "navy") return searchable.includes("navy");
    if (category === "nda") return searchable.includes("nda");

    return false;
};

const getWingTheme = (item) => {
    const title = (item?.title || "").toLowerCase();
    const category = (item?.category || "").toLowerCase();
    const fullText = `${title} ${category}`;

    if (title.includes("air force") || title.includes("airforce")) {
        return {
            color: "#0284C7", // Sky / Air Force Blue
            titleColor: "#0284C7",
            badgeBg: "bg-[#e0f2fe] text-[#0369a1]",
            borderHover: "hover:border-[#0284C7]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(2,132,199,0.18)]",
        };
    }
    if (title.includes("army")) {
        return {
            color: "#2D6A4F", // Military / Army Olive Green
            titleColor: "#2D6A4F",
            badgeBg: "bg-[#dcfce7] text-[#166534]",
            borderHover: "hover:border-[#2D6A4F]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(45,106,79,0.18)]",
        };
    }
    if (title.includes("navy")) {
        return {
            color: "#002060", // Indian Navy Deep Blue
            titleColor: "#002060",
            badgeBg: "bg-[#dbeafe] text-[#1e40af]",
            borderHover: "hover:border-[#002060]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(0,32,96,0.20)]",
        };
    }
    if (title.includes("nda") || title.includes("ssb")) {
        return {
            color: "#D4AF37", // NDA Royal Gold
            titleColor: "#B89242",
            badgeBg: "bg-[#fef3c7] text-[#92400e]",
            borderHover: "hover:border-[#D4AF37]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(212,175,55,0.20)]",
        };
    }

    if (fullText.includes("air force") || fullText.includes("airforce")) {
        return {
            color: "#0284C7",
            titleColor: "#0284C7",
            badgeBg: "bg-[#e0f2fe] text-[#0369a1]",
            borderHover: "hover:border-[#0284C7]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(2,132,199,0.18)]",
        };
    }
    if (fullText.includes("army")) {
        return {
            color: "#2D6A4F",
            titleColor: "#2D6A4F",
            badgeBg: "bg-[#dcfce7] text-[#166534]",
            borderHover: "hover:border-[#2D6A4F]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(45,106,79,0.18)]",
        };
    }
    if (fullText.includes("navy")) {
        return {
            color: "#002060",
            titleColor: "#002060",
            badgeBg: "bg-[#dbeafe] text-[#1e40af]",
            borderHover: "hover:border-[#002060]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(0,32,96,0.20)]",
        };
    }
    if (fullText.includes("nda") || fullText.includes("ssb")) {
        return {
            color: "#D4AF37",
            titleColor: "#B89242",
            badgeBg: "bg-[#fef3c7] text-[#92400e]",
            borderHover: "hover:border-[#D4AF37]/60",
            shadowHover: "hover:shadow-[0_20px_40px_rgba(212,175,55,0.20)]",
        };
    }

    return {
        color: "#4F46E5", // Government / Combined Services
        titleColor: "#4F46E5",
        badgeBg: "bg-[#ede9fe] text-[#4338ca]",
        borderHover: "hover:border-[#4F46E5]/60",
        shadowHover: "hover:shadow-[0_20px_40px_rgba(79,70,229,0.18)]",
    };
};

const getYear = (item) => {
    if (item?.year) return String(item.year);
    const match = item?.date?.match(/\b20\d{2}(?:-\d{2})?\b/);
    return match ? match[0] : "Other";
};

const Result = ({ category = "all" }) => {
    const activeCategory =
        resultCategories.find((item) => item.value === category) ||
        resultCategories[0];
    const filteredResults = result.result.filter((item) =>
        matchesCategory(item, activeCategory.value)
    );
    const groupedResults = Object.groupBy(
        filteredResults,
        (item) => getYear(item)
    );
    const years = Object.keys(groupedResults).sort((first, second) =>
        second.localeCompare(first, undefined, { numeric: true })
    );

    return (
        <section
            id="results"
            aria-labelledby="results-heading"
            className="bg-[#F0F3F8]"
        >
            {/* Results Hero */}




            <header className="relative isolate overflow-hidden bg-gradient-to-br from-[#000825] via-[#001D87] to-[#002CCD] px-4 pb-32 pt-30 sm:px-8 sm:pb-44 sm:pt-32 lg:px-12 lg:pb-56 lg:pt-36">
                <ScrollReveal className="mx-auto max-w-7xl">
                    <div>
                        <div className="flex items-center justify-center gap-3 lg:justify-start">


                            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-100 sm:text-sm">
                                
                                OUR RESULTS
                            </span>


                        </div>

                        <div className="mt-5 grid items-center gap-2 sm:mt-9 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                            <div className="relative text-center lg:text-left">
                                <h2
                                    id="results-heading"
                                    className="montserrat text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl sm:leading-[1.2] md:text-5xl lg:text-6xl"
                                >
                                    {activeCategory.value === "all"
                                        ? "Year After Year, We Deliver"
                                        : `${activeCategory.label} Selection`}{" "}
                                    <span className="bg-gradient-to-r from-[#94E6FE] via-[#ADD4BD] to-[#FFAA22] bg-clip-text text-transparent">
                                        Results
                                    </span>
                                </h2>

                                
                            </div>

                            <div className="relative lg:border-l lg:border-white/20 lg:pl-8">
                                <div className="absolute -left-px top-0 hidden h-12 w-0.5 bg-[#FFAA22] lg:block" />

                                <p className="inter text-center text-sm leading-6 text-white/90 sm:text-base sm:leading-8 md:text-justify">
                                    Explore our selection achievements and see the consistent success of our students across defence and government recruitment examinations.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Curved bottom edge transitioning into #F0F3F8 */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 1440 64"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-x-0 -bottom-px z-0 h-14 w-full text-[#F0F3F8] sm:h-20 lg:h-28"
                >
                    <path
                        fill="currentColor"
                        d="M0,64 L0,24 C360,64 1080,0 1440,32 L1440,64 Z"
                    />
                </svg>
            </header>

            <div className="relative z-20 -mt-24 sm:-mt-36 lg:-mt-48">
                <ScrollReveal>
                    <ResultsSlider
                        key={activeCategory.value}
                        category={activeCategory.value}
                    />
                </ScrollReveal>
            </div>

            {/* Selection Records */}
            <div className="mx-auto max-w-6xl px-3 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <header className="mb-8 sm:mb-12">
                   

                    <h3 className="mt-2.5 font-(--font-montserrat) text-2xl font-black tracking-tight text-(--navy) sm:text-3xl lg:text-4xl">
                        {activeCategory.value === "all"
                            ? "Selection Records by Year"
                            : `${activeCategory.label} Results by Year`}
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm text-(--muted) max-w-xl">
                        Official merit list selections and academy milestones across defence recruitment batches.
                    </p>

                    <nav
                        aria-label="Filter results by defence force"
                        className="mt-6 flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain whitespace-nowrap pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
                    >
                        {resultCategories.map((item) => (
                            <Link
                                key={item.value}
                                href={item.href}
                                aria-current={
                                    item.value === activeCategory.value
                                        ? "page"
                                        : undefined
                                }
                                className={`rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${item.value === activeCategory.value
                                    ? "bg-(--navy) text-white shadow-md shadow-[#001D87]/25"
                                    : "border border-slate-200 bg-white text-(--navy) hover:border-(--gold) hover:text-(--gold) shadow-sm"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {years.length ? (
                    <div className="space-y-12 sm:space-y-16">
                        {years.map((year) => (
                            <section
                                key={year}
                                aria-labelledby={`results-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                            >
                                <ScrollReveal>
                                    <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
                                        <h4
                                            id={`results-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                            className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 font-(--font-montserrat) text-lg sm:text-2xl font-black text-(--navy)"
                                        >
                                           
                                            <span>{year}</span>
                                            <span className="h-px flex-1 bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />
                                        </h4>
                                        {/* <YearResultImage
                                            year={year}
                                            category={activeCategory.value}
                                        /> */}
                                    </div>
                                </ScrollReveal>

                                <div className="grid grid-cols-2 gap-2.5 pt-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                    {groupedResults[year].map((item, index) => {
                                        const wingTheme = getWingTheme(item);

                                        return (
                                            <ScrollReveal
                                                key={`${item.title}-${item.date}-${index}`}
                                                animation="up"
                                                delay={Math.min(index * 35, 200)}
                                                duration={400}
                                                className="h-full pt-2 sm:pt-3"
                                            >
                                                <article className={`group relative flex h-full min-h-[150px] sm:min-h-60 flex-col rounded-2xl sm:rounded-3xl border border-white/80 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F0F3F8] shadow-[0_8px_24px_rgba(15,35,65,0.07),0_2px_6px_rgba(15,35,65,0.03)] transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 ${wingTheme.borderHover} ${wingTheme.shadowHover}`}>
                                                    {/* Top Line / Tab: Exactly Half Outside & Half Inside the Box as in Screenshot */}
                                                    <div
                                                        className="absolute top-0 left-1/2 z-10 h-2.5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-3.5 sm:w-28"
                                                        style={{
                                                            background: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.12) 100%), ${wingTheme.color}`,
                                                            boxShadow: `0 3px 8px -1px ${wingTheme.color}80, 0 1px 2px rgba(0,0,0,0.12)`,
                                                        }}
                                                        aria-hidden="true"
                                                    />

                                                    <div className="flex flex-1 flex-col p-3 pt-3.5 sm:p-6 sm:pt-7">
                                                        <div className="flex items-center justify-between gap-1.5 sm:gap-3">
                                                            <span className={`inline-flex max-w-[75%] truncate rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-bold ${wingTheme.badgeBg}`}>
                                                                {item.date}
                                                            </span>
                                                           
                                                        </div>

                                                        <h5
                                                            className="montserrat mt-2 sm:mt-4 text-xs sm:text-base font-bold leading-tight sm:leading-6 line-clamp-2 min-h-[2rem] sm:min-h-[3rem]"
                                                            style={{ color: wingTheme.titleColor }}
                                                        >
                                                            {item.title}
                                                        </h5>

                                                        <div className="mt-auto pt-1 sm:pt-6">
                                                            <p className="font-(--font-montserrat) text-[28px] font-black leading-none text-(--navy) sm:text-4xl lg:text-5xl">
                                                                {item.selections}
                                                            </p>
                                                            <span className="mt-0.5 sm:mt-1.5 block text-[8px] sm:text-xs font-bold uppercase tracking-[0.14em] text-(--muted)">
                                                                Selections
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p className="rounded-b-2xl sm:rounded-b-3xl border-t border-slate-200/50 bg-white/30 px-3 py-2 sm:px-5 sm:py-3.5 text-[9px] sm:text-xs font-semibold leading-tight text-(--muted) truncate">
                                                        {item.category}
                                                    </p>
                                                </article>
                                            </ScrollReveal>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-(--muted)">
                        No {activeCategory.label} results are available yet.
                    </p>
                )}
            </div>



            {/* Prospectus */}
            <ProspectusCard heading="Be The Next Selection." />
        </section>
    );
};

export default Result;
