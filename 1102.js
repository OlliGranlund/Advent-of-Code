const fs = require('fs');
const txt = fs.readFileSync('input/11.txt', 'utf8');
const inputs = txt.split(/[\r\n]{2,}/);

let monkeys = Array(inputs.length).fill([]);
let inspection = Array(inputs.length).fill(0);
let modulus = 1;

function removeEmptyOrDuplicates( array ){
    // removed zeros
    array = array.filter((item) => {
        if( item === null){
            return false;
        }

        return true;
    });

    return array;
}

for (let run = -1; run < 10000; run++) {
    for (let i = 0; i < inputs.length; i++) {

        // setup
        const lines = inputs[i].split('\n');

        const itemsLine = lines[1];
        const operationLine = lines[2];
        const testLine = lines[3];
        const trueLine = lines[4];
        const falseLine = lines[5];

        const items = itemsLine.split(':')[1].trim().split(',').map(Number);

        const operation = operationLine.split(':')[1].trim();
        const operationValues = operation.split('new = old')[1].trim().split(' ');
        const operator = operationValues[0];
        const operatorValue = operationValues[1];

        const trueDestination = trueLine.split(':')[1].trim().split(' ')[3];
        const falseDestination = falseLine.split(':')[1].trim().split(' ')[3];

        // const test = testLine.split(':')[1].trim();
        const testDivisible = parseInt( testLine.split('divisible by ')[1] );

        // init
        if( run < 0 ){
            monkeys[i] = [...items];

            modulus = modulus * testDivisible;
        } else {
            // run
            monkeys[i] = removeEmptyOrDuplicates( monkeys[i] );

            // forEach item
            monkeys[i].forEach( (item, index) => {
                let worryLevel = 0;

                inspection[i] = inspection[i] + 1;

                let runOperatorValue = 0;
                if( operatorValue === 'old' ){
                    runOperatorValue = item;
                } else {
                    runOperatorValue = parseInt( operatorValue );
                }

                switch (operator) {
                    case '+':
                        worryLevel = item + runOperatorValue;
                        break;
                    case '-':
                        worryLevel = item - runOperatorValue;
                        break;
                    case '*':
                        worryLevel = item * runOperatorValue;
                        break;
                    case '/':
                        worryLevel = item / runOperatorValue;
                        break;
                }

                worryLevel = worryLevel % modulus;

                // make item worthless
                monkeys[i][index] = null;

                // throw item
                if( worryLevel % testDivisible === 0 ){
                    monkeys[trueDestination].push( worryLevel );
                } else {
                    monkeys[falseDestination].push( worryLevel );
                }

            });

        }
    }
}

// last cleanup
for (let i = 0; i < inputs.length; i++) {
    monkeys[i] = removeEmptyOrDuplicates( monkeys[i] );
}

inspection = inspection.sort((a,b) => b-a);

console.log('1102: ' + (inspection[0] * inspection[1]) );