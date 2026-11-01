import Result from "@/components/result/Result";

export const metadata = {
    title: "Indian Army Selection Results | Best Defence Academy in Rajasthan | Prince Defence Academy",
    description:
        "Year-wise Indian Army Agniveer, GD, Clerk, and Technical selection records of Prince Defence Academy Sikar, Rajasthan.",
    alternates: {
        canonical: "/results/army",
    },
    openGraph: {
        title: "Indian Army Selection Results | Prince Defence Academy Sikar",
        description:
            "Year-wise Indian Army recruitment results and selected candidates from Prince Defence Academy.",
        url: "/results/army",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
    },
};

export default function ArmyResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="army" />
        </main>
    );
}
