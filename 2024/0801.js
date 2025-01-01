const fs = require('fs');
const input = fs.readFileSync('input/08.txt', 'utf8');
const lines = input.split(/\n/);

const mapWidth = lines[0].split('').length;
const mapHeight = lines.length;
const map = [];
const antennas = {};
const antiNodes = [];

// build map
lines.forEach((line, yi) => {
  line.split('').forEach((value, xi) => {
    map.push({x: xi, y: yi, value})
  });
});

const renderDebug = (debugMap) => {
  // Visual debug
  const xaxis = lines[0].split('').length;
  const yaxis = lines.length;
  let debugLines = '';

  for(let y = 0; y < yaxis; y++){
    for(let x = 0; x < xaxis; x++){

      // const current = debugMap.find((coord) => coord.x === x && coord.y === y)
      let lineBuffer = '.';

      // find default val
      lineBuffer = debugMap.find((coord) => coord.x === x && coord.y === y).value;

      debugLines += lineBuffer;
    }
    
    // add new row to debugLines
    debugLines += '\n';
  }

  console.log( debugLines );
};

// find all antennas
map.forEach((node) => {
  if( node.value !== '.'){

    if( !antennas[node.value] ){
      antennas[node.value] = [];
    }

    antennas[node.value].push({x: node.x, y: node.y});
  }
});

// start creating antinodes
Object.keys(antennas).forEach((antenna) => {

  console.log( {antenna} );
  console.log( antennas[antenna] );

  if(!antennas[antenna][1]){
    return;
  }

  if( antennas[antenna].length <= 1 ) {
    return;
  }

  antennas[antenna].forEach((node1) => {
    antennas[antenna].forEach((node2) => {
      if( node1 === node2 ){
        return;
      }

      const xDiff = node1.x - node2.x;
      const yDiff = node1.y - node2.y;

      console.log("");
      console.log({node1, node2});
      console.log({xDiff, yDiff});
      

      let antiNode1 = { x: node1.x + xDiff, y: node1.y + yDiff, value: '#' };
      let antiNode2 = { x: node2.x - xDiff, y: node2.y - yDiff, value: '#' };

      if(
        [node1.x, node1.y, node2.x, node2.y].includes(antiNode1.x) && 
        [node1.x, node1.y, node2.x, node2.y].includes(antiNode1.y)
      ){
        antiNode1 = false;
      }
      if(
        [node1.x, node1.y, node2.x, node2.y].includes(antiNode2.x) && 
        [node1.x, node1.y, node2.x, node2.y].includes(antiNode2.y)
      ){
        antiNode2 = false;
      }

      
      console.log({antiNode1, antiNode2});
      console.log("");
      

      if(antiNode1 && !antiNodes.find((node) => node.x === antiNode1.x && node.y === antiNode1.y)){
        antiNodes.push(antiNode1);
      }

      if(antiNode2 && !antiNodes.find((node) => node.x === antiNode2.x && node.y === antiNode2.y)){
        antiNodes.push(antiNode2);
      }
    });
  });
});

// clean antiNodes
const filteredAntiNodes = antiNodes.filter((node) => {
  if( node.x < 0 || node.y < 0 || node.x >= mapWidth || node.y >= mapHeight ){
    return false;
  }
  return true;
});

// remove duplicates
console.log( {filteredAntiNodes} );
console.log( filteredAntiNodes.length );

// create new map with antiNodes, but so that they can only be placed if a point in the map has the character .
const mapWithAntiNodes = [];

map.forEach((node) => {
  if( node.value === '.' ){
    // find if we have a antiNode at this position
    const antiNode = filteredAntiNodes.find((antiNode) => antiNode.x === node.x && antiNode.y === node.y);
    node.value = antiNode ? antiNode.value : '.';
  }

  mapWithAntiNodes.push(node);
});

renderDebug(mapWithAntiNodes);

console.log(`0801: ${filteredAntiNodes.length}`);