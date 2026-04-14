export function getImageUrl(path?: string | null) {
  if (!path) return null;

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  if (path.startsWith("http")) return path;

  return `${baseUrl}${path}`;
}
