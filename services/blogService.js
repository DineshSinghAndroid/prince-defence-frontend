const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BLOG_API_TIMEOUT_MS = 10000;

const fetchBlogApi = (url) =>
    fetch(url, {
        signal: AbortSignal.timeout(BLOG_API_TIMEOUT_MS),
    });


// Get Published Blogs

export const getPublicBlogs = async ({
    page = 1,
    limit = 9,
    search = "",
    category = "",
    excludeCategory = "",
    excludeCategorySlug = "",
} = {}) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) {
        params.append(
            "search",
            search.trim()
        );
    }

    if (category) {
        params.append(
            "category",
            category
        );
    }

    if (excludeCategory) {
        params.append(
            "excludeCategory",
            excludeCategory
        );
    }

    if (excludeCategorySlug) {
        params.append(
            "excludeCategorySlug",
            excludeCategorySlug
        );
    }

    const response = await fetchBlogApi(
        `${API_URL}/blogs?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
                "Failed to fetch blogs"
        );
    }

    return data;
};


// Get Single Published Blog

export const getPublicBlogBySlug = async (
    slug
) => {
    if (!slug) {
        throw new Error(
            "Blog slug is required"
        );
    }

    const response = await fetchBlogApi(
        `${API_URL}/blogs/slug/${encodeURIComponent(
            slug
        )}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
                "Failed to fetch blog"
        );
    }

    return data;
};


// Get Related Blogs

export const getRelatedBlogs = async (
    categoryId,
    blogId,
    limit = 5
) => {
    if (!categoryId || !blogId) {
        throw new Error(
            "Category ID and Blog ID are required"
        );
    }

    const response = await fetchBlogApi(
        `${API_URL}/blogs/related/${categoryId}/${blogId}?limit=${limit}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
                "Failed to fetch related blogs"
        );
    }

    return data;
};


// Get Active Blog Categories

export const getPublicBlogCategories =
    async ({
        page = 1,
        limit = 10,
        search = "",
    } = {}) => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search.trim()) {
            params.set("search", search.trim());
        }

        const response = await fetchBlogApi(
            `${API_URL}/blog-categories?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.message ||
                    "Failed to fetch blog categories"
            );
        }

        return data;
    };