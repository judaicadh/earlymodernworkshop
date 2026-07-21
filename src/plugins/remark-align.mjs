// Renders the `Align` Keystatic content component (keystatic.config.ts).
//
// Keystatic's markdoc field serialises that component as Markdoc tag syntax:
//
//   {% Align alignment="center" %}
//   …content…
//   {% /Align %}
//
// Our entries are `.md`, so they go through the unified pipeline rather than
// @astrojs/markdoc (which only claims `.mdoc`). Nothing downstream understands
// `{% %}`, so without this the tags would render as literal text. We rewrite the
// open/close paragraphs into raw HTML, which this pipeline already passes
// through untouched — 66 entries rely on that today.

const ALIGNMENTS = new Set(['center', 'right', 'end', 'left', 'start']);

// Quotes may already be curled by smart punctuation, so accept both forms.
const OPEN = /^\{%\s*Align\s+alignment\s*=\s*["'“”‘’]?([a-z]+)["'“”‘’]?\s*%\}$/i;
const CLOSE = /^\{%\s*\/\s*Align\s*%\}$/i;

/** Paragraph wrapping exactly one text node → that text, else null. */
function loneText(node) {
    if (node?.type !== 'paragraph' || node.children?.length !== 1) return null;
    const [child] = node.children;
    return child?.type === 'text' ? child.value.trim() : null;
}

export default function remarkAlign() {
    return (tree) => {
        const out = [];
        // Depth guard so a stray `{% /Align %}` can't close a block we never opened.
        let depth = 0;

        for (const node of tree.children) {
            const text = loneText(node);

            const open = text && OPEN.exec(text);
            if (open) {
                const alignment = open[1].toLowerCase();
                if (!ALIGNMENTS.has(alignment)) {
                    out.push(node); // unknown value: leave visible rather than swallow content
                    continue;
                }
                depth++;
                out.push({ type: 'html', value: `<div style="text-align: ${alignment}">` });
                continue;
            }

            if (text && CLOSE.test(text) && depth > 0) {
                depth--;
                out.push({ type: 'html', value: '</div>' });
                continue;
            }

            out.push(node);
        }

        // Unbalanced open tag: close it so we never emit broken markup.
        for (; depth > 0; depth--) out.push({ type: 'html', value: '</div>' });

        tree.children = out;
    };
}
