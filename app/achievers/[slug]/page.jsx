import AchieversClient from "@/components/achievers/AchieversClient";
import Achieversheader from "@/components/achievers/Achieversheader";

export function generateStaticParams() {
    return [
        { slug: "nda" },
        { slug: "air-force" },
        { slug: "navy" },
        { slug: "army" },
        { slug: "all" },
    ];
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Defence';

    const title = `${categoryName} Achievers & Selections | Prince Defence Academy Rajasthan`;
    const description = `Explore successful ${categoryName} selections from Prince Defence Academy Sikar, Rajasthan. Discover our student achievers, batches, and proven selection record.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/achievers/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/achievers/${slug}`,
            siteName: "Prince Defence Academy",
            locale: "en_IN",
            type: "website",
            images: [
                {
                    url: "/images/campusbg-2.webp",
                    width: 1200,
                    height: 630,
                    alt: `${categoryName} Achievers at Prince Defence Academy Sikar Rajasthan`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/campusbg-2.webp"],
        },
    };
}

export default async function AchieversCategoryPage({ params }) {
    const { slug } = await params;

    return (
        <>
            <Achieversheader />
            <AchieversClient
                key={slug}
                initialCategorySlug={slug}
            />
        </>
    );
}
