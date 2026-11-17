import Result from "@/components/result/Result";

export const metadata = {
    title: "NDA Selection Results | Best NDA Coaching in Rajasthan | Prince Defence Academy Sikar",
    description:
        "Official NDA selection records of Prince Defence Academy Sikar, Rajasthan. Browse year-wise NDA selections, roll numbers, and merit list achievers.",
    alternates: {
        canonical: "/results/nda",
    },
    openGraph: {
        title: "NDA Selection Results | Prince Defence Academy Sikar Rajasthan",
        description:
            "Record-breaking NDA selections from Prince Defence Academy, the top NDA coaching institute in Rajasthan.",
        url: "/results/nda",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/images/Prince Defence Results.webp",
                width: 1200,
                height: 630,
                alt: "NDA Selection Results - Prince Defence Academy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NDA Results | Prince Defence Academy Sikar Rajasthan",
        description:
            "Year-wise NDA selections and rank holders from Prince Defence Academy Sikar.",
        images: ["/images/Prince Defence Results.webp"],
    },
};

export default function NDASResultsPage() {
    return (
        <main className="min-h-screen bg-[#F0F3F8]">
            <Result category="nda" />
        </main>
    );
}
