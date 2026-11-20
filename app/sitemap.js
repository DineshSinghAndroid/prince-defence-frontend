import examData from "@/data/course.json";
import facilitiesData from "@/data/facilities.json";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://www.princedefence.com";
  const now = new Date();

  // High-priority core landing pages
  const corePages = [
    { route: "", changeFrequency: "daily", priority: 1.0 },
    { route: "/about", changeFrequency: "monthly", priority: 0.85 },
    { route: "/courses", changeFrequency: "weekly", priority: 0.9 },
    { route: "/facilities", changeFrequency: "monthly", priority: 0.8 },
    { route: "/achievers", changeFrequency: "daily", priority: 0.9 },
    { route: "/gallery", changeFrequency: "weekly", priority: 0.8 },
    { route: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { route: "/quiz", changeFrequency: "daily", priority: 0.8 },
    { route: "/results", changeFrequency: "weekly", priority: 0.9 },
    { route: "/results/nda", changeFrequency: "weekly", priority: 0.85 },
    { route: "/results/army", changeFrequency: "weekly", priority: 0.85 },
    { route: "/results/air-force", changeFrequency: "weekly", priority: 0.85 },
    { route: "/results/navy", changeFrequency: "weekly", priority: 0.85 },
    { route: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { route: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
    // Note: /blog and /news are currently commented out / calling notFound()
    // so they are omitted from sitemap to prevent 404 crawl errors.
  ].map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Dynamic course guide routes
  const courseRoutes = (examData?.exams || []).map((exam) => ({
    url: `${baseUrl}/courses/${exam.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic campus facility routes
  const facilityRoutes = (facilitiesData?.facilities || []).map((facility) => ({
    url: `${baseUrl}/facilities/${facility.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...corePages, ...courseRoutes, ...facilityRoutes];
}
