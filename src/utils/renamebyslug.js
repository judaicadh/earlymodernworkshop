import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// For __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsRoot = path.join(__dirname, '..', '..', 'src', 'content', 'documents');

function getSlugFromFrontmatter(fileContent) {
    const match = fileContent.match(/^---\s*([\s\S]*?)---/);
    if (!match) return null;
    const frontmatter = match[1];
    const slugLine = frontmatter.split('\n').find(line => line.trim().startsWith('slug:'));
    if (!slugLine) return null;
    // Handles: slug: value OR slug: "value"
    return slugLine.split(':').slice(1).join(':').trim().replace(/^["']|["']$/g, '');
}

function walkDir(dir, cb) {
    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            walkDir(fullPath, cb);
        } else if (dirent.isFile() && fullPath.endsWith('.md')) {
            cb(fullPath, dir);
        }
    }
}

walkDir(docsRoot, (filePath, yearDir) => {
    const year = path.basename(yearDir);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const slug = getSlugFromFrontmatter(fileContent);

    if (!slug) {
        console.warn(`❗ No slug found in ${filePath}. Skipping.`);
        return;
    }

    const targetName = `${slug}.md`;
    const targetPath = path.join(yearDir, targetName);

    if (path.basename(filePath) === targetName) {
        // Already named correctly
        return;
    }

    if (fs.existsSync(targetPath)) {
        console.warn(`⚠️  Target file ${targetPath} already exists. Skipping rename of ${filePath}.`);
        return;
    }

    fs.renameSync(filePath, targetPath);
    console.log(`✅ Renamed ${filePath} -> ${targetPath}`);
});