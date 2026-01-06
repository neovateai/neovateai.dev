#!/usr/bin/env bun

import { readdir } from "node:fs/promises";

interface ParsedArgs {
  help: boolean;
}

interface DocInfo {
  slug: string;
  title: string;
  url: string;
  content: string;
}

interface Header {
  level: number; // 2-6
  text: string;
}

interface Section {
  category: string;
  slugs: string[];
}

const BASE_URL = "https://neovateai.dev/en/docs/";
const DOCS_DIR = "./content/en/docs";
const META_FILE = "./content/en/docs/_meta.tsx";
const OUTPUT_DIR = "./public";

async function parseMetaSections(): Promise<Section[]> {
  const content = await Bun.file(META_FILE).text();
  const sections: Section[] = [];
  let currentCategory = "";
  let currentSlugs: string[] = [];

  const lines = content.split("\n");
  for (const line of lines) {
    const separatorMatch = line.match(/<Separator>(.+)<\/Separator>/);
    if (separatorMatch) {
      if (currentCategory && currentSlugs.length > 0) {
        sections.push({ category: currentCategory, slugs: currentSlugs });
      }
      currentCategory = separatorMatch[1] ?? "";
      currentSlugs = [];
      continue;
    }

    const slugMatch = line.match(/'([a-z-]+)':\s*''/);
    if (slugMatch?.[1]) {
      currentSlugs.push(slugMatch[1]);
    }
  }

  if (currentCategory && currentSlugs.length > 0) {
    sections.push({ category: currentCategory, slugs: currentSlugs });
  }

  return sections;
}

function parseArgs(): ParsedArgs {
  const args = Bun.argv.slice(2);
  return {
    help: args.includes("-h") || args.includes("--help"),
  };
}

function showHelp(): void {
  console.log(`
Usage: bun scripts/generate-llms-txt.ts [options]

Generate llms.txt, llms-full.txt and llms-map.txt from MDX docs for LLM consumption.

Options:
  -h, --help    Show this help message

Output:
  public/llms.txt       - List of docs with links
  public/llms-full.txt  - Full content of all docs
  public/llms-map.txt   - Structured map with nested headers
`);
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Untitled";
}

function extractHeaders(content: string): Header[] {
  const headers: Header[] = [];

  // Remove code blocks to avoid matching headers inside them
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");

  // Match headers of level 2-6
  const headerRegex = /^(#{2,6})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headerRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1]?.length ?? 2;
    const text = match[2]?.trim() ?? "";
    if (text) {
      headers.push({ level, text });
    }
  }

  return headers;
}

async function processDoc(slug: string): Promise<DocInfo> {
  const filePath = `${DOCS_DIR}/${slug}.mdx`;
  const content = await Bun.file(filePath).text();
  const title = extractTitle(content);
  const url = `${BASE_URL}${slug}.md`;

  return { slug, title, url, content };
}

const LLMS_HEADER = `# Neovate Code Developer Documentation

This file provides an overview of the Neovate Code documentation and developer resources.

---

`;

const LLMS_FULL_HEADER = `# Neovate Code Developer Documentation - Full Content

This file provides comprehensive documentation with full rendered content.

---

`;

async function generateLlmsTxt(sections: Section[]): Promise<string> {
  const parts: string[] = [];

  for (const section of sections) {
    const docs = await Promise.all(section.slugs.map(processDoc));
    const links = docs.map((doc) => `- [${doc.title}](${doc.url})`).join("\n");
    parts.push(`## ${section.category}\n\n${links}`);
  }

  return LLMS_HEADER + parts.join("\n\n") + "\n";
}

async function generateLlmsFullTxt(sections: Section[]): Promise<string> {
  const allDocs: DocInfo[] = [];
  for (const section of sections) {
    const docs = await Promise.all(section.slugs.map(processDoc));
    allDocs.push(...docs);
  }

  const content = allDocs
    .map((doc) => {
      return `# ${doc.title}\nURL: ${doc.url}\n\n${doc.content}`;
    })
    .join("\n---\n");

  return LLMS_FULL_HEADER + content + "\n";
}

const LLMS_MAP_HEADER = `# Neovate Code Developer Documentation - Map

This file provides a structured map of documentation with nested headers.

---

`;

async function generateLlmsMapTxt(sections: Section[]): Promise<string> {
  const parts: string[] = [];

  for (const section of sections) {
    const docs = await Promise.all(section.slugs.map(processDoc));
    const docParts: string[] = [];

    for (const doc of docs) {
      const headers = extractHeaders(doc.content);
      const headerLines = headers.map((header) => {
        const indent = "  ".repeat(header.level - 2);
        return `${indent}* ${header.text}`;
      });

      const docSection =
        headerLines.length > 0
          ? `### [${doc.title}](${doc.url})\n\n${headerLines.join("\n")}`
          : `### [${doc.title}](${doc.url})`;

      docParts.push(docSection);
    }

    parts.push(`## ${section.category}\n\n${docParts.join("\n\n")}`);
  }

  return LLMS_MAP_HEADER + parts.join("\n\n") + "\n";
}

async function main(): Promise<void> {
  const args = parseArgs();
  if (args.help) {
    showHelp();
    process.exit(0);
  }

  const sections = await parseMetaSections();
  const totalDocs = sections.reduce((sum, s) => sum + s.slugs.length, 0);

  const llmsTxt = await generateLlmsTxt(sections);
  const llmsFullTxt = await generateLlmsFullTxt(sections);
  const llmsMapTxt = await generateLlmsMapTxt(sections);

  await Bun.write(`${OUTPUT_DIR}/llms.txt`, llmsTxt);
  await Bun.write(`${OUTPUT_DIR}/llms-full.txt`, llmsFullTxt);
  await Bun.write(`${OUTPUT_DIR}/llms-map.txt`, llmsMapTxt);

  console.log(`Generated ${OUTPUT_DIR}/llms.txt (${totalDocs} docs)`);
  console.log(`Generated ${OUTPUT_DIR}/llms-full.txt`);
  console.log(`Generated ${OUTPUT_DIR}/llms-map.txt`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
