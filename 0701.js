const fs = require('fs');
const input = fs.readFileSync('input/07_test.txt', 'utf8');
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

function getDirSizes( tree, dirs = {}, dir, parentDir ){

    if( parentDir === dir ){
        parentDir = '';
    }

    let parentPrefix = '';

    if( parentDir !== dir && parentDir !== '' ){
        parentPrefix = parentDir + '__';
    }

    Object.keys(tree).forEach(part => {

        // console.log({dirs, part});
        // console.log(tree[part]);

        if( typeof tree[part] === 'number' ){
            if( dirs[parentPrefix + dir] ){
                dirs[parentPrefix + dir] = dirs[parentPrefix + dir] + tree[part];
            } else {
                dirs[parentPrefix + dir] = tree[part];
            }
        } else {
            let innerDirSizes = null;
            if( dir !== part){
                // dirs = {...dirs, ...getDirSizes( tree[part], dirs, part, dir )};
                innerDirSizes = getDirSizes( tree[part], dirs, part, dir );
            } else if( dir === part ) {
                // dirs = {...dirs, ...getDirSizes( tree[part], dirs, dir, dir )};
                innerDirSizes = getDirSizes( tree[part], dirs, dir, dir )
            } else {
                // fail silently
            }

            dirs = { ...dirs, ...innerDirSizes };

            /*
            console.log({innerDirSizes});
            if( innerDirSizes[dir + '__' + part] ){
                dirs[parentPrefix + dir] = dirs[parentPrefix + dir] + innerDirSizes[dir + '__' + part];
            }
            */
        }
    });

    return dirs;
}

function traverseObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          // The current property is an object, so we traverse it
          traverseObject(obj[key]);
        } else {
          // The current property is not an object, so we can do something with it here
          //console.log(key + ': ' + obj[key]);
        }
      }
    }
  }

function getObjects(obj) {
    let objects = [];
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          objects = objects.concat(getObjects(obj[key]));
        } else {
          objects.push(obj[key]);
        }
      }
    }
  
    return objects;
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

function traverse( obj ) {
    let keys = [];
    let newKeys = [];
    console.log( "key" );
    for (const key in obj) {
        console.log( key );
    
        if (typeof obj[key] === "object") {
            // The property is an object, so we call the function recursively
        } else {
            newKeys = traverse(obj[key]);
        }
    }

    return [...newKeys];
}

/*
function traverse( obj, files = [] ) {
    const lastKey = obj[obj.length - 1];
    for (const key in obj) {
        console.log(key);
    
        if (typeof obj[key] === "object") {

            files = files.map(function (element, index, array) {
                console.log( element );
            });

            traverse(obj[key], files);
        } else {
            files.push({
                key: key,
                folders: [],
                size: obj[key]
            });
        }

        //if (key === lastKey) {
        //    folders = folders.arr.filter(e => e !== 'B');
        //}
        
    }

    return files;
}
*/

function getParentsOfKey(obj, key) {
    let parents = [];
  
    for (let prop in obj) {
      if (prop === key) {
        parents.push(obj);
      } else if (typeof obj[prop] === "object") {
        let subParents = getParentsOfKey(obj[prop], key);
        parents = parents.concat(subParents);
      }
    }
  
    return parents;
  }

// const dirSizes = getDirSizes( tree, {}, '/', '' );
// console.log( getObjects( tree ) );

// console.log( util.inspect(tree, false, null, true) );
// console.log( util.inspect(dirSizes, false, null, true) );

// console.log( traverseObject(tree) );

// console.log( traverse( tree ) );

function getNumericValuesAndKeys(obj, values = []) {
    for (let prop in obj) {
      if (typeof obj[prop] === "number") {
        values.push({ key: prop, value: obj[prop] });
      } else if (typeof obj[prop] === "object") {
        getNumericValuesAndKeys(obj[prop], values);
      }
    }
  
    return values;
  }

function getWrappedObjects(obj, wrappedObjects = []) {
    for (let prop in obj) {
        if (typeof obj[prop] === "object" && obj[prop].hasOwnProperty("g")) {
        wrappedObjects.push(obj);
        } else if (typeof obj[prop] === "object") {
        getWrappedObjects(obj[prop], wrappedObjects);
        }
    }

    return wrappedObjects;
}

function getKeyInfo(obj, parents = [], info = []) {
    for (let prop in obj) {
        if (typeof obj[prop] !== "object") {
            info.push({
            key: prop,
            value: obj[prop],
            parents: parents
            });
        } else if (typeof obj[prop] === "object") {
            getKeyInfo(obj[prop], parents.concat([prop]), info);
        }
    }

    return info;
}

function getParents(obj, key, parents = []) {
    const map = new Map();
  
    for (let prop in obj) {
      if (map.has(prop)) {
        const values = map.get(prop);
        values.push(obj[prop]);
        map.set(prop, values);
      } else {
        map.set(prop, [obj[prop]]);
      }
    }
  
    for (const [prop, values] of map.entries()) {
      if (prop === key) {
        return values.map(value => parents);
      }
  
      const results = [];
      for (const value of values) {
        if (typeof value === "object") {
          const result = getParents(value, key, parents.concat([prop]));
          if (result) {
            results.push(...result);
          }
        }
      }
  
      if (results.length > 0) {
        return results;
      }
    }
  
    return null;
  }

const uniqueObj = {};
function makeKeyUnique(obj, parents = []) {
    for (const [key, value] of Object.entries(obj)) {
        const uniqueKey = `${key}^${parents.join("^")}`;
        if (typeof value === "object") {
            uniqueObj[uniqueKey] = {};
            makeKeyUnique(value, parents.concat([key]));
        } else {
            uniqueObj[uniqueKey] = value;
        }
    }
}

// console.log( tree );
makeKeyUnique( tree );
// console.log( uniqueObj );

let dirs = {};
for(const key in uniqueObj){
    console.log( key );
    // console.log( uniqueObj[key] );
}

//const mappedFiles = getKeyInfo( tree );

// console.log( tree );
// console.log( tree );
// console.log( getKeyInfo( tree ) );

// console.log(  getParents( tree, 'e' ) );

/*
let folderValues = {};

for (let i = 0; i < mappedFiles.length; i++){
    const currentfile = mappedFiles[i];
    const parents = getParents( tree, currentfile['key'] );

    // console.log( currentfile['value'] );

    parents.forEach((parent) => {

        if( folderValues[parent] ){
            folderValues[parent] = folderValues[parent] + currentfile['value'];
        } else {
            folderValues[parent] = currentfile['value'];
        }
    });
}

console.log( folderValues );
*/

//console.log( mappedFiles[0]['key'] );
//console.log( getParentsOfKey( tree, mappedFiles[0]['key'] ) );

// Traverse all obj
// Same file values in filename key = {}

/*
let MaxValue = Object.values(dirSizes).sort((a,b) => a-b).reverse().filter((val) => val > 100000 ? false : true ).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
)


console.log('0701: ' + MaxValue );
*/