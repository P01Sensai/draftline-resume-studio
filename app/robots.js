const SITE_URL = "https://draftline.example.com"; // TODO: replace with your real domain

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
