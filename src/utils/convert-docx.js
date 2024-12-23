import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
const inputDir = '../content/documents/2024';
const outputDir = '../content/documents/2024';

fs.readdirSync(inputDir).forEach(async (file) => {
    if (path.extname(file) === '.docx') {
        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, file.replace('.docx', '.md'));
        const docxBuffer = fs.readFileSync(inputFile);
        const result = await mammoth.convertToMarkdown({ buffer: docxBuffer });
        fs.writeFileSync(outputFile, result.value);
        console.log(`Converted ${inputFile} to ${outputFile}`);
    }
});