const fs = require('fs');
const input = fs.readFileSync('input/11.txt', 'utf8');
const lines = input.split(/\n/);
const inputData = lines[0];

const blinks = 75;
let initialStones = inputData.split(' ');

const transform = (stone) => {
    if (stone === '0') {
        return ['1'];
    }

    if (stone.length % 2 === 0) {
        const half = stone.length / 2;

        return [
            parseInt(stone.slice(0, half)).toString(), 
            parseInt(stone.slice(half)).toString()
        ];
    }

    return [(parseInt(stone) * 2024).toString()];
}

const runner = (initialStones, blinks) => {
    let stoneCounts = {};

    // set initialStones to stoneCounts
    initialStones.forEach((stone) => {
        stoneCounts[stone] = (stoneCounts[stone] || 0) + 1;
    });

    const cache = new Map();

    for (let i = 0; i < blinks; i++) {
        const newCounts = {};

        Object.entries(stoneCounts).forEach(([stone, count]) => {
            let transformations;

            if (cache.has(stone)) {
                transformations = cache.get(stone);
            } else {
                transformations = transform(stone);
                cache.set(stone, transformations);
            }

            for (const transformedStone of transformations) {
                newCounts[transformedStone] = (newCounts[transformedStone] || 0) + count;
            }
        });

        stoneCounts = newCounts;
    }

    return stoneCounts;
};

const iteratedCounts = runner(initialStones, blinks);
let stoneCount = 0;

Object.values(iteratedCounts).forEach((value) => {
    stoneCount += parseInt(value);
});

//console.log({iteratedCounts});
//console.log({stoneCount});

// console.log( Object.values(iteratedCounts).reduce((sum, count) => sum * count, 0) );

console.log(`1102: ${Object.values(iteratedCounts).reduce((sum, count) => sum * count, 0)}`);

// 610296462905 too low
// 218811774248729 should be right
// 47905878489544