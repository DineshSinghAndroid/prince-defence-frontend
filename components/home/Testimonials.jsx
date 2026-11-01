"use client";

import { useEffect, useRef, useState } from "react";
import initialReviewsData from "@/data/googleReviews.json";

const REVIEWS_API_URL =
  "https://app.coachingsinsikar.com/api/widget/reviews?locationName=accounts%2F113869565307694473678%2Flocations%2F1004355570809401037&minRating=4";

const DEFAULT_REVIEW_LINK =
  "https://search.google.com/local/writereview?placeid=ChIJQedzZv-lbDkRhEVjbl7KceU";

// Official Google 'G' icon in brand colors
function GoogleIcon({ className = "w-6 h-6" }) {
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

// Gold star icon
function StarIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// Reviewer Avatar with initials fallback on error
function ReviewerAvatar({ src, name }) {
  const [imgError, setImgError] = useState(false);
  const initials = (name || "A")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  if (!src || imgError) {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
        {initials}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={name || "Reviewer"}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className="size-9 shrink-0 rounded-full bg-slate-100 object-cover"
    />
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState(initialReviewsData);
  const carouselRef = useRef(null);
  const isPausedRef = useRef(false);

  // Fetch fresh reviews from API
  useEffect(() => {
    let active = true;

    async function fetchReviews() {
      try {
        const response = await fetch(REVIEWS_API_URL, {
          cache: "no-store",
        });

        if (!response.ok) return;

        const json = await response.json();
        if (active && json && Array.isArray(json.reviews) && json.reviews.length > 0) {
          setData(json);
        }
      } catch (err) {
        // Fallback to initialReviewsData silently
      }
    }

    fetchReviews();

    return () => {
      active = false;
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
  const reviews = Array.isArray(data?.reviews) && data.reviews.length > 0
    ? data.reviews
    : initialReviewsData.reviews || [];

  const averageRating = (profile.averageRating || 4.8).toFixed(1);
  const totalReviews = profile.totalReviews || 782;
  const reviewLink = profile.reviewLink || DEFAULT_REVIEW_LINK;

  return (
    <section
      aria-labelledby="google-reviews-title"
      className="bg-white px-4 py-4 sm:px-6 sm:py-6 lg:py-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header Card */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Google Icon Box */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
              <GoogleIcon />
            </div>

            <div>
              <h2
                id="google-reviews-title"
                className="text-[17px] font-extrabold leading-tight text-slate-800"
              >
                Google Reviews
              </h2>
              <p className="mt-0.5 text-[13px] font-medium leading-tight text-slate-500">
                Feedback from our students and Parents
              </p>

              {/* Rating Summary Row */}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-slate-600">
                <span className="text-base font-extrabold text-slate-900">
                  {averageRating}
                </span>

                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <span className="text-slate-500">
                  Based on {totalReviews} reviews
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  ✓ Prince Defence Academy
                </span>
              </div>
            </div>
          </div>

          {/* Write a review button */}
          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white shadow-xs transition hover:bg-[#1557b0]"
          >
            <svg
              className="size-3.5"
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
            Write a review
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
          {/* Reviews Scrollable Container */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((item, index) => (
              <article
                key={`${item.reviewerName}-${index}`}
                className="flex w-full flex-none flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-[calc(50%-8px)] sm:min-w-[280px] lg:w-[calc(33.333%-11px)]"
              >
                <div>
                  {/* Top Bar: User details & Stars */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ReviewerAvatar
                        src={item.profilePhotoUrl}
                        name={item.reviewerName}
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-[13px] font-bold text-slate-900">
                          {item.reviewerName}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {item.timeAgo}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-0.5 text-amber-500">
                      {[...Array(Number(item.starRating) || 5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-700 line-clamp-3 break-words">
                    {item.comment}
                  </p>
                </div>

                {/* Owner Reply if present */}
                {item.ownerReply && (
                  <div className="mt-3 rounded-md border-l-[3px] border-[#1a73e8] bg-slate-50 p-2 text-[11px]">
                    <p className="font-bold text-[#1a73e8]">
                      Response from the owner:
                    </p>
                    <p className="mt-0.5 text-slate-600 italic line-clamp-2">
                      {item.ownerReply}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel(-300)}
              aria-label="Previous reviews"
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              ❮
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(300)}
              aria-label="Next reviews"
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
