import fs from 'fs';

const text = fs.readFileSync('scratch/assignments_template.txt', 'utf8');

// Find all fills, fonts, and styles
const fills = new Set();
const fonts = new Set();
for (const match of text.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g)) {
  fills.add(match[0].toUpperCase());
}

console.log("Colors in template:", Array.from(fills));

// Check styles
const styleMatches = text.matchAll(/style_[a-f0-9]+:[\s\S]*?(?=\n\w|\n$)/g);
for (const m of styleMatches) {
  console.log(m[0].slice(0, 150));
}
