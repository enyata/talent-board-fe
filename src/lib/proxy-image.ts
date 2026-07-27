export function getProxiedImageUrl(src?: string | null): string | undefined {
    if (!src) return undefined;
    if (!/^https?:\/\//.test(src)) return src;

    return `/api/proxy-image?url=${encodeURIComponent(src)}`;
}
