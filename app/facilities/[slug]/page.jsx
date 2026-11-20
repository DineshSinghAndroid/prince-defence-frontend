import { notFound } from "next/navigation";
import facilitiesData from "@/data/facilities.json";
import FacilityDetails from "@/components/facilities/FacilitiesDetails";


export function generateStaticParams() {
  return facilitiesData.facilities.map((facility) => ({
    slug: facility.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const facility = facilitiesData.facilities.find(
    (item) => item.slug === slug
  );

  if (!facility) {
    return {
      title: "Facility Not Found | Prince Defence Academy",
    };
  }

  const description = `${facility.shortDescription} Explore world-class ${facility.title} infrastructure at Prince Defence Academy, the best defence academy in Rajasthan.`;

  return {
    title: `${facility.title} | Prince Defence Academy Sikar, Rajasthan`,
    description,
    alternates: {
      canonical: `/facilities/${slug}`,
    },
    openGraph: {
      title: `${facility.title} | Prince Defence Academy Sikar Rajasthan`,
      description,
      url: `/facilities/${slug}`,
      siteName: "Prince Defence Academy",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: facility.images?.[0] || "/images/campusbg-2.webp",
          width: 1200,
          height: 630,
          alt: `${facility.title} at Prince Defence Academy Sikar Rajasthan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${facility.title} | Prince Defence Academy Sikar Rajasthan`,
      description,
      images: [facility.images?.[0] || "/images/campusbg-2.webp"],
    },
  };
}

export default async function FacilityPage({ params }) {
  const { slug } = await params;
  const facility = facilitiesData.facilities.find(
    (item) => item.slug === slug
  );

  if (!facility) {
    notFound();
  }

  return <FacilityDetails facility={facility} />
}