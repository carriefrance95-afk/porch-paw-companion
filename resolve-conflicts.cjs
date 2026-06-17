const fs = require('fs');
const path = require('path');

function resolveConflicts(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace patterns like:
  // <<<<<<< HEAD
  // head content
  // =======
  // other content
  // >>>>>>> origin/main
  // with just "head content"
  
  const regex = /<<<<<<< HEAD([\s\S]*?)=======([\s\S]*?)>>>>>>> origin\/main/g;
  
  let newContent = content.replace(regex, (match, head) => {
    return head.trim() + '\n';
  });
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Resolved conflicts in ${filePath}`);
  } else {
    console.log(`No conflicts found in ${filePath}`);
  }
}

const files = [
  'src/pages/Dashboard.tsx',
  'src/context/PetContext.tsx',
  'src/types/index.ts'
];

files.forEach(f => {
  resolveConflicts(path.join(process.cwd(), f));
});
