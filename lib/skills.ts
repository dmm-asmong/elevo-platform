import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * content 폴더의 마크다운 파일을 읽어 HTML로 파싱하여 반환
 */
export async function getSkillContent(contentFile: string): Promise<string> {
  const filePath = path.join(CONTENT_DIR, contentFile);
  if (!fs.existsSync(filePath)) return "";

  const raw = fs.readFileSync(filePath, "utf-8");
  return raw;
}
