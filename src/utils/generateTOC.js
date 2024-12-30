export function generateToCFromSections(sections = []) {
    if (!Array.isArray(sections)) return [];
    return sections.map(({ title }, index) => ({
        text: title,
        slug: title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Slugify for IDs
            .replace(/^-|-$/g, ''),
        depth: 1, // Assuming these are top-level headers
    }));
}