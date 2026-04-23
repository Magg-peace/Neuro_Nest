const fs = require('fs');
const path = 'frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// The goal is to find the junction between ChildDashboard and ParentDashboard
// and ensure there are TWO closing divs before the ); and };

// We look for the "Magic Canvas" section which is near the end of ChildDashboard
const searchStr = '“Magic Canvas”</h3>\r\n            <p style={{ color: \'#975A16\', fontWeight: \'bold\', margin: 0, opacity: 0.8 }}>Creative sketching ✏️</p>\r\n         </Link>\r\n     </div>\r\n    );\r\n };';
// Wait, I don't know the line endings (LF vs CRLF). I'll use regex.

const regex = /Magic Canvas”<\/h3>\s*<p style={{ color: '#975A16', fontWeight: 'bold', margin: 0, opacity: 0.8 }}>Creative sketching ✏️<\/p>\s*<\/Link>\s*<\/div>\s*\);\s*};/;

const match = content.match(regex);
if (match) {
    console.log('Match found!');
    const newEnd = 'Magic Canvas”</h3>\n            <p style={{ color: \'#975A16\', fontWeight: \'bold\', margin: 0, opacity: 0.8 }}>Creative sketching ✏️</p>\n         </Link>\n      </div>\n    </div>\n   );\n};';
    content = content.replace(regex, newEnd);
    fs.writeFileSync(path, content);
    console.log('File updated successfully.');
} else {
    console.log('Match not found with regex. Trying second approach...');
    // Try to find the single </div> followed by ); and }; and insert another </div>
    const regex2 = /(<\/Link>\s*)(<\/div>)(\s*\);\s*};)/;
    const match2 = content.match(regex2);
    if (match2) {
        console.log('Match 2 found!');
        const updated = match2[1] + match2[2] + '\n    </div>' + match2[3];
        content = content.replace(regex2, updated);
        fs.writeFileSync(path, content);
        console.log('File updated successfully via Match 2.');
    } else {
        console.log('Failed to match either pattern.');
        // Plan C: just read everything between lines 650 and 665 and output it to help debug
        const lines = content.split(/\r?\n/);
        console.log('Lines 650-665:');
        lines.slice(650, 665).forEach((l, i) => console.log(`${650+i}: [${l}]`));
    }
}
