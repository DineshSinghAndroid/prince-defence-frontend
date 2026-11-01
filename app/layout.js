
import "./globals.css";

import localFont from "next/font/local";
import { Navbar } from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import EnquiryModal from "@/components/common/EnquiryModal";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import Popup from "@/components/layouts/PopUp";
import { Toaster } from "react-hot-toast";
import VisitorTracker from "@/components/quiz/VisitorTracker";
import { API_URL } from "@/services/api";

const apiOrigin = (() => {
  try {
    return new URL(API_URL).origin;
  } catch {
    return null;
  }
})();

// Fonts
const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.woff2",
  variable: "--cinzel-fonts",
  weight: "400 900",
  display: "optional",
  preload: true,
  fallback: ["serif"],
});

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--inter-fonts",
  weight: "400 900",
  display: "optional",
  preload: true,
  fallback: ["sans-serif"],
});

const montserrat = localFont({
  src: "./fonts/Montserrat-Variable.woff2",
  variable: "--montserrat-fonts",
  weight: "400 900",
  display: "optional",
  preload: false,
  fallback: ["sans-serif"],
});

// SEO Metadata - Optimized for "Best Defence Academy in Rajasthan & Sikar"
export const metadata = {
  metadataBase: new URL("https://www.princedefence.com"),
  title: {
    default: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
    template: "%s | Prince Defence Academy",
  },
  description:
    "Prince Defence Academy (PDA) Sikar is the best defence academy in Rajasthan. Premier coaching for NDA, Air Force (Agniveer), Navy, Army & SSB with integrated schooling, hostel & physical ground.",
  keywords: [
    "Best Defence Academy in Rajasthan",
    "Best Defence Academy in Sikar",
    "Top Defence Academy in Rajasthan",
    "Best NDA Coaching in Rajasthan",
    "Best NDA Coaching in Sikar",
    "Prince Defence Academy Sikar",
    "NDA Foundation Course Sikar",
    "Air Force Coaching in Rajasthan",
    "Navy Coaching in Rajasthan",
    "Army Agniveer Coaching in Sikar",
    "SSB Interview Coaching Rajasthan",
    "Defence Academy with Hostel in Sikar",
  ],
  authors: [{ name: "Prince Defence Academy", url: "https://www.princedefence.com" }],
  creator: "Prince Defence Academy",
  publisher: "Prince Eduhub",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
    description:
      "Rajasthan's No. 1 defence academy in Sikar for NDA, Air Force, Navy, Army & SSB coaching with integrated schooling & hostel facility. 3900+ selections.",
    url: "https://www.princedefence.com",
    siteName: "Prince Defence Academy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/campusbg-2.webp",
        width: 1200,
        height: 630,
        alt: "Prince Defence Academy Campus Sikar Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Defence Academy | Best Defence Academy in Rajasthan & Sikar",
    description:
      "Best defence academy in Rajasthan for NDA, Air Force, Navy, Army & SSB coaching. 3900+ selections with school & hostel.",
    images: ["/images/campusbg-2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Sikar, Rajasthan",
    "geo.position": "27.602353;75.061922",
    "ICBM": "27.602353, 75.061922",
  },
};

// JSON-LD Structured Data Schema for Search Engines
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://www.princedefence.com/#organization",
      name: "Prince Defence Academy",
      alternateName: ["PDA Sikar", "Prince NDA Academy", "Prince Defence Academy Sikar"],
      url: "https://www.princedefence.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.princedefence.com/images/PrinceDefenceLogo.webp",
      },
      image: "https://www.princedefence.com/images/campusbg-2.webp",
      description:
        "Prince Defence Academy (PDA) is the best defence coaching academy in Rajasthan located in Sikar, offering expert preparation for NDA, CDS, AFCAT, Indian Army, Navy, Air Force and SSB interview.",
      telephone: "+919610742222",
      email: "pdasikar@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Palwas Road",
        addressLocality: "Sikar",
        addressRegion: "Rajasthan",
        postalCode: "332042",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.60235267935045,
        longitude: 75.0619223713875,
      },
      parentOrganization: {
        "@type": "EducationalOrganization",
        name: "Prince Eduhub",
        url: "https://www.princeeduhub.com",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Defence Examination Coaching Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "NDA Coaching (School + Defence)",
              description: "Comprehensive NDA coaching integrated with 11th & 12th schooling and SSB interview training in Sikar, Rajasthan.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Indian Air Force (Agniveer Vayu) Coaching",
              description: "Target preparation for Air Force technical and non-technical branches with physical training.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Indian Navy (SSR / MR) Coaching",
              description: "Focused training and written exam preparation for Indian Navy recruitment.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Indian Army (Agniveer) Coaching",
              description: "Physical efficiency coaching and academic batches for Army GD, Clerk, and Technical.",
            },
          },
        ],
      },
    },
  ],
};

// 360 Degree Tour Icon
function Rotate360Icon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top curved arrow */}
      <path
        d="M14 25 A20 20 0 0 1 47 20"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M41 14 L48 20 L41 24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom curved arrow */}
      <path
        d="M50 39 A20 20 0 0 1 17 44"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M23 40 L16 44 L23 50"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 360 Degree Text */}
      <text
        x="32"
        y="35"
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontWeight="400"
      >
        360°
      </text>
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {apiOrigin && (
          <link rel="preconnect" href={apiOrigin} crossOrigin="anonymous" />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">

        {/* Starting Popup */}

        <Popup/>

       {/* Floating Phone Button */}
<Link
  href="tel:+919610732222"
  aria-label="Call Prince Defence Academy"
  className="floating-gold-btn fixed bottom-6 left-4 z-50
    flex h-14 w-14 items-center justify-center
    rounded-full bg-(--green) text-white
    sm:bottom-8 sm:left-6 sm:h-16 sm:w-16"
>
  <PhoneCall size={22} className="text-white" />
</Link>

{/* Floating 360 Tour Button */}
<Link
  href="https://tour.princeeduhub.com/princt34/prince-defence/"
  aria-label="Explore 360 degree virtual tour"
  className="floating-gold-btn fixed bottom-6 right-4 z-50
    flex h-14 w-14 items-center justify-center
    rounded-full bg-(--gold) text-white
    sm:bottom-8 sm:right-6 sm:h-16 sm:w-16"
>
  <Rotate360Icon />
</Link>

        <VisitorTracker />
        <Navbar />
        <EnquiryModal />

        {/* Main Content */}
        <main className="w-full flex-1">
          {children}
        </main>

        <Footer />
         <Toaster position="top-right" />

      </body>
    </html>
  );
}
