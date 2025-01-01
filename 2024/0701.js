const fs = require('fs');
const input = fs.readFileSync('input/07.txt', 'utf8');
const lines = input.split(/\n/);

let total = 0;
const operators = ['+', '*'];

// setup rules and pages
lines.forEach((line) => {

  // console.log(line);

  const parts = line.split(' ');
  const targetSum = parseInt(parts[0].replace(':', ''));
  parts.shift();
  const calcValues = parts.map((part) => parseInt(part));

  // do all potential calc operations to the calcValues with different operators
  const calcResults = [];

  const generateResults = (values, currentResult = values[0], index = 1) => {
    if (index === values.length) {
      calcResults.push(currentResult);
      return;
    }
    operators.forEach((operator) => {
      const calcString = `${currentResult} ${operator} ${values[index]}`;
      const result = eval(calcString);
      generateResults(values, result, index + 1);
    });
  };

  generateResults(calcValues);

  if( calcResults.includes(targetSum) ){
    console.log(targetSum);
    total += targetSum
  }
});

console.log(`0701: ${total}`);