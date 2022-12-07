const fs = require('fs');
const input = fs.readFileSync('input/07.txt', 'utf8');
const inputAsArray = input.split(/\r\n/); // start at root

let tree = {};
let currentDepth = [];

// Lodash function, from https://gist.github.com/guillotjulien/412974ac4731b9b95e2c1df6b3e97cb3
function set(object, path, value) {
    const decomposedPath = path.split('.');
    const base = decomposedPath[0];
    
    if (base === undefined) {
        return object;
    }

    // assign an empty object in order to spread object
    if (!object.hasOwnProperty(base)) {
        object[base] = {};
    }

    // Determine if there is still layers to traverse
    value = decomposedPath.length <= 1 ? value : set(object[base], decomposedPath.slice(1).join('.'), value);
    
    return {
        ...object,
        [base]: value,
    }
}

function addToTree( tree, currentDepth, targetName, targetValue ){

    // sorry
    targetName = targetName.replace('.', '_');

    if( !currentDepth.length ){
        tree[targetName] = targetValue;
        return tree;
    }

    const fixedDepth = currentDepth.reduce((acc, current) => (acc ? acc + '.' : '') + current, '') + '.' + targetName;

    return set(tree, fixedDepth, targetValue);
}

function getDirSizes( tree, dirs = [], dir ){

    Object.keys(tree).forEach(part => {

        if( typeof tree[part] === 'number' ){


            if( dirs[dir] ){
                dirs[dir] = dirs[dir] + tree[part];
            } else {
                dirs[dir] = tree[part];
            }
        } else {
            if( dir !== part){
                const partDirs = getDirSizes( tree[part], dirs, part );
                const dirValue = partDirs[part];

                if( dirs[dir] ){
                    dirs[dir] = dirs[dir] + dirValue;
                } else {
                    dirs[dir] = dirValue;
                }
            } else  {
                dirs = getDirSizes( tree[part], dirs, dir );
            }
        }
    });


    return dirs;
}

// Handle moves
for (let i = 0; i < inputAsArray.length; i++){

    if( inputAsArray[i] === '$ ls' ){
        // ls
        // skip
    } else if( inputAsArray[i] === '$ cd ..' ){
        currentDepth = currentDepth.slice(0, -1);

    } else if( inputAsArray[i].startsWith('$ cd ') ){
        // cd

        const folderName = inputAsArray[i].replace('$ cd ', '');

        currentDepth.push( folderName );

        if( !Object.keys(tree).length ){
            tree[folderName] = {};
        }

    }else if( inputAsArray[i].startsWith('dir ') ){
        // dir
        
        let folderName = inputAsArray[i].split(' ')[1];

        tree = addToTree( tree, currentDepth, folderName, {} );
        
    } else {
        // file
        const fileData = inputAsArray[i].split(' ');
        const fileName = fileData[1];
        const fileSize = parseInt( fileData[0] );

        tree = addToTree( tree, currentDepth, fileName, fileSize );
    }
}

const dirSizes = getDirSizes( tree, [], '/' );

let MaxValue = Object.values(dirSizes).sort((a,b) => a-b).reverse().filter((val) => val > 100000 ? false : true ).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
)

console.log('0701: ' + MaxValue );
