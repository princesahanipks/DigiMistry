const files = import.meta.glob("./Content/*.md", { query: "?raw", import: "default", eager: true });

export const getContent = (slug) => {
  const content = Object.entries(files).find(([path]) => {
    const filename = path.slice(path.lastIndexOf("/") + 1, -3);
    return filename.toLowerCase() === slug?.toLowerCase();
  })?.[1];

  return content || "Content jald aayega.";
};