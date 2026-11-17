"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const slides = [
    { src: "/images/DefenceTotalSection.webp", alt: "Prince Defence Total Selections 2026" },
    { src: "/images/Defenceresults01.webp", alt: "Prince Defence Results Slide" },
    { src: "/images/DefenceResult02.webp", alt: "Prince Defence Results Slide 2" },
];

export default function HeroPlusSlider() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const currentRef = useRef(current);
    const sliderIsNearViewportRef = useRef(
        typeof IntersectionObserver === "undefined"
    );
    const sliderRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const goToSlide = (index) => {
        currentRef.current = index;
        setCurrent(index);
    };
    const next = () => goToSlide((currentRef.current + 1) % slides.length);
    const prev = () =>
        goToSlide((currentRef.current - 1 + slides.length) % slides.length);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                sliderIsNearViewportRef.current = entry.isIntersecting;
                if (entry.isIntersecting) setCurrent(currentRef.current);
            },
            { rootMargin: "100px 0px" }
        );

        observer.observe(slider);
        return () => observer.disconnect();
    }, []);

    // Autoplay sliding sequence
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            const nextIndex = (currentRef.current + 1) % slides.length;
            currentRef.current = nextIndex;
            if (sliderIsNearViewportRef.current) setCurrent(nextIndex);
        }, 3500);
        return () => clearInterval(timer);
    }, [paused]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                next();
            } else {
                prev();
            }
        }
    };

    const arrow =
        "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1b3a] shadow-md backdrop-blur-sm transition hover:bg-[#d4af37] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold) md:h-11 md:w-11";

    return (
        <ScrollReveal
            animation="up"
            delay={100}
            duration={700}
            className="w-full min-w-0 flex justify-center lg:justify-start"
        >
            <div className="relative h-full w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[490px] xl:max-w-[515px] mx-auto lg:ml-0 lg:mr-auto">
                <div
                    ref={sliderRef}
                    className="relative h-[380px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-(--navy) shadow-[0_24px_60px_-15px_rgba(16,42,67,0.22)] ring-1 ring-black/5 sm:h-[340px] md:h-[400px] lg:h-full lg:min-h-[480px]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setPaused(false);
                        }
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Horizontal sliding track - images visibly slide left */}
                    <div
                        className="flex h-full w-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={slide.src}
                                aria-hidden={index !== current}
                                className="relative h-full w-full flex-none"
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 1023px) 100vw, 50vw"
                                    quality={75}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Bottom gradient overlay */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-[#0b1b3a]/80 via-[#0b1b3a]/30 to-transparent"
                    />

                    {/* Navigation buttons */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous slide"
                        className={`${arrow} left-3 sm:left-5`}
                    >
                        <ChevronLeft aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next slide"
                        className={`${arrow} right-3 sm:right-5`}
                    >
                        <ChevronRight aria-hidden="true" />
                    </button>

                    {/* Slide indicators & counter */}
                    <div className="absolute inset-x-4 bottom-3 z-20 flex items-center justify-between sm:inset-x-6 sm:bottom-4">
                        <div className="flex gap-1.5">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.src}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-current={index === current ? "true" : undefined}
                                    className="flex h-10 w-5 items-center justify-center py-2"
                                >
                                    <span
                                        className={`h-2 rounded-full transition-all duration-300 ${index === current
                                            ? "w-6 bg-(--gold)"
                                            : "w-2 bg-white/70 hover:bg-white"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold tabular-nums text-white/90 backdrop-blur-sm sm:text-sm">
                            {String(current + 1).padStart(2, "0")} /{" "}
                            {String(slides.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
