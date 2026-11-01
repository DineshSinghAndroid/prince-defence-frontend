"use client";

import { useEffect, useRef, useState } from "react";
import initialReviewsData from "@/data/googleReviews.json";

// Added limit=100 so all available reviews are fetched from the API
const REVIEWS_API_URL =
  "https://app.coachingsinsikar.com/api/widget/reviews?locationName=accounts%2F113869565307694473678%2Flocations%2F1004355570809401037&minRating=4&limit=100";

const DEFAULT_REVIEW_LINK =
  "https://search.google.com/local/writereview?placeid=ChIJQedzZv-lbDkRhEVjbl7KceU";

// Official Google 'G' icon
function GoogleIcon({ className = "size-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Google Yellow star icon
function StarIcon({ className = "size-3.5" }) {
  return (
    <svg
      className={`${className} fill-[#facc15] text-[#facc15]`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// Reviewer Avatar with Google badge and initials fallback
function ReviewerAvatar({ src, name }) {
  const [imgError, setImgError] = useState(false);
  const initials = (name || "A")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative shrink-0">
      {!src || imgError ? (
        <div className="flex size-9.5 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-extrabold text-slate-700 shadow-xs ring-2 ring-white">
          {initials}
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name || "Reviewer"}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="size-9.5 rounded-full bg-slate-100 object-cover shadow-xs ring-2 ring-white"
        />
      )}
      {/* Mini Google verification icon badge */}
      <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full border border-slate-200 bg-white p-0.5 shadow-xs">
        <svg className="size-2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </span>
    </div>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState(initialReviewsData);
  const carouselRef = useRef(null);
  const isPausedRef = useRef(false);

  // Dynamic auto-update: Live fetch + background polling + tab focus refresh
  useEffect(() => {
    let active = true;

    async function fetchReviews() {
      try {
        const url = `${REVIEWS_API_URL}&_t=${Date.now()}`;
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) return;

        const json = await response.json();
        if (
          active &&
          json &&
          Array.isArray(json.reviews) &&
          json.reviews.length > 0
        ) {
          setData(json);
        }
      } catch (err) {
        // Retain current data if network is temporarily disconnected
      }
    }

    // 1. Initial live fetch immediately on mount
    fetchReviews();

    // 2. Auto-polling: Refresh in background every 60 seconds
    const pollTimer = setInterval(fetchReviews, 60000);

    // 3. Tab visibility listener: Re-fetch whenever user switches back to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchReviews();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      clearInterval(pollTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Carousel auto-scroll every 5 seconds (paused on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      const el = carouselRef.current;
      if (!el) return;

      const cardWidth = el.firstElementChild?.clientWidth || 300;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (offset) => {
    const el = carouselRef.current;
    if (el) {
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const profile = data?.profile || initialReviewsData.profile || {};
  const reviews =
    Array.isArray(data?.reviews) && data.reviews.length > 0
      ? data.reviews
      : initialReviewsData.reviews || [];

  const averageRating = (profile.averageRating || 4.8).toFixed(1);
  const reviewLink = profile.reviewLink || DEFAULT_REVIEW_LINK;

  return (
    <section
      aria-labelledby="google-reviews-title"
      className="bg-white px-4 py-3 sm:px-6 sm:py-4 lg:py-5"
    >
      <div className="mx-auto max-w-6xl">
        {/* Compact Header Summary Card */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-white via-slate-50/40 to-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Compact Google Icon Badge */}
            <div className="flex size-9.5 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
              <GoogleIcon className="size-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="google-reviews-title"
                  className="text-base font-extrabold tracking-tight text-slate-900 sm:text-[17px] leading-tight"
                >
                  Google Reviews
                </h2>
                <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.2 text-[10px] font-bold text-emerald-700 sm:inline-flex">
                  <svg
                    className="size-2.5 fill-current text-emerald-600"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              </div>

              {/* Rating Summary Row (Based on 782 reviews removed) */}
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="text-sm font-extrabold text-slate-900">
                  {averageRating}
                </span>

                <div className="flex items-center gap-0.5 text-[#facc15]">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="size-3.5" />
                  ))}
                </div>

                <span className="text-[11px] text-slate-400">
                  Feedback from students &amp; parents
                </span>
              </div>
            </div>
          </div>

          {/* Compact Write a review button */}
          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a73e8] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition duration-200 hover:bg-[#1557b0] hover:shadow-xs"
          >
            <svg
              className="size-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Write a Review
          </a>
        </div>

        {/* Carousel Wrapper */}
        <div
          className="relative"
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
          onTouchStart={() => {
            isPausedRef.current = true;
          }}
          onTouchEnd={() => {
            isPausedRef.current = false;
          }}
        >
          {/* Reviews Scrollable Container (Shows all reviews from API) */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((item, index) => (
              <article
                key={`${item.reviewerName}-${index}`}
                className="group relative flex w-full flex-none flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white via-white to-slate-50/50 p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-[0_12px_28px_rgba(20,50,100,0.08)] sm:w-[calc(50%-8px)] sm:min-w-[280px] sm:p-4.5 lg:w-[calc(33.333%-11px)]"
              >
                {/* Decorative subtle background quote mark */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-2 select-none text-5xl font-serif text-slate-100 transition-colors group-hover:text-yellow-100/70"
                >
                  “
                </div>

                <div className="relative z-10">
                  {/* Top Bar: User details */}
                  <div className="flex items-center gap-3">
                    <ReviewerAvatar
                      src={item.profilePhotoUrl}
                      name={item.reviewerName}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-[13px] font-bold text-slate-900 group-hover:text-[#0b1c33]">
                          {item.reviewerName}
                        </h3>
                        {/* Verified badge */}
                        <svg
                          className="size-3.5 shrink-0 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-label="Verified Reviewer"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      <p className="text-[11px] font-medium text-slate-400">
                        {item.timeAgo}
                      </p>
                    </div>
                  </div>

                  {/* Stars Row with Yellow Stars */}
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-[#facc15]">
                      {[...Array(Number(item.starRating) || 5)].map((_, i) => (
                        <StarIcon key={i} className="size-3.5" />
                      ))}
                    </div>
                    <span className="rounded-md border border-yellow-200/80 bg-yellow-50 px-1.5 py-0.2 text-[10px] font-extrabold text-yellow-800">
                      5.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600 line-clamp-4 break-words">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                {/* Owner Reply if present */}
                {item.ownerReply && (
                  <div className="relative z-10 mt-3 rounded-xl border border-blue-100 bg-blue-50/70 p-2.5 text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold text-[#1a73e8]">
                      <svg
                        className="size-3 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      Response from Prince Defence Academy:
                    </div>
                    <p className="mt-1 text-slate-600 italic line-clamp-2">
                      {item.ownerReply}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel(-320)}
              aria-label="Previous reviews"
              className="flex size-8.5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              ❮
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(320)}
              aria-label="Next reviews"
              className="flex size-8.5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
