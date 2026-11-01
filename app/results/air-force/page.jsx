import Result from "@/components/result/Result";

export const metadata = {
    title: "Air Force Selection Results | Agniveer Vayu | Prince Defence Academy Sikar Rajasthan",
    description:
        "Explore Indian Air Force (Agniveer Vayu) selection results of Prince Defence Academy, Rajasthan's premier defence coaching institute in Sikar.",
    alternates: {
        canonical: "/results/air-force",
    },
    openGraph: {
        title: "Air Force Selection Results | Prince Defence Academy Sikar",
        description:
            "Agniveer Vayu selections and merit list candidates from Prince Defence Academy Rajasthan.",
        url: "/results/air-force",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
    },
};

export default function AirForceResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="air-force" />
        </main>
    );
}
