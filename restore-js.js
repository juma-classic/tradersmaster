const fs = require('fs');
const path = require('path');

// Restore JavaScript files from backups
const jsDir = path.join(__dirname, 'js');
const files = fs.readdirSync(jsDir);

console.log('🔄 Restoring JavaScript files from backups...\n');

let restoredCount = 0;

files.forEach(file => {
    if (file.endsWith('.js.backup')) {
        const backupPath = path.join(jsDir, file);
        const originalPath = path.join(jsDir, file.replace('.backup', ''));
        
        try {
            // Read backup file
            const backupCode = fs.readFileSync(backupPath, 'utf8');
            
            // Restore original file
            fs.writeFileSync(originalPath, backupCode);
            
            // Remove backup
            fs.unlinkSync(backupPath);
            
            console.log(`✅ Restored: ${file.replace('.backup', '')}`);
            restoredCount++;
            
        } catch (error) {
            console.error(`❌ Error restoring ${file}:`, error.message);
        }
    }
});

if (restoredCount === 0) {
    console.log('ℹ️  No backup files found to restore');
} else {
    console.log(`\n🎉 Restored ${restoredCount} files from backups!`);
}

console.log('\n💡 Tip: Restart the server after restoring files');