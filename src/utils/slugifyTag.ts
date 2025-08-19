export function slugifyTag(tag: string) {
    return tag
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')    // spaces/underscores → hyphens
        .replace(/[^a-z0-9-]/g, ''); // strip non-url chars (adjust if you need)
}