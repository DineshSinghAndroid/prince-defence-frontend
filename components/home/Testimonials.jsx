"use client"; // Keep for Next.js, remove for plain React (Vite/CRA)

import { useEffect, useRef, useState } from "react";

const WIDGET_ID = "b4e8d71f-8296-4624-b18f-5e4dc77b6f27";
const GOOGLE_URL = "https://share.google/ci1XBgkfweJLeCgqq";

function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-gray-200 bg-white p-5 motion-reduce:animate-none ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/2 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-4 h-3 w-24 rounded bg-amber-200/70" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function GoogleReviews({
  widgetId = WIDGET_ID,
  title = "Customer Reviews",
  googleUrl = GOOGLE_URL,
}) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const src = "https://elfsightcdn.com/platform.js";

    // Avoid adding the script twice
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    }

    // Show fallback if the widget fails to load.
    const timeout = setTimeout(() => setFailed(true), 12000);

    // Hide the loading skeleton as soon as the widget appears
    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe, [class*='eapps']")) {
        setLoaded(true);
        clearTimeout(timeout);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [widgetId]);

  return (
    <section
      className="bg-white px-5 py-16 sm:py-20"
      aria-labelledby="gr-title"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <GoogleG className="h-6 w-6" />
            </span>
            <div>
              <h2
                id="gr-title"
                className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              >
                {title}
              </h2>
            </div>
          </div>

          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View all reviews on Google
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M11 3a1 1 0 100 2h2.6l-6.3 6.3a1 1 0 101.4 1.4L15 6.4V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          )}
        </header>

        {/* Body */}
        <div className="min-h-[200px]">
          {/* Loading skeleton */}
          {!loaded && !failed && (
            <div
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              aria-hidden="true"
            >
              <SkeletonCard />
              <SkeletonCard className="hidden md:block" />
              <SkeletonCard className="hidden lg:block" />
            </div>
          )}

          {/* Error state */}
          {failed && !loaded && (
            <div className="mb-6 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-gray-300 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Reviews couldn&apos;t be loaded right now. Please try again in a moment
                {googleUrl ? ", or read them directly on Google." : "."}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reload
              </button>
            </div>
          )}

          {/* Elfsight widget */}
          <div ref={containerRef} className="w-full">
            <div
              className={`elfsight-app-${widgetId}`}
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}