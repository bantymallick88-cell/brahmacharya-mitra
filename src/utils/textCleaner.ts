// Text encoding utility to clean UTF-8 / Windows-1252 mojibake from synced feeds

const win1252Map: Record<number, number> = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160,
  0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
};

const reverse1252 = new Map<string, number>();
for (const [byte, code] of Object.entries(win1252Map)) {
  reverse1252.set(String.fromCharCode(Number(code)), Number(byte));
}

function singlePassDecode(str: string): string {
  try {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (reverse1252.has(ch)) {
        bytes.push(reverse1252.get(ch)!);
      } else {
        const code = str.charCodeAt(i);
        if (code <= 0xff) {
          bytes.push(code);
        } else {
          const enc = new TextEncoder().encode(ch);
          for (const b of enc) bytes.push(b);
        }
      }
    }
    return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(bytes));
  } catch {
    return str;
  }
}

// Known replacement dictionary for stubborn / partial mojibake sequences
const commonMojibakeMap: [RegExp, string][] = [
  [/Ã¢â‚¬â€|â€”/g, '—'],
  [/â€“/g, '–'],
  [/Ã¢â‚¬Å“|â€œ/g, '“'],
  [/Ã¢â‚¬Â|â€/g, '”'],
  [/Ã¢â‚¬â„¢|â€™/g, '’'],
  [/Ã¢â‚¬Ëœ|â€˜/g, '‘'],
  [/â€¦/g, '…'],
  [/â€¢/g, '•'],
  [/â„¢/g, '™'],
  [/âœ¨/g, '✨'],
  [/âš¡/g, '⚡'],
  [/ðŸ”¥/g, '🔥'],
  [/ðŸ”±/g, '🔱'],
  [/ðŸ™/g, '🙏'],
];

/**
 * Automatically detects and repairs common Windows-1252 / Latin-1 UTF-8 double/triple-encoding (mojibake)
 * Restores quotes (“ ”), dashes (—), Devanagari symbols, and emojis (🔥 ⚡ ✨).
 */
export function cleanFeedText(str: string): string {
  if (!str || typeof str !== 'string') return '';

  let current = str;

  // Multi-pass binary reversal for up to 3 double-encoded layers
  for (let pass = 0; pass < 3; pass++) {
    const hasMojibake =
      /[\u00C0-\u00FF][\u0080-\u00BF]/.test(current) ||
      /\u00E2[\u20AC\u201C\u201D\u2019\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178]/.test(current) ||
      /\u00F0\u0178/.test(current) ||
      /\u00E0[\u00A4\u00A5]/.test(current) ||
      /\u00C3[\u00A2\u00A9\u00AE]/.test(current);

    if (!hasMojibake) break;

    const cleaned = singlePassDecode(current);
    if (cleaned === current) break;
    current = cleaned;
  }

  // Fallback map for any remaining sequence anomalies
  for (const [pattern, replacement] of commonMojibakeMap) {
    current = current.replace(pattern, replacement);
  }

  return current;
}

/**
 * Sanitizes all text fields in a Telegram feed post
 */
export function sanitizeFeedItem<T extends { text_content?: string; author_name?: string; tags?: string[] }>(
  item: T
): T {
  if (!item) return item;
  return {
    ...item,
    text_content: item.text_content ? cleanFeedText(item.text_content) : '',
    author_name: item.author_name ? cleanFeedText(item.author_name) : '',
    tags: Array.isArray(item.tags) ? item.tags.map(cleanFeedText) : item.tags,
  };
}

/**
 * Sanitizes an array of Telegram feed posts
 */
export function sanitizeFeedItems<T extends { text_content?: string; author_name?: string; tags?: string[] }>(
  items: T[]
): T[] {
  if (!Array.isArray(items)) return [];
  return items.map(sanitizeFeedItem);
}
