import examData from "@/data/course.json";
import facilitiesData from "@/data/facilities.json";

export default function sitemap() {
  const baseUrl = "https://www.princedefence.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/facilities",
    "/gallery",
    "/blog",
    "/news",
    "/achievers",
    "/results",
    "/results/nda",
    "/results/army",
    "/results/air-force",
    "/results/navy",
    "/contact",
    "/quiz",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));

  const courseRoutes = (examData?.exams || []).map((exam) => ({
    url: `${baseUrl}/courses/${exam.slug}`,
    lastModified: now,
  }));

  const facilityRoutes = (facilitiesData?.facilities || []).map((facility) => ({
    url: `${baseUrl}/facilities/${facility.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...courseRoutes, ...facilityRoutes];
}
