import { useEffect } from "react";

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  structuredData,
}) {
  useEffect(() => {
    const fullTitle = title.includes("DigiMistry") ? title : `${title} | DigiMistry`;
    const canonicalUrl = `${window.location.origin}${path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "DigiMistry");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    if (image) {
      upsertMeta("property", "og:image", new URL(image, window.location.origin).href);
      upsertMeta("name", "twitter:image", new URL(image, window.location.origin).href);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let schemaScript = document.head.querySelector('script[data-digimistry-schema="true"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("data-digimistry-schema", "true");
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = structuredData ? JSON.stringify(structuredData) : "";

    return () => {
      if (structuredData && schemaScript) schemaScript.textContent = "";
    };
  }, [title, description, path, image, type, structuredData]);

  return null;
}
