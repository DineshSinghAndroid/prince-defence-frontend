
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
    Menu,
    X,
    ArrowRight,
    Phone,
} from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Quiz", href: "/quiz" },
    { name: "Facilities", href: "/facilities" },
    { name: "Results", href: "/results" },
    { name: "Achievers", href: "/achievers" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Blogs", href: "/blog" },
    // { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },

];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasLightHero, setHasLightHero] = useState(false);

    const menuRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkLightHero = () => {
            const isLight = Boolean(
                document.getElementById("not-found-page") ||
                document.getElementById("light-hero")
            );
            setHasLightHero(isLight);
        };

        checkLightHero();
        const timer = setTimeout(checkLightHero, 50);

        let observer = null;
        if (typeof document !== "undefined" && document.body) {
            observer = new MutationObserver(checkLightHero);
            observer.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    // Pages that genuinely have a dark hero section (bg-[#071b32] / dark gradient)
    const isCourseDetailPage = Boolean(
        pathname?.startsWith("/courses/") && pathname !== "/courses"
    );
    const isLightSubPage = Boolean(
        pathname?.startsWith("/results/image") ||
        pathname?.startsWith("/quiz/archive")
    );
    const darkHeroPages = [
        "/",
        "/achievers",
        "/results",
        "/quiz",
        "/contact",
        "/privacy-policy",
        "/terms-and-conditions",
    ];
    const isKnownDarkPage =
        !isLightSubPage &&
        (darkHeroPages.some((p) => pathname === p || (p !== "/" && pathname?.startsWith(`${p}/`))) ||
        isCourseDetailPage);

    const isDarkHero = isKnownDarkPage && !hasLightHero;

    // Check current active page
    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const prefetchOnIntent = (href) => {
        if (!isActive(href)) {
            router.prefetch(href);
        }
    };

    // Close menu on outside click and Escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Navbar scroll handling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            ref={menuRef}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "px-4 pt-2 sm:px-6 lg:px-8"
                    : "px-0 pt-0"
            }`}
        >
            {/* TOP NAVBAR / ANNOUNCEMENT */}
            <div
                className={`overflow-hidden whitespace-nowrap text-white text-sm transition-all duration-300 ${
                    isScrolled
                        ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none py-0"
                        : "max-h-10 opacity-100 translate-y-0 py-1"
                }`}
            >
                <div className="animate-sequential-scroll gap-4 text-center font-medium py-1">
                    <span
                        className="font-bold text-(--gold)"
                    >
                        📌 Turn Your Defence Dream into Reality, Join
                        Prince Defence Academy | Limited Seats
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Total Selections : 3965
                    </span>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <nav
                className={`flex items-center justify-between gap-2 transition-all duration-300 ${
                    isScrolled
                        ? "glass mx-auto w-full max-w-full rounded-2xl px-3 py-2.5 sm:px-4 lg:gap-3 xl:px-5"
                        : "w-full max-w-full rounded-none border-none bg-transparent px-4 py-3.5 sm:px-6 lg:px-8 xl:px-12"
                }`}
                aria-label="Main navigation"
            >
                {/* LOGO */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2 xl:gap-3"
                    aria-label="Defence Academy Home"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Image
                            src="/images/PrinceDefenceLogo.webp"
                            alt="Prince Defence Academy Logo"
                            width={40}
                            height={40}
                            className="rounded-xl object-cover"
                        />
                    </div>

                    <div>
                        <p
                            className={`poppins text-sm font-extrabold tracking-normal xl:text-sm xl:tracking-wide 2xl:text-base transition-colors duration-300 ${
                                isScrolled || (!isDarkHero && !isScrolled)
                                    ? "text-(--navy)"
                                    : "text-white"
                            }`}
                        >
                            PRINCE DEFENCE ACADEMY
                        </p>

                        <p
                            className={`text-[7px] font-medium tracking-[0.08em] hidden whitespace-nowrap lg:block xl:text-[8px] xl:tracking-[0.12em] 2xl:text-[9px] 2xl:tracking-[0.16em] text-center transition-colors duration-300 ${
                                isScrolled || (!isDarkHero && !isScrolled)
                                    ? "text-(--muted)"
                                    : "text-(--gold)"
                            }`}
                        >
                            DISCIPLINE • DEDICATION • SUCCESS
                        </p>
                    </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden min-w-0 items-center gap-1 xl:flex 2xl:gap-3">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                prefetch={false}
                                onPointerEnter={() => prefetchOnIntent(link.href)}
                                onFocus={() => prefetchOnIntent(link.href)}
                                aria-current={active ? "page" : undefined}
                                className={`
                                    relative whitespace-nowrap px-2.5 py-1.5
                                    text-xs inter sm:text-sm 2xl:px-3 2xl:text-base
                                    transition-colors duration-200

                                    ${active
                                        ? "font-bold text-(--gold)"
                                        : isScrolled || (!isDarkHero && !isScrolled)
                                        ? "font-medium text-(--foreground) hover:text-(--gold)"
                                        : "font-medium text-white/90 hover:text-(--gold)"
                                    }
                                `}
                            >
                                {link.name}
                                {active && (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute bottom-0 inset-x-2.5 2xl:inset-x-3 h-[2px] rounded-full bg-(--gold)"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* DESKTOP CTA */}
                <Link
                    href="/contact"
                    className="gold-shimmer-cta group relative isolate
                        hidden shrink-0 items-center gap-1.5
                        xl:flex
                        rounded-xl bg-(--gold)
                        px-3 py-2.5 text-xs font-semibold
                        text-white shadow-sm
                        transition duration-300
                        hover:-translate-y-0.5
                        hover:shadow-lg
                        2xl:gap-2 2xl:px-4 2xl:text-sm
                        2xl:text-base
                    "
                >
                    <span
                        aria-hidden="true"
                        className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                    />
                    <span className="relative">Enquire Now</span>
                    <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`
                        flex h-10 w-10 items-center justify-center
                        rounded-xl backdrop-blur-md transition-all xl:hidden
                        ${isScrolled || (!isDarkHero && !isScrolled)
                            ? "border border-(--glass-border) bg-white/50 text-(--navy) hover:bg-white/80"
                            : "border border-white/25 bg-white/10 text-white hover:bg-white/20"
                        }
                    `}
                    aria-label={
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                        <Menu
                            size={22}
                            strokeWidth={2}
                            className={`
                                absolute transition-all duration-200
                                ${isOpen
                                    ? "rotate-90 scale-0 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                }
                            `}
                        />

                        <X
                            size={22}
                            strokeWidth={2}
                            className={`
                                absolute transition-all duration-200
                                ${isOpen
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-0 opacity-0"
                                }
                            `}
                        />
                    </span>
                </button>

                {/* MOBILE MENU */}
                <div
                    id="mobile-navigation"
                    className={`
                        absolute left-0 right-0 top-[calc(100%+10px)]
                        origin-top px-1 transition-all duration-200
                        xl:hidden
                        ${isOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }
                    `}
                >
                    <div className="rounded-2xl bg-[rgba(255,255,255,0.95)] p-3 shadow-xl backdrop-blur-xl">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        prefetch={false}
                                        onPointerEnter={() => prefetchOnIntent(link.href)}
                                        onFocus={() => prefetchOnIntent(link.href)}
                                        onClick={closeMenu}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`
                                            rounded-xl px-4 py-3
                                            text-base font-semibold
                                            border-b border-b-(--gold)/30
                                            transition-all duration-200

                                            ${active
                                                ? "bg-(--gold)/10 text-(--gold) font-bold"
                                                : "text-(--navy) hover:bg-(--gold)/5 hover:text-(--gold)"
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className="my-2 h-px bg-slate-200/70" />

                            {/* MOBILE CTA */}
                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="gold-shimmer-cta group relative isolate
                                    flex items-center justify-center gap-2
                                    rounded-xl bg-(--gold)
                                    px-4 py-3 text-sm font-semibold
                                    text-white shadow-sm transition duration-300
                                    hover:-translate-y-0.5 hover:shadow-lg
                                "
                            >
                                <span
                                    aria-hidden="true"
                                    className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                                />
                                <Phone
                                    size={16}
                                    strokeWidth={2}
                                    className="relative"
                                />
                                <span className="relative">Enquire Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
