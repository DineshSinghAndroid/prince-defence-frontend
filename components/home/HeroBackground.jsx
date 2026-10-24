"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
    {
        image: "/images/fighterjet.avif",
        alt: "Defence fighter jet",
    },
    {
        image: "/images/fighterjets.avif",
        alt: "Fighter jets formation",
    },
    {
        image: "/images/military.avif",
        alt: "Defence training",
    },
    {
        image: "/images/campusbg-2.webp",
        alt: "Defence training",
    },
];

export default function HeroBackground() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 9000);

        return () => clearInterval(timer);
    }, []);

    const activeSlide = slides[current];

    return (
        <>
            {/* Background images */}
            <div className="absolute inset-0">
                <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    quality={45}
                    className="object-cover object-center"
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(8,20,30,0.85)]" />

            {/* Dots navigation - closely packed with gap-2 and 44px touch target */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`slider-dot h-2 rounded-full transition-all duration-300 ${
                            index === current
                                ? "w-7 bg-(--gold)"
                                : "w-2 bg-white/60"
                        }`}
                    />
                ))}
            </div>
        </>
    );
}
