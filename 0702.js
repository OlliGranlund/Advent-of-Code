const fs = require('fs');
const input = fs.readFileSync('input/07.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let parentDirs = {};
let parents = [];

const totalspace = 70000000;
const targetUnusedSpace = 30000000;

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

        // sirty copy paste
        let folderPrefix = '';
        if( parents ){
            parents.forEach((parent, index, array) => {
                folderPrefix = folderPrefix + parent + '___';
            });
        }

        // add to all parents
        parents.forEach((parent, index, array) => {
            if( typeof parentDirs[parent] === 'undefined' ){
                parentDirs[parent] = {};
            }

            parentDirs[parent][folderPrefix + fileName] = fileSize;
        });
    }
}

let calculatedParentDirs = {};
let folderSizes = [];

for (const [key, value] of Object.entries(parentDirs)) {
    let folderSize = 0;
    for (const [innerKey, innerValue] of Object.entries(value)) {
        folderSize = folderSize + innerValue;
    }

    calculatedParentDirs[key] = folderSize;
    folderSizes.push(folderSize);
}

currentOccupiedSpace = folderSizes.sort(function(a, b){return a-b}).reverse()[0];
const currentFreeSpace = totalspace - currentOccupiedSpace;
const spaceRequired =  targetUnusedSpace - currentFreeSpace;

// Validate max
let deletableSums = [];
for (const [key, value] of Object.entries(calculatedParentDirs)) {
    if( value >= spaceRequired ){
        deletableSums.push(value);
    }
}

console.log( '0702: ' + deletableSums.sort(function(a, b){return a-b})[0] );