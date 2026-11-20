export default function BlogPage() {
    return null;
}



// import NewsListing from "@/components/blogs/NewsListing";
// import {
//     getPublicBlogs,
//     getPublicBlogCategories,
// } from "@/services/blogService";

// export const revalidate = 300;

// export const metadata = {
//     title: "Defence News | Prince Defence Academy",
//     description:
//         "Latest defence news and updates for NDA, CDS and AFCAT aspirants.",
// };

// export default async function NewsPage() {
//     let initialBlogs = [];
//     let initialPagination = null;

//     try {
//         const blogsResponse = await getPublicBlogs({
//             page: 1,
//             limit: 9,
//             categorySlug: "news",
//         });

//         initialBlogs = blogsResponse?.data || [];
//         initialPagination = blogsResponse?.pagination || null;
//     } catch (error) {
//         console.error("Failed to server-render news listing:", error);
//     }

//     return (
//         <NewsListing
//             categorySlug="news"
//             initialBlogs={initialBlogs}
//             initialPagination={initialPagination}
//         />
//     );
// }
