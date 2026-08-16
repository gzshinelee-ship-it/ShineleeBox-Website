const fs = require('fs');
const path = require('path');

const root = __dirname;
const ignored = new Set(['.git', '.Trash', 'structure_update', 'temp_blog_upload', 'temp_blog_upload_new', 'temp_seo_rebuild']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(root).filter((file) => file.endsWith('.html'));
const rows = files.map((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() || '';
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1].trim() || '';
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  return {
    file: path.relative(root, file),
    title,
    description,
    h1Count,
    canonical: /rel=["']canonical["']/i.test(html),
    jsonLd: /application\/ld\+json/i.test(html),
  };
});

const duplicateValues = (key) => {
  const groups = new Map();
  for (const row of rows) {
    if (!row[key]) continue;
    const list = groups.get(row[key]) || [];
    list.push(row.file);
    groups.set(row[key], list);
  }
  return [...groups.entries()].filter(([, list]) => list.length > 1);
};

const report = {
  generatedAt: new Date().toISOString(),
  htmlPages: rows.length,
  missingTitle: rows.filter((row) => !row.title).map((row) => row.file),
  missingDescription: rows.filter((row) => !row.description).map((row) => row.file),
  invalidH1Count: rows.filter((row) => row.h1Count !== 1).map((row) => ({ file: row.file, count: row.h1Count })),
  missingCanonical: rows.filter((row) => !row.canonical).map((row) => row.file),
  missingJsonLd: rows.filter((row) => !row.jsonLd).map((row) => row.file),
  duplicateTitles: duplicateValues('title'),
  duplicateDescriptions: duplicateValues('description'),
};

console.log(JSON.stringify(report, null, 2));
