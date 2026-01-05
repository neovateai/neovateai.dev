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
      currentCategory = separatorMatch[1];
      currentSlugs = [];
      continue;
    }

    const slugMatch = line.match(/'([a-z-]+)':\s*''/);
    if (slugMatch) {
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

Generate llms.txt and llms-full.txt from MDX docs for LLM consumption.

Options:
  -h, --help    Show this help message

Output:
  public/llms.txt       - List of docs with links
  public/llms-full.txt  - Full content of all docs
`);
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
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

  await Bun.write(`${OUTPUT_DIR}/llms.txt`, llmsTxt);
  await Bun.write(`${OUTPUT_DIR}/llms-full.txt`, llmsFullTxt);

  console.log(`Generated ${OUTPUT_DIR}/llms.txt (${totalDocs} docs)`);
  console.log(`Generated ${OUTPUT_DIR}/llms-full.txt`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
