"use client";

import { useState } from "react";

export default function ProspectusCard({
  href = "/files/Defence-Pros-2026.pdf",
  heading = "Be The Next Selection.",
  text = "Explore our courses, expert faculty, batch details and selection results in one free prospectus.",
  fileInfo = "PDF",
}) {
  const [done, setDone] = useState(false);

  const handleClick = () => {
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-12 pt-4 text-center sm:pb-16 sm:pt-6">
      <style>{`
        @keyframes pc-shimmer { 0% { transform: translateX(-130%) skewX(-20deg); } 100% { transform: translateX(330%) skewX(-20deg); } }
        @keyframes pc-bob { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }
        @keyframes pc-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .pc-shimmer { animation: pc-shimmer 2.8s ease-in-out infinite; }
        .pc-bob { animation: pc-bob 1.6s ease-in-out infinite; }
        .group:hover .pc-bob { animation-duration: .7s; }
        .pc-pop { animation: pc-pop .4s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .pc-shimmer, .pc-bob, .pc-pop { animation: none !important; }
        }
      `}</style>

      <h2 className="montserrat text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
        {heading}
      </h2>

      <p className="inter mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base md:text-lg">
        {text}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:gap-4">
        <div className="relative w-full sm:w-auto">
          <a
            href={href}
            download
            onClick={handleClick}
            aria-live="polite"
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 montserrat text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/60 active:translate-y-0 active:scale-95 sm:w-auto sm:px-7 sm:py-4 sm:text-base md:text-lg"
          >
            {/* Shimmer sweep */}
            <span
              aria-hidden
              className="pc-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/50 blur-md"
            />

            <span className="relative flex h-6 w-6 items-center justify-center">
              {done ? (
                <svg
                  key="ok"
                  className="pc-pop h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  key="dl"
                  className="pc-bob h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="M7 11l5 5 5-5" />
                  <path d="M5 20h14" />
                </svg>
              )}
            </span>

            <span className="relative">
              {done ? "Downloading..." : "Download Free Prospectus"}
            </span>
          </a>
        </div>

        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-left sm:text-sm">
          {fileInfo}
        </p>
      </div>
    </div>
  );
}