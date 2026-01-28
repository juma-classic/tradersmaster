const fs = require('fs');
const path = require('path');

// Simple JavaScript beautifier
function beautifyJS(code) {
    let beautified = code;
    let indentLevel = 0;
    const indent = '    '; // 4 spaces
    
    // Add newlines after certain characters
    beautified = beautified
        .replace(/;/g, ';\n')
        .replace(/\{/g, '{\n')
        .replace(/\}/g, '\n}\n')
        .replace(/,/g, ',\n');
    
    // Split into lines and add proper indentation
    const lines = beautified.split('\n');
    const indentedLines = [];
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        // Decrease indent for closing braces
        if (line.includes('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // Add indentation
        indentedLines.push(indent.repeat(indentLevel) + line);
        
        // Increase indent for opening braces
        if (line.includes('{')) {
            indentLevel++;
        }
    }
    
    return indentedLines.join('\n');
}

// Get all JS files in the js directory
const jsDir = path.join(__dirname, 'js');
const files = fs.readdirSync(jsDir);

console.log('🔧 Beautifying JavaScript files...\n');

files.forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(jsDir, file);
        const backupPath = path.join(jsDir, file + '.backup');
        
        try {
            // Read original file
            const originalCode = fs.readFileSync(filePath, 'utf8');
            
            // Create backup
            fs.writeFileSync(backupPath, originalCode);
            
            // Beautify and write back
            const beautifiedCode = beautifyJS(originalCode);
            fs.writeFileSync(filePath, beautifiedCode);
            
            console.log(`✅ Beautified: ${file}`);
            console.log(`📁 Backup created: ${file}.backup`);
            
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    }
});

console.log('\n🎉 Beautification complete!');
console.log('\n⚠️  Note: If this causes issues, you can restore from .backup files');
console.log('To restore: rename .backup files back to .js files');