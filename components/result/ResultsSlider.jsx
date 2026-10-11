"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

const slidesByCategory = {
    all: [
    {
        src: "/images/SsbTotalSelections.webp",
        alt: "Prince Defence Academy selection results",
        title: "A legacy of defence selections",
        category: "Our achievements",
    },
    {
        src: "/images/AirForceSelections.webp",
        alt: "Air Force students and achievements",
        title: "Preparing future Air Force achievers",
        category: "Air Force",
    },
    {
        src: "/images/ArmySelections.webp",
        alt: "Army students and achievements",
        title: "Building a future in the Army",
        category: "Army",
    },
    {
        src: "/images/NavySelections.webp",
        alt: "Navy students and achievements",
        title: "Celebrating our Navy selections",
        category: "Navy",
    },
    ],
    "air-force": [
        {
            src: "/images/AirForceSelections.webp",
            alt: "Air Force students and achievements",
            title: "Preparing future Air Force achievers",
            category: "Air Force",
        },
        {
            src: "/images/AirForceSelctions2.webp",
            alt: "Air Force fighter jets",
            title: "Focused training for the skies",
            category: "Air Force",
        },
    ],
    army: [
        {
            src: "/images/ArmySelections.webp",
            alt: "Army students and achievements",
            title: "Building a future in the Army",
            category: "Army",
        }
    ],
    navy: [
        {
            src: "/images/NavySelections.webp",
            alt: "Navy students and achievements",
            title: "Celebrating our Navy selections",
            category: "Navy",
        },
    ],
    nda: [
        {
            src: "/images/SsbTotalSelections.webp",
            alt: "Prince Defence Academy selection results",
            title: "A legacy of defence selections",
            category: "Navy",
        },
    ],
};

export default function ResultsSlider({ category = "all" }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const slides = slidesByCategory[category] || slidesByCategory.all;

    useEffect(() => {
        if (paused) return undefined;

        const timer = window.setInterval(() => {
            setCurrent((index) => (index + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [paused, slides.length]);

    const showPrevious = () => {
        setCurrent((index) => (index - 1 + slides.length) % slides.length);
    };

    const showNext = () => {
        setCurrent((index) => (index + 1) % slides.length);
    };

    return (
        <section
            aria-label="Prince Defence Academy results slideshow"
            className="bg-(--white) pt-3 sm:px-8 sm:py-8 lg:px-12 lg:py-12"
        >
            <div
                className="relative mx-auto aspect-[1145/501] max-w-7xl overflow-hidden rounded-none bg-(--navy) shadow-[0_24px_70px_rgba(8,24,48,0.2)] sm:aspect-[16/8] sm:rounded-3xl lg:aspect-[16/7]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setPaused(false);
                    }
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        aria-hidden={index !== current}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === current
                                ? "z-[1] opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            sizes="(max-width: 768px) calc(100vw - 40px), 1280px"
                            quality={95}
                            className={`object-contain md:object-cover transition-transform duration-[6000ms] ${
                                index === current
                                    ? "scale-100 md:scale-105"
                                    : "scale-100"
                            }`}
                        />
                    </div>
                ))}

                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[2] bg-gradient-to-t from-[#06162c]/90 via-[#06162c]/25 to-[#06162c]/10"
                />

                <div
                    className="absolute inset-x-12 bottom-3 z-[3] max-w-2xl text-white sm:inset-x-auto sm:bottom-16 sm:left-10 lg:bottom-20 lg:left-14"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]">
                        <Trophy size={12} className="text-(--gold) sm:h-[14px] sm:w-[14px]" />
                        {slides[current].category}
                    </span>
                    <h2 className="mt-1.5 max-w-xl font-(--font-montserrat) text-base font-bold leading-tight sm:mt-3 sm:text-3xl lg:text-5xl">
                        {slides[current].title}
                    </h2>
                    <p className="mt-2 hidden text-xs text-white/75 sm:block sm:text-sm">
                        Prince Defence Academy
                    </p>
                </div>

                <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous results image"
                    className="absolute left-3 top-1/2 z-[4] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#06162c]/35 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-(--gold) sm:left-6 sm:h-12 sm:w-12"
                >
                    <ChevronLeft aria-hidden="true" />
                </button>

                <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next results image"
                    className="absolute right-3 top-1/2 z-[4] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#06162c]/35 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-(--gold) sm:right-6 sm:h-12 sm:w-12"
                >
                    <ChevronRight aria-hidden="true" />
                </button>

                <div className="absolute bottom-4 right-5 z-[4] flex gap-2 sm:bottom-7 sm:right-10 lg:right-14">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.src}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Show results image ${index + 1}`}
                            aria-current={index === current ? "true" : undefined}
                            className={`h-2 rounded-full transition-all ${
                                index === current
                                    ? "w-8 bg-(--gold)"
                                    : "w-2 bg-white/70 hover:bg-white"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
