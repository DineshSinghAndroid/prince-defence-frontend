"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import BlogHero from "@/components/blogs/BlogHero";
import BlogFilters from "@/components/blogs/BlogFilters";
import BlogGrid from "@/components/blogs/BlogGrid";
import BlogPagination from "@/components/blogs/BlogPagination";
import RecentBlogs from "@/components/blogs/RecentBlogs";
import ScrollReveal from "@/components/animations/ScrollReveal";

import { getPublicBlogs, getPublicBlogCategories } from "@/services/blogService";

const isNewsCategory = (category) =>
    category?.name?.trim().toLowerCase() === "news" ||
    category?.slug?.trim().toLowerCase() === "news";

const isNewsBlog = (blog) =>
    isNewsCategory(blog?.category);

const BlogPage = ({
    initialBlogs = [],
    initialCategories = [],
    initialPagination,
}) => {
    const validInitialBlogs = initialBlogs.filter((blog) => !isNewsBlog(blog));
    const [blogs, setBlogs] = useState(validInitialBlogs);
    const [categories, setCategories] = useState(
        initialCategories.filter((item) => !isNewsCategory(item))
    );
    const skipInitialFetch = useRef(validInitialBlogs.length > 0);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [pagination, setPagination] = useState(
        initialPagination || {
            page: 1,
            limit: 9,
            totalBlogs: validInitialBlogs.length,
            totalPages: validInitialBlogs.length > 0 ? 1 : 0,
        }
    );

    const [loading, setLoading] = useState(validInitialBlogs.length === 0);

    const [error, setError] = useState("");

    // Fetch categories on client if not provided by SSR
    useEffect(() => {
        if (categories.length > 0) return;

        let active = true;
        const fetchCategories = async () => {
            try {
                const response = await getPublicBlogCategories({ limit: 50 });
                if (!active) return;
                const filtered = (response?.data || []).filter(
                    (item) => !isNewsCategory(item)
                );
                setCategories(filtered);
            } catch (err) {
                console.error("Failed to fetch blog categories on client:", err);
            }
        };

        fetchCategories();
        return () => {
            active = false;
        };
    }, [categories.length]);

    useEffect(() => {
        if (skipInitialFetch.current) {
            skipInitialFetch.current = false;
            return;
        }

        let active = true;

        const fetchBlogs =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await getPublicBlogs({
                            page,
                            limit: 9,
                            search,
                            category,
                            excludeCategorySlug: "news",
                        });

                    if (!active) return;

                    const fetchedBlogs = (response?.data || []).filter(
                        (blog) => !isNewsBlog(blog)
                    );

                    setBlogs(fetchedBlogs);

                    setPagination(
                        response?.pagination || {
                            page,
                            limit: 9,
                            totalBlogs: fetchedBlogs.length,
                            totalPages: fetchedBlogs.length > 0 ? 1 : 0,
                        }
                    );
                    toast.dismiss("blog-list-load-error");
                } catch (error) {
                    if (!active) return;

                    console.error(
                        "Failed to fetch blogs:",
                        error
                    );
                    toast.error(
                        error?.message || "Unable to load articles. Please try again.",
                        { id: "blog-list-load-error" }
                    );

                    setBlogs([]);

                    setError(
                        error?.message ||
                        "Failed to load blogs"
                    );
                } finally {
                    if (active) {
                        setLoading(false);
                    }
                }
            };

        fetchBlogs();

        return () => {
            active = false;
        };
    }, [page, search, category]);


    // Search

    const handleSearchChange = (
        value
    ) => {
        setSearch(value);
        setPage(1);
    };


    // Category

    const handleCategoryChange = (
        value
    ) => {
        setCategory(value);
        setPage(1);
    };


    // Pagination

    const handlePageChange = (
        newPage
    ) => {
        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <main className="w-full">

            {/* Hero */}

            <ScrollReveal animation="up" duration={700} distance={28}>
                <BlogHero />
            </ScrollReveal>


            {/* Blog Section */}

            <section className="w-full bg-white">

                <div className="w-full px-6 py-14 sm:px-10 lg:px-12 lg:py-20">

                    {/* Section Heading */}

                    <ScrollReveal
                        className="mb-8 max-w-3xl"
                        animation="up"
                        duration={650}
                        distance={24}
                    >

                        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
                            Latest Articles
                        </span>

                        <h2 className="mt-2 text-2xl font-bold text-[var(--navy)] sm:text-3xl lg:text-4xl">
                            Defence Knowledge &
                            Preparation
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[var(--muted)] sm:text-base">
                            Explore useful articles,
                            preparation guidance and
                            defence-related insights
                            from Prince Defence Academy.
                        </p>

                    </ScrollReveal>


                    {/* Main Layout */}

                    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">

                        {/* Main Content */}

                        <div className="min-w-0">

                            {/* Filters */}

                            <ScrollReveal
                                animation="up"
                                duration={600}
                                distance={20}
                            >
                                <BlogFilters
                                    search={search}
                                    category={category}
                                    categories={
                                        categories
                                    }
                                    onSearchChange={
                                        handleSearchChange
                                    }
                                    onCategoryChange={
                                        handleCategoryChange
                                    }
                                />
                            </ScrollReveal>


                            {/* Error */}

                            {error && (
                                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}


                            {/* Loading */}

                            {loading ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                    {Array.from(
                                        {
                                            length: 6,
                                        }
                                    ).map(
                                        (
                                            _,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="overflow-hidden rounded-2xl border border-[#D9E2F2] bg-white"
                                            >
                                                <div className="aspect-[16/9] animate-pulse bg-[#EEF3FF]" />

                                                <div className="space-y-3 p-6">

                                                    <div className="h-5 w-24 animate-pulse rounded bg-[#EEF3FF]" />

                                                    <div className="h-6 w-full animate-pulse rounded bg-[#EEF3FF]" />

                                                    <div className="h-4 w-4/5 animate-pulse rounded bg-[#EEF3FF]" />

                                                    <div className="h-4 w-2/5 animate-pulse rounded bg-[#EEF3FF]" />

                                                </div>
                                            </div>
                                        )
                                    )}

                                </div>
                            ) : (
                                <BlogGrid
                                    blogs={blogs}
                                />
                            )}

                        </div>


                        {/* Recent Blogs */}

                        {!loading && (
                            <ScrollReveal
                                className="w-full self-start lg:sticky lg:top-24"
                                animation="up"
                                duration={650}
                                distance={24}
                            >
                                <RecentBlogs blogs={blogs} />
                            </ScrollReveal>
                        )}

                    </div>


                    {/* Pagination */}

                    {!loading &&
                        pagination.totalPages >
                            1 && (
                            <ScrollReveal
                                animation="up"
                                duration={600}
                                distance={20}
                            >
                                <BlogPagination
                                    page={
                                        pagination.page
                                    }
                                    totalPages={
                                        pagination.totalPages
                                    }
                                    onPageChange={
                                        handlePageChange
                                    }
                                />
                            </ScrollReveal>
                        )}

                </div>

            </section>

        </main>
    );
};

export default BlogPage;