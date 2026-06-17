const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  });
}

const typeNames = [
  'DogProfile', 'VaccineRecord', 'Medication', 'Allergy', 'Surgery', 'VetVisit', 
  'WeightEntry', 'HealthEvent', 'Appointment', 'EmergencyContact', 
  'PetSitterInstructions', 'LostPetFlyer', 'DirectoryEntry', 'JournalEntry', 
  'MemoryItem', 'Album', 'TravelChecklistItem', 'Recipe', 'Product'
];

walk('src', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;
  
  // Find imports from types
  // e.g. import { DogProfile, Medication } from '../types';
  // Change to import type { DogProfile, Medication } from '../types';
  
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"](?:\.\.\/|\.\/)*types['"]/g;
  
  content = content.replace(importRegex, (match, names) => {
    const individualNames = names.split(',').map(n => n.trim());
    const allTypes = individualNames.every(name => typeNames.includes(name));
    
    if (allTypes) {
      return `import type { ${individualNames.join(', ')} } from '../types'`;
    } else {
      // If mixed, we might need a more complex split, but for now let's see if this happens
      console.log(`Mixed import in ${filepath}: ${match}`);
      return match;
    }
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed imports in ${filepath}`);
  }
});
