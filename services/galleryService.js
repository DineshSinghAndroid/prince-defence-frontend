import { apiRequest } from "./api";

// Get gallery categories
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
            cache: "no-store",
        },
        "Failed to fetch gallery categories"
    );
};

// Get gallery images
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
            cache: "no-store",
        },
        "Failed to fetch gallery"
    );
};
