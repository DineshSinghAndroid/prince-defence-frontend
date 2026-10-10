export default function sitemap() {
  const baseUrl = "https://www.princedefence.com";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/facilities`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/news`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/quiz`, lastModified: new Date() },
  ];
}
