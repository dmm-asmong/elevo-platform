export interface TOCHeading {
  level: number;
  text: string;
  id: string;
}

export function slugifyHeading(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/[^\w\s가-힣]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function extractTOC(html: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  const regex = /<h([23])\s+id="([^"]*)">([\s\S]*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    headings.push({ level, text, id });
  }
  return headings;
}
