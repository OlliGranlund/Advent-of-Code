const fs = require('fs');
const input = fs.readFileSync('input/07.txt', 'utf8');
const inputAsArray = input.split(/\n/).slice(1); // start at root

let tree = [];
let currentDepth = [];


function addToTree( tree, currentDepth, targetName, targetValue ){

    let tempTree = tree;
    for (let i = 0; i < currentDepth.length; i++){
        tempTree[currentDepth[i]]
        if( currentDepth.length -1 === i){
            tempTree[currentDepth[i]]
        }
        // combine
    }

    return tree;
}

// Handle moves
for (let i = 0; i < inputAsArray.length; i++){
    if( inputAsArray[i] === '$ ls' ){
        // ls
        // skip
    } else if( inputAsArray[i] === '$ cd ..' ){

        currentDepth.slice(0, -1);

    } else if( inputAsArray[i].startsWith('$ cd ') ){
        // cd

        // folder name
        const folderName = inputAsArray[i].replace('$ cd ', '');

        currentDepth.push( folderName );

    }else if( inputAsArray[i].startsWith('dir ') ){
        // dir
        
        // get folder name
        let folderName = inputAsArray[i].split(' ')[1];

        if( currentDepth.length ){
            tree = addToTree( tree, currentDepth, folderName, {} );
        } else {
            tree[folderName] = {};
        }
        
    } else {
        // file
        const fileData = inputAsArray[i].split(' ');
        const fileName = fileData[1];
        const fileSize = parseInt( fileData[0] );

        if( currentDepth.length ){
            tree = addToTree( tree, currentDepth, fileName, fileSize );
        } else {
            tree[fileName] = fileSize;
        }
    }

    // console.log( tree );
}

console.log( tree );

console.log('0701: ' );