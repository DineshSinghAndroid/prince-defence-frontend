
import AchieversClient from "@/components/achievers/AchieversClient";
import Achieversheader from "@/components/achievers/Achieversheader";

export const metadata = {
    title: "Our Achievers & Selections | Best Defence Academy in Rajasthan | Prince Defence Academy",
    description:
        "Meet 3900+ proud achievers selected in NDA, Indian Army, Navy, and Air Force from Prince Defence Academy Sikar, Rajasthan. Real results and genuine selections.",
    alternates: {
        canonical: "/achievers",
    },
    openGraph: {
        title: "Our Achievers & Selections | Best Defence Academy in Rajasthan",
        description:
            "Explore successful students of Prince Defence Academy Sikar, Rajasthan in NDA, Air Force, Navy and Army selections by year and category.",
        url: "/achievers",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/images/campusbg-2.webp",
                width: 1200,
                height: 630,
                alt: "Prince Defence Academy Achievers and Selection Results",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Achievers & Selections | Prince Defence Academy Sikar Rajasthan",
        description:
            "Celebrate 3900+ selections from Prince Defence Academy, the top defence academy in Rajasthan.",
        images: ["/images/campusbg-2.webp"],
    },
};

export default function AchieversPage() {
    return (
        <>
            <Achieversheader />
            <AchieversClient key="all" />
        </>
    );
}
