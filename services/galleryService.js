const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

// Get gallery categories
export const getGalleryCategories = async () => {
    const response = await fetch(
        `${API_URL}/gallery-categories`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
            "Failed to fetch gallery categories"
        );
    }

    return data;
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

    const response = await fetch(
        `${API_URL}/gallery?${params.toString()}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
            "Failed to fetch gallery"
        );
    }

    return data;
};