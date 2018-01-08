// Drum Arrays
let kicks = new Array(16).fill(false);
let snares  = new Array (16).fill(false);
let hiHats = new Array(16).fill(false);
let rideCymbals = new Array(16).fill(false);

// Takes two arguments: a string representing the array name ('kicks', 'snares', 'hiHats', or 'rideCymbals'), and an index number.
// This function should flip the boolean value in the correct array at the specified index.
function toggleDrum(drumArrayAsString, index) {

    // console.log(drumArrayAsString + ' is the string we are trying to manipulate');
    // console.log(index + ' is the index');

    if (!drumArrayAsString || !index) {
        // console.error('Arguments not specified.');
    }

    if(index > 16 || index < 0) {
        // console.error('index out of range');
    }

    
    switch(drumArrayAsString) {
        case 'kicks':
            if(kicks[index] === false) {
                kicks[index] = true;
            }
            else if(kicks[index] === true) {
                kicks[index] = false;
            }
            break;
        case 'snares':
            if(snares[index] === false) {
                snares[index] = true;
            }
            else if(snares[index] === true) {
                snares[index] = false;
            }
            break;  
        case 'hiHats':
            if(hiHats[index] === false) {
                hiHats[index] = true;
            }
            else if(hiHats[index] === true) {
                hiHats[index] = false;
            }
            break;   
        case 'rideCymbals':
            if(rideCymbals[index] === false) {
                rideCymbals[index] = true;
            }
            else if(rideCymbals[index] === true) {
                rideCymbals[index] = false;
            }
            break; 
        default:
            console.error('Kicks, snares, hiHats, or rideCymbals not specified');    
    }
}

// takes an array name string and sets all values in the correct array to false.
function clear(drumArray) {
    switch(drumArray) {
        case 'kicks':
            kicks.fill(false);
            break;
        case 'snares':
            snares.fill(false);
            break;  
        case 'hiHats':
            hiHats.fill(false);
            break;   
        case 'rideCymbals':
            rideCymbals.fill(false);
            break; 
        default:
            // console.log('Kicks, snares, hiHats, or rideCymbals not specified');    
    }
}

// takes an array name string and flips the boolean value of all elements in the correct array.
function invert(drumArray) {

}

// console.log(kicks);

// toggleDrum('kicks', 6);

// console.log(kicks);