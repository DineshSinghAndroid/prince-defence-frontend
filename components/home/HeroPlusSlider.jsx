"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const slides = [
    { src: "/images/DefenceTotalSection.webp", alt: "Prince Defence Total Sections 2026" },
    { src: "/images/Defenceresults01.webp", alt: "Prince Defence Results Slide" },
    { src: "/images/DefenceResult02.webp", alt: "Prince Defence Results Slide 2" },
];

export default function HeroPlusSlider() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]));
    const currentRef = useRef(current);
    const sliderIsNearViewportRef = useRef(
        typeof IntersectionObserver === "undefined"
    );
    const sliderRef = useRef(null);

    const goToSlide = (index) => {
        currentRef.current = index;
        setCurrent(index);
    };
    const next = () => goToSlide((currentRef.current + 1) % slides.length);
    const prev = () =>
        goToSlide((currentRef.current - 1 + slides.length) % slides.length);

    useEffect(() => {
        if (loadedSlides.has(current)) return;

        const frameId = requestAnimationFrame(() => {
            setLoadedSlides((previous) => {
                const nextSlides = new Set(previous);
                nextSlides.add(current);
                return nextSlides;
            });
        });

        return () => cancelAnimationFrame(frameId);
    }, [current, loadedSlides]);

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

    // Keep the same autoplay sequence without rendering or loading hidden slides.
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            const nextIndex = (currentRef.current + 1) % slides.length;
            currentRef.current = nextIndex;
            if (sliderIsNearViewportRef.current) setCurrent(nextIndex);
        }, 3500);
        return () => clearInterval(timer);
    }, [paused]);

    const arrow =
        "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1b3a] shadow-md backdrop-blur-sm transition hover:bg-[#d4af37] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold) md:h-11 md:w-11";

    return (
        <ScrollReveal
            animation="up"
            delay={100}
            duration={700}
            className="w-full min-w-0"
        >
            <div className="relative h-full w-full">
                <div
                    ref={sliderRef}
                    className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-(--navy) shadow-[0_20px_50px_rgba(16,42,67,0.18)] ring-1 ring-black/5 sm:h-[320px] sm:rounded-3xl md:h-[380px] lg:h-full lg:min-h-[460px]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setPaused(false);
                        }
                    }}
                >
                    {slides.map((slide, index) => {
                        if (index !== current && !loadedSlides.has(index)) return null;

                        return (
                            <div
                                key={slide.src}
                                aria-hidden={index !== current}
                                className={`absolute inset-0 transition-opacity duration-700 ${index === current && loadedSlides.has(index)
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0"
                                    }`}
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    sizes="(max-width: 1023px) 100vw, 50vw"
                                    quality={55}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        );
                    })}

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b1b3a]/80 via-[#0b1b3a]/30 to-transparent"
                    />

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

                    <div className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-between sm:inset-x-6 sm:bottom-4">
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
                                            ? "w-5 bg-(--gold)"
                                            : "w-2 bg-white/70"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-semibold tabular-nums text-white/90 sm:text-sm">
                            {String(current + 1).padStart(2, "0")} /{" "}
                            {String(slides.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
