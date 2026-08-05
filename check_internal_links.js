const fs = require('fs');
const path = require('path');

const root = __dirname;
const ignoredDirs = new Set(['.git', '.Trash', 'temp_blog_upload', 'temp_blog_upload_new', 'temp_seo_rebuild', 'structure_update']);

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        if (entry.isDirectory() && ignoredDirs.has(entry.name)) return [];
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(fullPath);
        return entry.name.endsWith('.html') ? [fullPath] : [];
    });
}

const failures = [];
for (const file of walk(root)) {
    const html = fs.readFileSync(file, 'utf8');
    const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(match => match[1]);
    for (const href of hrefs) {
        if (!href || /^(?:https?:|mailto:|tel:|javascript:|#)/i.test(href)) continue;
        const cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref.endsWith('.html')) continue;
        const target = path.resolve(path.dirname(file), cleanHref);
        if (!fs.existsSync(target)) {
            failures.push(`${path.relative(root, file)} -> ${href}`);
        }
    }
}

const uniqueFailures = [...new Set(failures)].sort();
if (uniqueFailures.length) {
    console.error(`Found ${uniqueFailures.length} broken internal HTML links:`);
    uniqueFailures.forEach(failure => console.error(failure));
    process.exitCode = 1;
} else {
    console.log('All internal HTML links resolve to local files.');
}
