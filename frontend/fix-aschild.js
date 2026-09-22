const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('asChild')) {
        // We'll replace <Button asChild className="..."> <Link href="...Text</Link> </Button>
        // with <Link href="..."><Button className="...">Text</Button></Link>
        // It's tricky with regex, let's just do a simpler search and replace for specific patterns
        
        console.log(`Fixing ${file}`);
        content = content.replace(/<Button([^>]*)asChild([^>]*)>\s*<Link([^>]*)>(.*?)<\/Link>\s*<\/Button>/gs, 
            '<Link$3><Button$1$2>$4</Button></Link>');
            
        // For remaining <Button asChild...><Link...></Button>
        content = content.replace(/<Button asChild(.*?)>\s*<Link href=(.*?)>(.*?)<\/Link>\s*<\/Button>/gs, 
            '<Link href=$2><Button$1>$3</Button></Link>');
            
        content = content.replace(/asChild/g, ''); // strip any remaining asChild to compile
        fs.writeFileSync(file, content, 'utf8');
    }
});
