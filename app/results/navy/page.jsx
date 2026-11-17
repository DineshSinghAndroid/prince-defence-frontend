import Result from "@/components/result/Result";

export const metadata = {
    title: "Indian Navy Selection Results | SSR & MR | Prince Defence Academy Sikar Rajasthan",
    description:
        "Official Indian Navy selection results of Prince Defence Academy Sikar, Rajasthan. View successful candidates in Navy SSR, MR, and AA recruitment exams.",
    alternates: {
        canonical: "/results/navy",
    },
    openGraph: {
        title: "Indian Navy Selection Results | Prince Defence Academy Sikar",
        description:
            "Celebrating Indian Navy selections from Prince Defence Academy, the top defence academy in Rajasthan.",
        url: "/results/navy",
        siteName: "Prince Defence Academy",
        locale: "en_IN",
        type: "website",
    },
};

export default function NavyResultsPage() {
    return (
        <main className="min-h-screen bg-[#F0F3F8]">
            <Result category="navy" />
        </main>
    );
}
