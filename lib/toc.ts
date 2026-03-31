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

export function extractTOC(md: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  for (const line of md.split("\n")) {
    const m2 = line.match(/^## (.+)$/);
    const m3 = line.match(/^### (.+)$/);
    if (m2) headings.push({ level: 2, text: m2[1], id: slugifyHeading(m2[1]) });
    else if (m3) headings.push({ level: 3, text: m3[1], id: slugifyHeading(m3[1]) });
  }
  return headings;
}
