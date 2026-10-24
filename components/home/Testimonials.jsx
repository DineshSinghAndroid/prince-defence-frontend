"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../animations/ScrollReveal";





const SCRIPT_URL =
  "https://app.coachingsinsikar.com/embed/reviews.js";

const GOOGLE_URL = "https://share.google/ci1XBgkfweJLeCgqq";


function ReviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-gray-200 bg-white p-5 min-h-[340px]"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 animate-pulse rounded bg-gray-100" />
            <div className="h-3 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-3 space-y-2">
            <div className="h-2.5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-2.5 w-full animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GoogleReviews({
  title = "Google Reviews",
  googleUrl = GOOGLE_URL,
}) {
  const widgetRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

   useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    let active = true;
    let timeout;
    let mutationObserver;
    let intersectionObserver;
    let scriptElement = null;

    // Yeh function tab chalega jab user scroll karke paas aayega
    const loadScriptAndObserver = () => {
      const checkWidget = () => {
        if (!active) return;

        const hasContent =
          widget.childElementCount > 0 ||
          widget.textContent.trim().length > 0;

        if (hasContent) {
          setLoaded(true);
          setFailed(false);
          clearTimeout(timeout);
          mutationObserver?.disconnect();
        }
      };

      mutationObserver = new MutationObserver(checkWidget);
      mutationObserver.observe(widget, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      const handleScriptError = () => {
        if (active) setFailed(true);
      };

      const existingScript = document.querySelector(
        `script[src="${SCRIPT_URL}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }

      scriptElement = document.createElement("script");
      scriptElement.src = SCRIPT_URL;
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.addEventListener("error", handleScriptError);
      document.body.appendChild(scriptElement);

      timeout = setTimeout(() => {
        if (active) {
          const hasContent =
            widget.childElementCount > 0 ||
            widget.textContent.trim().length > 0;
          if (!hasContent) setFailed(true);
        }
      }, 12000);

      checkWidget();
    };

    // 🚀 LAZY LOAD: Jab user widget ke 200px paas pahuchega, tabhi script download hogi
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          intersectionObserver.disconnect();
          loadScriptAndObserver();
        }
      },
      { rootMargin: "200px 0px" } // 200px pehle hi trigger hoga taaki user ko wait na karna pade
    );

    intersectionObserver.observe(widget);

    return () => {
      active = false;
      clearTimeout(timeout);
      mutationObserver?.disconnect();
      intersectionObserver?.disconnect();
      scriptElement?.removeEventListener("error", handleScriptError);
    };
  }, []);


  return (
    <section
      aria-labelledby="google-reviews-title"
      className="bg-white px-4 py-4 sm:px-6 sm:py-6 lg:py-8"
    >
      <div className="mx-auto max-w-6xl">


        <div className="relative w-full min-w-0">
          {!loaded && !failed && (
            <div
              className="absolute inset-0 z-10 overflow-hidden bg-white"
              aria-hidden="true"
            >
              <ReviewSkeleton />
            </div>
          )}

          {failed && !loaded && (
            <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Reviews are temporarily unavailable.
              </p>

              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  Read reviews on Google
                </a>
              )}
            </div>
          )}

          <div className="min-h-[475px] w-full min-w-0 md:min-h-[380px]">
            <div
              id="google-reviews-widget"
              ref={widgetRef}
              location="accounts/113869565307694473678/locations/1004355570809401037"
              data-theme="light"
              data-layout="carousel"
              data-height="475px"
              data-min-rating="4"
              data-title="Google Reviews"
              data-subtitle="Feedback from our students and Parents"
              data-hide-header="false"
              className="min-h-[475px] w-full min-w-0 md:min-h-[380px] [&>iframe]:!h-[475px] md:[&>iframe]:!h-[380px] [&>iframe]:!max-h-none"
            />
          </div>
        </div>
      </div>
       
    </section>
  );
}
