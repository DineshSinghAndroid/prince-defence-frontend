"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Trophy,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Search,
    X,
    Calendar,
    SlidersHorizontal,
    RotateCcw,
} from "lucide-react";
import { getPublicAchieverCategories, getPublicAchievers } from "@/services/achieverService";
import AchieverCard, { AchieverCardSkeleton } from "@/components/achievers/AchieverCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

const PAGE_SIZE = 12;

export default function AchieversClient({ initialCategorySlug = "" }) {
    const router = useRouter();
    const fetchSequence = useRef(0);

    // Categories
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        initialCategorySlug || "all"
    );
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    // Search filter state (live input + debounced query)
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Year filter state
    const [selectedYear, setSelectedYear] = useState("all");
    const [allDistinctYears, setAllDistinctYears] = useState([]);

    // Achievers results state
    const [years, setYears] = useState([]);
    const [yearResults, setYearResults] = useState({});
    const [yearPages, setYearPages] = useState({});
    const [yearLoading, setYearLoading] = useState({});
    const [yearErrors, setYearErrors] = useState({});
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Debounce search input (350ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
        }, 350);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Load available categories once on mount
    useEffect(() => {
        let active = true;

        async function loadCategories() {
            setCategoriesLoading(true);

            try {
                const response = await getPublicAchieverCategories();
                const data = response?.data;

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.items)
                        ? data.items
                        : [];

                const activeCategories = list.filter(
                    (category) => category.isActive !== false
                );

                if (!active) return;

                setCategories(activeCategories);
            } catch (err) {
                if (active) {
                    setError(err?.message || "Failed to load categories.");
                }
            } finally {
                if (active) setCategoriesLoading(false);
            }
        }

        loadCategories();

        return () => {
            active = false;
        };
    }, []);

    // Main fetch function: supports category + search + year filter
    const fetchAchievers = useCallback(async () => {
        const requestSequence = ++fetchSequence.current;
        setLoading(true);
        setError("");
        setYears([]);
        setYearResults({});
        setYearPages({});
        setYearLoading({});
        setYearErrors({});
        setTotalResults(0);

        try {
            const categorySlug =
                selectedCategory === "all" ? "" : selectedCategory;

            // 1. Initial overview request to get distinct matching years and total count
            const response = await getPublicAchievers(
                categorySlug,
                {
                    page: 1,
                    limit: 1,
                    search: debouncedSearch,
                    sort: "order",
                }
            );

            if (requestSequence !== fetchSequence.current) return;

            const result = response?.data;
            if (!Array.isArray(result?.years)) {
                throw new Error("Achiever years could not be loaded.");
            }

            const rawYears = result.years.map(String);

            // Accumulate all distinct years seen across data for the year selector
            if (rawYears.length > 0) {
                setAllDistinctYears((prev) => {
                    const combined = Array.from(new Set([...prev, ...rawYears]));
                    return combined.sort((a, b) => Number(b) - Number(a));
                });
            }

            // Determine which years to display based on selectedYear filter
            let availableYears = [];
            if (selectedYear !== "all") {
                if (rawYears.includes(selectedYear)) {
                    availableYears = [selectedYear];
                } else {
                    availableYears = [];
                }
            } else {
                availableYears = rawYears;
            }

            setYears(availableYears);
            setYearPages(
                Object.fromEntries(availableYears.map((year) => [year, 1]))
            );

            // 2. Fetch page 1 for each matching year
            if (availableYears.length === 0) {
                setTotalResults(0);
                setYearResults({});
                return;
            }

            const yearResponses = await Promise.all(
                availableYears.map(async (year) => {
                    const yearResponse = await getPublicAchievers(
                        categorySlug,
                        {
                            page: 1,
                            limit: PAGE_SIZE,
                            year,
                            search: debouncedSearch,
                            sort: "order",
                        }
                    );
                    const yearResult = yearResponse?.data;

                    if (
                        !Array.isArray(yearResult?.items) ||
                        !yearResult?.pagination
                    ) {
                        throw new Error(`Achievers for ${year} could not be loaded.`);
                    }

                    return [
                        year,
                        {
                            items: yearResult.items,
                            pagination: yearResult.pagination,
                        },
                    ];
                })
            );

            if (requestSequence !== fetchSequence.current) return;

            const resultsMap = Object.fromEntries(yearResponses);
            setYearResults(resultsMap);

            // Calculate total matching results
            if (selectedYear !== "all") {
                const yearTotal = resultsMap[selectedYear]?.pagination?.total ?? 0;
                setTotalResults(Number(yearTotal));
            } else {
                setTotalResults(Number(result.pagination?.total ?? 0));
            }
        } catch (err) {
            if (requestSequence !== fetchSequence.current) return;

            setYears([]);
            setYearResults({});
            setError(err?.message || "Failed to load achievers.");
        } finally {
            if (requestSequence === fetchSequence.current) {
                setLoading(false);
            }
        }
    }, [selectedCategory, debouncedSearch, selectedYear]);

    // Pagination for a specific year section
    const fetchYearPage = useCallback(async (year, nextPage) => {
        const yearKey = String(year);
        const requestSequence = fetchSequence.current;
        setYearLoading((current) => ({ ...current, [yearKey]: true }));
        setYearErrors((current) => ({ ...current, [yearKey]: "" }));

        try {
            const response = await getPublicAchievers(
                selectedCategory === "all" ? "" : selectedCategory,
                {
                    page: nextPage,
                    limit: PAGE_SIZE,
                    year: yearKey,
                    search: debouncedSearch,
                    sort: "order",
                }
            );
            const result = response?.data;

            if (requestSequence !== fetchSequence.current) return;

            if (!Array.isArray(result?.items) || !result?.pagination) {
                throw new Error(`Achievers for ${yearKey} could not be loaded.`);
            }

            setYearResults((current) => ({
                ...current,
                [yearKey]: {
                    items: result.items,
                    pagination: result.pagination,
                },
            }));
            setYearPages((current) => ({ ...current, [yearKey]: nextPage }));
        } catch (err) {
            if (requestSequence !== fetchSequence.current) return;

            setYearErrors((current) => ({
                ...current,
                [yearKey]: {
                    message:
                        err?.message ||
                        `Achievers for ${yearKey} could not be loaded.`,
                    page: nextPage,
                },
            }));
        } finally {
            if (requestSequence === fetchSequence.current) {
                setYearLoading((current) => ({ ...current, [yearKey]: false }));
            }
        }
    }, [selectedCategory, debouncedSearch]);

    // Re-fetch with a slight debounce on state changes
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAchievers();
        }, 200);

        return () => {
            clearTimeout(timer);
            fetchSequence.current += 1;
        };
    }, [fetchAchievers]);

    // Category navigation handler
    const changeCategory = (slug) => {
        setSelectedCategory(slug);
        router.push(
            slug === "all"
                ? "/achievers"
                : `/achievers/${encodeURIComponent(slug)}`,
            { scroll: false }
        );
    };

    // Immediate search on Enter key or button click
    const handleImmediateSearch = () => {
        setDebouncedSearch(searchInput.trim());
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchInput("");
        setDebouncedSearch("");
    };

    // Reset all filters
    const handleResetAllFilters = () => {
        setSearchInput("");
        setDebouncedSearch("");
        setSelectedYear("all");
        changeCategory("all");
    };

    const hasActiveFilters =
        debouncedSearch.length > 0 ||
        selectedYear !== "all" ||
        selectedCategory !== "all";

    return (
        <main className="min-h-screen overflow-hidden bg-gradient-to-b from-white via-[#EFF3FF] to-[#EFF3FF] text-[#102a43]">
            <section className="px-4 py-8 sm:px-6 lg:py-12">
                <div className="mx-auto max-w-7xl">
                    {/* Header Heading */}
                    <ScrollReveal className="mx-auto mb-8 max-w-2xl text-center">
                      
                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Our Student <span className="text-[#b89242]">Achievers</span>
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                            Meet the students who turned dedication and discipline into selection.
                        </p>
                    </ScrollReveal>

                    {/* Premium Search & Filter Bar */}
                    <ScrollReveal className="mb-8">
                        <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,35,70,0.06)] backdrop-blur-md sm:p-5">
                            {/* Filter Controls Grid */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
                                {/* Search Input (6 columns on desktop) */}
                                <div className="relative lg:col-span-6">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <Search size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(event) => setSearchInput(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                handleImmediateSearch();
                                            }
                                        }}
                                        placeholder="Search by student name, father name, exam, address..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#102a43] focus:bg-white focus:ring-4 focus:ring-[#102a43]/10"
                                    />
                                    {searchInput && (
                                        <button
                                            type="button"
                                            onClick={handleClearSearch}
                                            aria-label="Clear search"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Category Selector Dropdown (3 columns on desktop) */}
                                <div className="relative lg:col-span-3">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#102a43]">
                                        <SlidersHorizontal size={16} />
                                    </div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(event) => changeCategory(event.target.value)}
                                        aria-label="Select Category"
                                        className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-9 text-sm font-semibold text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#102a43] focus:bg-white focus:ring-4 focus:ring-[#102a43]/10"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((category) => (
                                            <option
                                                key={category._id || category.slug}
                                                value={category.slug}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                                        <ChevronRight size={16} className="rotate-90" />
                                    </div>
                                </div>

                                {/* Year Selector Dropdown (3 columns on desktop) */}
                                <div className="relative lg:col-span-3">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#b89242]">
                                        <Calendar size={16} />
                                    </div>
                                    <select
                                        value={selectedYear}
                                        onChange={(event) => setSelectedYear(event.target.value)}
                                        aria-label="Select Year"
                                        className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-9 text-sm font-semibold text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#102a43] focus:bg-white focus:ring-4 focus:ring-[#102a43]/10"
                                    >
                                        <option value="all">All Years</option>
                                        {allDistinctYears.map((yearOption) => (
                                            <option key={yearOption} value={yearOption}>
                                                Year {yearOption}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                                        <ChevronRight size={16} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Pill Filter + Results Count + Reset */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                                <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    <span className="mr-1 hidden text-xs font-bold uppercase tracking-wider text-slate-400 sm:inline-block">
                                        Categories:
                                    </span>
                                    {[
                                        { _id: "all", name: "All Results", slug: "all" },
                                        ...categories,
                                    ].map((category) => {
                                        const isActive = selectedCategory === category.slug;

                                        return (
                                            <button
                                                key={category._id || category.slug}
                                                type="button"
                                                onClick={() => changeCategory(category.slug)}
                                                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                                                    isActive
                                                        ? "bg-[#102a43] text-white shadow-xs"
                                                        : "border border-slate-200 bg-white text-slate-700 hover:border-[#b89242] hover:text-[#102a43]"
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center gap-3">
                                    {hasActiveFilters && (
                                        <button
                                            type="button"
                                            onClick={handleResetAllFilters}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-bold text-amber-800 transition hover:bg-amber-100"
                                        >
                                            <RotateCcw size={12} />
                                            Reset Filters
                                        </button>
                                    )}

                                    <span className="text-xs font-bold text-slate-500">
                                        {totalResults} achiever{totalResults === 1 ? "" : "s"} found
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Error Notice */}
                    {error && (
                        <ScrollReveal className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={fetchAchievers}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold hover:bg-red-100"
                            >
                                <RefreshCw size={15} />
                                Retry
                            </button>
                        </ScrollReveal>
                    )}

                    {/* Results Container */}
                    {loading ? (
                        <ScrollReveal className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <AchieverCardSkeleton key={index} />
                            ))}
                        </ScrollReveal>
                    ) : years.length === 0 ? (
                        <ScrollReveal className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-[#d5deec] bg-white/70 px-5 py-12 text-center">
                            <div className="grid size-16 place-items-center rounded-2xl bg-[#fbf3dc] text-[#b89242]">
                                <Search size={28} />
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-[#102a43]">No achievers found</h3>
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                {debouncedSearch
                                    ? `No student matching "${debouncedSearch}" was found.`
                                    : "No published achievers are available for the selected filters."}
                            </p>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleResetAllFilters}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#102a43] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#17395c]"
                                >
                                    <RotateCcw size={14} />
                                    Clear Search &amp; Reset Filters
                                </button>
                            )}
                        </ScrollReveal>
                    ) : (
                        <div className="space-y-10">
                            {years.map((year) => {
                                const yearResult = yearResults[year];
                                const students = yearResult?.items || [];
                                const pagination = yearResult?.pagination;
                                const page = Number(yearPages[year] || 1);
                                const totalPages = Math.max(
                                    1,
                                    Number(pagination?.totalPages || 1)
                                );

                                return (
                                    <section
                                        key={year}
                                        aria-labelledby={`achievers-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                    >
                                        <ScrollReveal delay={80}>
                                            <h2
                                                id={`achievers-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                                className="mb-5 flex items-center gap-3 text-xl font-bold text-[#102a43] sm:text-2xl"
                                            >
                                                <span>{year}</span>
                                                <span className="h-px flex-1 bg-gradient-to-r from-[#b89242]/50 to-transparent" />
                                                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">
                                                    {pagination?.total ?? students.length}{" "}
                                                    {(pagination?.total ?? students.length) === 1
                                                        ? "achiever"
                                                        : "achievers"}
                                                </span>
                                            </h2>
                                        </ScrollReveal>

                                        {yearErrors[year] && (
                                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                                <p>{yearErrors[year].message}</p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        fetchYearPage(
                                                            year,
                                                            yearErrors[year].page
                                                        )
                                                    }
                                                    className="font-semibold underline"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                                            {students.map((student, index) => (
                                                <ScrollReveal
                                                    key={student._id}
                                                    animation="up-zoom"
                                                    delay={Math.min(index * 70, 210)}
                                                    duration={600}
                                                    distance={24}
                                                    className="h-full"
                                                >
                                                    <AchieverCard student={student} />
                                                </ScrollReveal>
                                            ))}
                                        </div>

                                        {pagination && (
                                            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#e6ebf3] bg-white p-4 shadow-[0_4px_20px_rgba(16,42,67,0.05)] sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-center text-sm text-slate-500 sm:text-left">
                                                    {year} — Page{" "}
                                                    <strong className="text-[#102a43]">{page}</strong>{" "}
                                                    of{" "}
                                                    <strong className="text-[#102a43]">{totalPages}</strong>
                                                </p>

                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={page <= 1 || yearLoading[year]}
                                                        onClick={() => fetchYearPage(year, page - 1)}
                                                        className="inline-flex items-center gap-1 rounded-xl border border-[#e3e9f2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f8fc] disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        <ChevronLeft size={17} />
                                                        Previous
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={page >= totalPages || yearLoading[year]}
                                                        onClick={() => fetchYearPage(year, page + 1)}
                                                        className="inline-flex items-center gap-1 rounded-xl bg-[#102a43] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#17395c] disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {yearLoading[year] ? "Loading..." : "Next"}
                                                        {!yearLoading[year] && <ChevronRight size={17} />}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
