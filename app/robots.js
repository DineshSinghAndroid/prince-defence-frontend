export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/quiz/archive/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/files/"],
      },
    ],
    sitemap: "https://www.princedefence.com/sitemap.xml",
    host: "https://www.princedefence.com",
  };
}
