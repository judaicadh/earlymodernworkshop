import fs from 'fs';
import path from 'path';

// Define the directory you want to check
const directory = path.join(process.cwd(), '../../src/content'); // Ensure the path is absolute

// Check if the directory exists
if (!fs.existsSync(directory)) {
    console.error(`Directory does not exist: ${directory}`);
    process.exit(1);
}

// Define required fields for Markdown files
const requiredMarkdownFields = ['title', 'slug', 'year'];
const requiredJsonFields = ['year', 'title', 'slug'];

async function validateMarkdownFile(filePath) {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const frontmatterMatch = content.match(/---([\s\S]*?)---/);

    if (!frontmatterMatch) {
        console.error(`Missing frontmatter in file: ${filePath}`);
        return;
    }

    const frontmatter = frontmatterMatch[1];
    const metadata = {};

    frontmatter.split('\n').forEach((line) => {
        const [key, ...value] = line.split(':');
        if (key && value) {
            metadata[key.trim()] = value.join(':').trim();
        }
    });

    requiredMarkdownFields.forEach((field) => {
        if (!metadata[field]) {
            console.error(`Missing required field "${field}" in file: ${filePath}`);
        }
    });
}

async function validateJsonFile(filePath) {
    const content = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));

    content.forEach((entry) => {
        requiredJsonFields.forEach((field) => {
            if (!entry[field]) {
                console.error(`Missing required field "${field}" in JSON entry: ${JSON.stringify(entry)} in file: ${filePath}`);
            }
        });
    });
}

async function traverseDirectory(dir) {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);

        if (stat.isDirectory()) {
            await traverseDirectory(filePath);
        } else {
            if (file.endsWith('.md')) {
                await validateMarkdownFile(filePath);
            } else if (file.endsWith('.json')) {
                await validateJsonFile(filePath);
            }
        }
    }
}

// Start traversing
(async () => {
    try {
        await traverseDirectory(directory);
        console.log('Validation complete!');
    } catch (error) {
        console.error('Error during validation:', error.message);
    }
})();