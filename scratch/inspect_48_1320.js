import fs from 'fs';

const text = fs.readFileSync('C:/Users/santo/.gemini/antigravity-ide/brain/a9304608-7a93-4aa8-a2fb-064d422e0793/.system_generated/steps/1176/output.txt', 'utf8');

// Find lines with FRAME, COMPONENT, or name/id
const lines = text.split('\n');
console.log("Total lines:", lines.length);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('48:1320') || line.includes('48-1320') || (line.startsWith('  ') && !line.startsWith('    ') && (line.includes('FRAME') || line.includes('name:') || line.includes('type:')))) {
    console.log(`L${i+1}: ${line}`);
  }
}
