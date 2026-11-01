import { apiRequest } from "./api";

// Helper for cached or non-cached GET requests
const request = (endpoint, fetchOptions = {}) =>
    apiRequest(
        endpoint,
        {
            method: "GET",
            ...fetchOptions,
        },
        "Failed to fetch achievers"
    );

/**
 * Fetch public achiever categories.
 * Cached with Next.js ISR revalidation (5 minutes) as categories rarely change.
 */
export const getPublicAchieverCategories = async () =>
    request("/achiever-categories", {
        next: { revalidate: 300, tags: ["achiever-categories"] },
    });

/**
 * Fetch public achiever student cards with pagination and optional category filter.
 * Cached with Next.js ISR revalidation (3 minutes) for fast, smooth browsing.
 */
export const getPublicAchievers = async (
    categorySlug,
    {
        page = 1,
        limit = 12,
        year,
        sort = "newest",
    } = {}
) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort,
    });

    if (year !== undefined && year !== null) {
        params.set("year", String(year));
    }

    const endpoint = categorySlug
        ? `/achievers/category/${encodeURIComponent(categorySlug)}`
        : "/achievers";

    return request(`${endpoint}?${params.toString()}`, {
        next: { revalidate: 180, tags: ["achievers"] },
    });
};
