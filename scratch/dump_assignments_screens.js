import fs from 'fs';

const text = fs.readFileSync('C:/Users/santo/.gemini/antigravity-ide/brain/a9304608-7a93-4aa8-a2fb-064d422e0793/.system_generated/steps/1176/output.txt', 'utf8');

const lines = text.split('\n');

function dumpRange(startLine, endLine, filename) {
  const slice = lines.slice(startLine - 1, endLine).join('\n');
  fs.writeFileSync(filename, slice, 'utf8');
  console.log(`Saved ${filename} (${endLine - startLine + 1} lines)`);
}

// Lines:
// L756: [FRAME] "Assignments — Overview" #48:1321
// L948: [FRAME] "Assignments — List and Details" #48:1535
// L1138: [FRAME] "Assignments — Create and Edit" #48:1747
// L1308: [FRAME] "Assignments — Submissions and Materials" #48:1939

dumpRange(1, 754, 'scratch/assignments_template.txt');
dumpRange(755, 947, 'scratch/assignments_screen1_overview.txt');
dumpRange(948, 1137, 'scratch/assignments_screen2_list_details.txt');
dumpRange(1138, 1307, 'scratch/assignments_screen3_create_edit.txt');
dumpRange(1308, lines.length, 'scratch/assignments_screen4_submissions_materials.txt');
