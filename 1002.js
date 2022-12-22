const fs = require('fs');
const txt = fs.readFileSync('input/10.txt', 'utf8');
const input = txt.split(/\n/);

let cycle = 0;
let value_x = 1;
const addx_cycle = 2;
let cyclePainting = '';

// Close enough

function updateCyclePainting( cycle, value_x, cyclePainting ){
    if( 
        cycle % 40 === value_x ||
        cycle % 40 === value_x -1 ||
        cycle % 40 === value_x +1
    ){
        cyclePainting = cyclePainting + '#';
    } else {
        cyclePainting = cyclePainting + '.';
    }

    if( cycle % 40 === 0 ){
        console.log( cyclePainting );
        cyclePainting = '';
    }

    return cyclePainting;
}

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

            // update sprite
            cyclePainting = updateCyclePainting( cycle, value_x, cyclePainting );
        }

    } else {
        // noop
        cycle = cycle + 1;

        // update sprite
        cyclePainting = updateCyclePainting( cycle, value_x, cyclePainting );
    }
}