const fs = require('fs');
const path = require('path');

const foldersToScan = ['apps', 'libs'];
const root = process.cwd();

/**
 * Recursively find all .js and .jsx files in given folders
 */
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // Skip node_modules
      if (file !== 'node_modules' && file !== '.next') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Patterns to replace (Recursive Regex Pass)
 * This aggressively replaces any relative path that tries to reach 'components' or 'lib'
 * regardless of the number of '../' segments.
 */
const replacements = [
  // 1. Fix broken previous cleanup attempts (e.g. ../../@mr/ui)
  { search: /['"](?:\.\.\/|\.\/)*@mr\//g, replace: "'@mr/" },
  
  // 2. GREEDY UNIVERSAL: Replace ANY relative path looking for components
  //    Matches ./components, ../components, ../../components, etc.
  { search: /['"](?:\.*\/)+components\//g, replace: "'@mr/ui/" },
  
  // 3. GREEDY UNIVERSAL: Replace ANY relative path looking for lib
  { search: /['"](?:\.*\/)+lib\//g, replace: "'@mr/core/" },
  
  // 4. Handle legacy @/ Next.js aliases
  { search: /['"]@\/components\//g, replace: "'@mr/ui/" },
  { search: /['"]@\/lib\//g, replace: "'@mr/core/" },
  
  // 5. Normalization for stray auth labels
  { search: /['"]@mr\/auth\//g, replace: "'@mr/core/" }
];

console.log("Starting Workspace Macro-Repair (Universal Recursive Pass)...");

foldersToScan.forEach(folder => {
  const fullPath = path.join(root, folder);
  if (fs.existsSync(fullPath)) {
    const files = getAllFiles(fullPath);
    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let changed = false;

      replacements.forEach(entry => {
        const nextContent = content.replace(entry.search, entry.replace);
        if (nextContent !== content) {
          console.log(`Fixing: ${path.relative(root, file)}`);
          content = nextContent;
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(file, content, 'utf8');
      }
    });
  }
});

console.log("Universal Macro-Repair Complete.");
