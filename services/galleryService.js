import { apiRequest } from "./api";

/**
 * Fetch public gallery categories.
 * Cached with Next.js ISR revalidation (5 minutes) for optimal performance.
 */
export const getGalleryCategories = async ({ includeGallerySummary = false } = {}) => {
    const params = new URLSearchParams();

    if (includeGallerySummary) {
        params.set("includeGallerySummary", "true");
    }

    const query = params.toString();

    return apiRequest(
        `/gallery-categories${query ? `?${query}` : ""}`,
        {
            method: "GET",
            next: { revalidate: 300, tags: ["gallery-categories"] },
        },
        "Failed to fetch gallery categories"
    );
};

/**
 * Fetch public gallery images with pagination and optional category filter.
 * Cached with Next.js ISR revalidation (3 minutes).
 */
export const getGallery = async ({
    page = 1,
    limit = 50,
    category = "",
} = {}) => {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (category) {
        params.append("category", category);
    }

    return apiRequest(
        `/gallery?${params.toString()}`,
        {
            method: "GET",
            next: { revalidate: 180, tags: ["gallery"] },
        },
        "Failed to fetch gallery"
    );
};
