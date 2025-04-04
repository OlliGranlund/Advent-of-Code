const fs = require('fs');
const input = fs.readFileSync('input/13.txt', 'utf8');
const lines = input.split(/\n/);

let sections = [];

let index = 0;
for( const line of lines ){
  if( line == '' ){
    index++;
    continue;
  }

  const splitted = line.split(' ');

  if( splitted[0] === 'Prize:' ){
    sections[index]['Prize'] = {
      x: parseInt(splitted[1].replace('X=', '')),
      y: parseInt(splitted[2].replace('Y=', ''))
    };
    continue;
  }

  if( ['A:', 'B:'].includes(splitted[1]) ){
    const target = splitted[1].replace(':', '');
    const valueX = parseInt(splitted[2].replace('X+', ''));
    const valueY = parseInt(splitted[3].replace('Y+', ''));

    if( !sections[index] ){
      sections[index] = {};
    }

    sections[index][target] = {
      x: valueX,
      y: valueY
    };
  }
}

function solver(a, b, target){

  // x1 * a + x2 * b = target
  // x1 + (x2 * b) / a = target / a
  // x1 = ( target / a ) - ( (x2 * b) / a )
  // x1 = ( target - (x2 * b) ) / a

  let solutions = [];

  const maxTries = 100;
  for( let x2 = 0; x2 < maxTries; x2++ ){
    const x1 = ( target - (x2 * b) ) / a;

    if( x1 % 1 === 0 ){
      solutions.push({'a': x1, 'b': x2});
    }
  }

  return solutions;
}

let commonResults = [];

index = 0;
for( const section of Object.values(sections)){

  const xResults = solver(section['A'].x, section['B'].x, section['Prize'].x);
  const yResults = solver(section['A'].y, section['B'].y, section['Prize'].y);

  const combinedResults = xResults.filter(obj1 => yResults.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));

  commonResults.push(combinedResults)

  index++;
}

let optimizedTokens = 0;
const aRatio = 3;
const bRatio = 1;

for( const result of commonResults ){
  if( !result.length ){
    continue;
  }

  let potentialTokenPrices = [];
  for( const res of result ){
    potentialTokenPrices.push( res.a * aRatio + res.b * bRatio);
  }

  optimizedTokens += Math.min(...potentialTokenPrices);
}

console.log(`1301: ${optimizedTokens}`);