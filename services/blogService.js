// import { apiRequest } from "./api";

// const BLOG_API_TIMEOUT_MS = 25000;

// const requestBlogApi = (endpoint, fallbackMessage, options = {}) => {
//     const isClient = typeof window !== "undefined";
//     const fetchOptions = {
//         ...(isClient
//             ? { signal: AbortSignal.timeout(BLOG_API_TIMEOUT_MS) }
//             : { next: { revalidate: 300 } }),
//         ...options,
//     };

//     return apiRequest(
//         endpoint,
//         fetchOptions,
//         fallbackMessage
//     );
// };


// // Get Published Blogs

// export const getPublicBlogs = async (
//     {
//         page = 1,
//         limit = 9,
//         search = "",
//         category = "",
//         categorySlug = "",
//         excludeCategory = "",
//         excludeCategorySlug = "",
//     } = {},
//     options = {}
// ) => {
//     const params = new URLSearchParams();

//     params.append("page", String(page));
//     params.append("limit", String(limit));

//     if (search.trim()) {
//         params.append(
//             "search",
//             search.trim()
//         );
//     }

//     if (category) {
//         params.append(
//             "category",
//             category
//         );
//     }

//     if (categorySlug) {
//         params.append(
//             "categorySlug",
//             categorySlug
//         );
//     }

//     if (excludeCategory) {
//         params.append(
//             "excludeCategory",
//             excludeCategory
//         );
//     }

//     if (excludeCategorySlug) {
//         params.append(
//             "excludeCategorySlug",
//             excludeCategorySlug
//         );
//     }

//     return requestBlogApi(
//         `/blogs?${params.toString()}`,
//         "Failed to fetch blogs",
//         options
//     );
// };


// // Get Single Published Blog

// export const getPublicBlogBySlug = async (
//     slug,
//     options = {}
// ) => {
//     if (!slug) {
//         throw new Error(
//             "Blog slug is required"
//         );
//     }

//     return requestBlogApi(
//         `/blogs/slug/${encodeURIComponent(slug)}`,
//         "Failed to fetch blog",
//         options
//     );
// };


// // Get Related Blogs

// export const getRelatedBlogs = async (
//     categoryId,
//     blogId,
//     limit = 5,
//     options = {}
// ) => {
//     if (!categoryId || !blogId) {
//         throw new Error(
//             "Category ID and Blog ID are required"
//         );
//     }

//     return requestBlogApi(
//         `/blogs/related/${categoryId}/${blogId}?limit=${limit}`,
//         "Failed to fetch related blogs",
//         options
//     );
// };


// // Get Active Blog Categories

// export const getPublicBlogCategories =
//     async ({
//         page = 1,
//         limit = 10,
//         search = "",
//     } = {}, options = {}) => {
//         const params = new URLSearchParams({
//             page: String(page),
//             limit: String(limit),
//         });

//         if (search.trim()) {
//             params.set("search", search.trim());
//         }

//         return requestBlogApi(
//             `/blog-categories?${params.toString()}`,
//             "Failed to fetch blog categories",
//             options
//         );
//     };