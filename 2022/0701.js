const fs = require('fs');
const input = fs.readFileSync('input/07.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let parentDirs = {};
let parents = [];

// Handle moves
for (let i = 0; i < inputAsArray.length; i++){

    if( inputAsArray[i] === '$ ls' ){
        // skip
    } else if( inputAsArray[i] === '$ cd ..' ){
        parents = parents.slice(0, -1);
    } else if( inputAsArray[i].startsWith('$ cd ') ){
        const folderName = inputAsArray[i].replace('$ cd ', '');

        let folderPrefix = '';
        if( parents ){
            parents.forEach((parent, index, array) => {
                folderPrefix = folderPrefix + parent + '___';
            });
        }

        parents.push( folderPrefix + folderName );
    }else if( inputAsArray[i].startsWith('dir ') ){
        // skip
    } else {
        // file
        const fileData = inputAsArray[i].split(' ');
        const fileName = fileData[1];
        const fileSize = parseInt( fileData[0] );

        // add to all parents
        parents.forEach((parent, index, array) => {
            if( typeof parentDirs[parent] === 'undefined' ){
                parentDirs[parent] = {};
            }

            parentDirs[parent][fileName] = fileSize;
        });
    }
}

let calculatedParentDirs = {};

for (const [key, value] of Object.entries(parentDirs)) {
    let folderSize = 0;
    for (const [innerKey, innerValue] of Object.entries(value)) {
        folderSize = folderSize + innerValue;
    }

    calculatedParentDirs[key] = folderSize;
}

// Validate max
let sum = 0;
for (const [key, value] of Object.entries(calculatedParentDirs)) {
    
    if( value <= 100000 ){
        sum = sum + value;
    }
}

console.log('0701: ' + sum );