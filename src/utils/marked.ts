import { Marked, type TokenizerAndRendererExtension } from 'marked';

// `++text++` → <ins>text</ins>, matching the `remark-ins` plugin used by the
// Astro markdown pipeline (<Content />). Fields rendered with `marked`
// (title, description, original_language_body) otherwise show the raw `++`
// because `marked` has no built-in underline syntax.
const insExtension: TokenizerAndRendererExtension = {
  name: 'ins',
  level: 'inline',
  start(src) {
    return src.indexOf('++');
  },
  tokenizer(src) {
    // Require non-whitespace directly inside the markers, like remark-ins.
    const match = /^\+\+(?=\S)([\s\S]*?\S)\+\+/.exec(src);
    if (match) {
      return {
        type: 'ins',
        raw: match[0],
        text: match[1],
        tokens: this.lexer.inlineTokens(match[1]),
      };
    }
  },
  renderer(token) {
    return `<ins>${this.parser.parseInline(token.tokens ?? [])}</ins>`;
  },
};

export const marked = new Marked().use({ extensions: [insExtension] });
