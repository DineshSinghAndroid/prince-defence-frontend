import Result from '@/components/result/Result'

export const metadata = {
  title: "Selection Results & Records | Best Defence Academy in Rajasthan | Prince Defence Academy",
  description:
    "Check year-wise defence examination selection results of Prince Defence Academy, Rajasthan's top defence institute. 3900+ selections in NDA, Air Force, Navy, and Army.",
  alternates: {
    canonical: "/results",
  },
  openGraph: {
    title: "Defence Selection Results | Prince Defence Academy Sikar Rajasthan",
    description:
      "Explore official selection records across NDA, Army, Navy and Air Force from Prince Defence Academy Sikar.",
    url: "/results",
    siteName: "Prince Defence Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/Prince Defence Results.webp",
        width: 1200,
        height: 630,
        alt: "Prince Defence Academy Selection Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selection Results | Prince Defence Academy Sikar Rajasthan",
    description:
      "Proven track record of 3900+ selections in Indian Armed Forces from Prince Defence Academy.",
    images: ["/images/Prince Defence Results.webp"],
  },
};

const page = () => {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Result/>
      </main>
  )
}

export default page