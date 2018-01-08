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
            flipSingleDrumBit(kicks, index);
            break;
        case 'snares':
            flipSingleDrumBit(snares, index);
            break;  
        case 'hiHats':
            flipSingleDrumBit(hiHats, index);
            break;   
        case 'rideCymbals':
            flipSingleDrumBit(rideCymbals, index);
            break; 
        default:
            console.error('Kicks, snares, hiHats, or rideCymbals not specified');    
    }
}

function flipSingleDrumBit (array, index) {
    if(array[index] === false) {
        array[index] = true;
    }
    else if(array[index] === true) {
        array[index] = false;
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