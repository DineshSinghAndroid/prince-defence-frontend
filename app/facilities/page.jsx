import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import facilities from "@/data/facilities.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FacilitiesContact from "@/components/facilities/FacilitiesContact";

export const metadata = {
    title: "Campus & Hostel Facilities | Best Defence Academy in Sikar Rajasthan | Prince Defence Academy",
    description:
        "World-class campus facilities at Prince Defence Academy Sikar, Rajasthan: hostel, hygienic mess, obstacle training ground, gymnasium, library, and 24x7 security.",
    alternates: {
        canonical: "/facilities",
    },
    openGraph: {
        title: "Campus & Hostel Facilities | Best Defence Academy in Rajasthan",
        description:
            "Discover the premier campus infrastructure and residential facilities supporting defence aspirants in Sikar, Rajasthan.",
        url: "/facilities",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/images/campusbg-2.webp",
                width: 1200,
                height: 630,
                alt: "Prince Defence Academy Campus and Facilities Sikar Rajasthan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Campus Facilities | Prince Defence Academy Sikar Rajasthan",
        description:
            "Explore residential hostel, mess, gym, sports grounds, and academic facilities at Prince Defence Academy.",
        images: ["/images/campusbg-2.webp"],
    },
};

const Page = () => {
    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#F0F3F8]
            "
            aria-label="Prince Defence Academy facilities"
        >

            <div className="relative z-10 pb-10 lg:pb-20">
                <div className="max-w-7xl mx-auto pt-40 lg:pt-40 px-6 lg:px-10">

                    {/* Heading */}
                    <header className="text-center mb-10 lg:mb-14">

                        <p className="
                            mb-3
                            text-xs
                            lg:text-sm
                            tracking-[0.3em]
                            uppercase
                            font-medium
                            text-(--navy)
                        ">
                            Train • Prepare • Achieve
                        </p>

                        <h1 className="
                            inter
                            text-4xl
                            lg:text-5xl
                            font-bold
                            text-(--navy)
                        ">
                            Our{" "}
                            <span className="text-(--gold)">
                                Facilities
                            </span>
                        </h1>

                        <p className="
                            mt-4
                            max-w-2xl
                            mx-auto
                            text-sm
                            lg:text-base
                            text-(--muted)
                            inter
                        ">
                            World-class infrastructure, modern amenities and
                            a disciplined environment to shape your future.
                        </p>

                    </header>

                    {/* Facilities */}
                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    ">

                        {facilities.facilities.map((item, index) => (

                            <ScrollReveal
                                key={item.id}
                                animation={index % 2 === 0 ? "up" : "zoom"}
                                delay={Math.min(index * 50, 250)}
                                duration={500}
                            >
                                <Link
                                    href={`/facilities/${item.slug}`}
                                    className="
                                    block
                                    h-full
                                    group
                                    facilities-box
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    transition-transform
                                    duration-300
                                    hover:-translate-y-1
                                "
                                >

                                    <div className="flex flex-col h-full">

                                        <div className="
                                        relative
                                        aspect-[4/3]
                                        w-full
                                        overflow-hidden
                                        rounded-2xl
                                        bg-slate-100
                                    ">

                                            {item.images?.[0] && (
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    fill
                                                    priority={index === 0}

                                                    sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 28px), 33vw"
                                                    quality={85}
                                                    className="
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                "
                                                />
                                            )}


                                            <div className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-[#061A3A]/75
                                            via-[#061A3A]/15
                                            to-transparent
                                        " />


                                            <div className="
                                            absolute
                                            inset-x-0
                                            bottom-0
                                            z-10
                                            px-5
                                            pb-5
                                            pt-16
                                        ">

                                                <span className="
                                                inline-block
                                                mb-2
                                                rounded-full
                                                border
                                                border-white/20
                                                bg-white/20
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                text-white
                                            ">
                                                    {item.title}
                                                </span>

                                                <h2 className="
                                                text-lg
                                                lg:text-xl
                                                font-bold
                                                leading-tight
                                                montserrat
                                                text-white
                                            ">
                                                    {item.shortDescription}
                                                </h2>

                                            </div>
                                        </div>


                                        <div className="
                                        flex
                                        flex-1
                                        flex-col
                                        px-5
                                        py-5
                                    ">

                                            <p className="
                                            text-xs
                                            lg:text-sm
                                            leading-6
                                            inter
                                            text-(--muted)
                                            line-clamp-3
                                        ">
                                                {item.longDescription}
                                            </p>

                                            <span
                                                className="
                                                mt-auto
                                                pt-5
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-xs
                                                font-semibold
                                                text-(--gold)
                                                transition-[gap]
                                                duration-300
                                                group-hover:gap-3
                                            "
                                            >
                                                Learn More
                                                <ArrowUpRight size={16} />
                                            </span>

                                        </div>

                                    </div>

                                </Link>
                            </ScrollReveal>

                        ))}

                    </div>

                </div>

                <FacilitiesContact />

            </div>

        </section>
    );
};

export default Page;