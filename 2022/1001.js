const fs = require('fs');
const txt = fs.readFileSync('input/10.txt', 'utf8');
const input = txt.split(/\n/);

let cycle = 1;
let value_x = 1;
const addx_cycle = 2;

let sums = [];

for (let i = 0; i < input.length; i++) {

    if( input[i].includes('addx ') ){

        const addx_value = parseInt( input[i].split(' ')[1] );

        // addx
        for (let i = 0; i < addx_cycle; i++) {
            cycle = cycle + 1;

            // add value if last
            if( i === addx_cycle - 1){
                value_x = value_x + addx_value;
            }

            // check cycle status
            if( ( cycle + 20) % 40 === 0 ){
                sums.push( cycle * value_x );
            }
        }

    } else {
        // noop
        cycle = cycle + 1;

        if( ( cycle + 20) % 40 === 0 ){
            sums.push( cycle * value_x );
        }
    }
}

console.log('1001: ' + sums.reduce((a, b) => a + b, 0) );