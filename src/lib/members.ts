// lib/members.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const membersDir = path.join(process.cwd(), "data");

export function getAllMemberIds() {
  return fs.readdirSync(membersDir).map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    };
  });
}

export function getMemberData(id: string) {
  const fullPath = path.join(membersDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    ...(data as {
      name: string;
      intro: string;
      info: string;
      stack: string[];
    }),
    content,
  };
}
