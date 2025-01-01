const fs = require('fs');
const input = fs.readFileSync('input/12.txt', 'utf8');
const lines = input.split(/\n/);

const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ];
  
  
const buildMap = () => {
    const buildMap = [];
    lines.forEach((line) => {
        buildMap.push(line.split(''));
    });

    return buildMap;
};

const origMap = buildMap();

const bfs = (start, map, visited) => {
    const queue = [start];
    const section = [];
    const startValue = map[start.y][start.x];
  
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const key = `${x},${y}`;
  
      if (visited.has(key)) {
        continue;
      }
  
      visited.add(key);
      section.push({ x, y });
  
      for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;
        const newKey = `${newX},${newY}`;
  
        if (
          newX >= 0 && newX < map[0].length &&
          newY >= 0 && newY < map.length &&
          map[newY][newX] === startValue &&
          !visited.has(newKey)
        ) {
          queue.push({ x: newX, y: newY });
        }
      }
    }
  
    return section;
};
  

const floodFill = (map) => {
    const visited = new Set();
    const floodSections = [];
  
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (!visited.has(`${x},${y}`)) {
          const section = bfs({ x, y }, map, visited);
          floodSections.push(section);
        }
      }
    }
  
    return floodSections;
};

const calculateFenceLength = (sections) => {
    let fenceLength = 0;

    sections.forEach((section) => {
        section.forEach(({ x, y }) => {
            for (const { dx, dy } of directions) {
                const newX = x + dx;
                const newY = y + dy;

                let fence = false;

                if( !section.find((coord) => coord.x === newX && coord.y === newY) ){
                    fence = true;
                    fenceLength++;
                }
            }
        });

        return fenceLength;
    });
  
    return fenceLength;
};

const calculateFencePrice = (map, sections) => {
    let totalPrice = 0;

    sections.forEach((section) => {
        const area = section.length;
        const fenceLength = calculateFenceLength([section]);
        const price = area * fenceLength;
        totalPrice += price;
    });

    return totalPrice;
};

const floodSections = floodFill(origMap);
const fencePrice = calculateFencePrice(origMap, floodSections);

console.log(`1201: ${fencePrice}`);