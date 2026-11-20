import Gallery from "@/components/gallery/Gallery";

export const metadata = {
    title: "Photo Gallery | Campus & Training | Prince Defence Academy Sikar Rajasthan",
    description:
        "Explore campus, obstacle ground, classroom, physical training, and selection celebration photos of Prince Defence Academy in Sikar, Rajasthan.",
    alternates: {
        canonical: "/gallery",
    },
    openGraph: {
        title: "Photo Gallery | Prince Defence Academy Sikar Rajasthan",
        description:
            "View real campus training, obstacle courses, sports, and celebrations at Prince Defence Academy.",
        url: "/gallery",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/images/campusbg-2.webp",
                width: 1200,
                height: 630,
                alt: "Prince Defence Academy Gallery Sikar Rajasthan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Photo Gallery | Prince Defence Academy Sikar Rajasthan",
        description:
            "Campus and training photos of Prince Defence Academy, Rajasthan's top defence institute.",
        images: ["/images/campusbg-2.webp"],
    },
};

export default function GalleryPage() {
    return (
        <main>
            <Gallery />
        </main>
    );
}