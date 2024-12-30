const fs = require('fs');
const input = fs.readFileSync('input/11.txt', 'utf8');
const lines = input.split(/\n/);
const inputData = lines[0];

const blinks = 25;
let stones = inputData.split(' ');

const runner = (runnerStones) => {
  let modifiedStones = [];
  runnerStones.forEach((stone, index) => {
    let appliedRule = false;

    if (stone === '0') {
      stone = '1';
      appliedRule = true;
    }

    if (stone.length % 2 === 0) {
      const half = stone.length / 2;

      stone = [
        parseInt(stone.slice(0, half)).toString(), 
        parseInt(stone.slice(half)).toString()
      ];

      appliedRule = true;
    }

    if(!appliedRule) {
      stone = (parseInt(stone) * 2024).toString();
    }

    if (Array.isArray(stone)) {
      stone.forEach((single) => {
        modifiedStones.push(single);
      });
    } else {
      modifiedStones.push(stone);
    }
  });

  stones = modifiedStones;
};

// main
for (let i = 0; i < blinks; i++) {
  runner(stones);
}

console.log(`1101: ${stones.length}`);
