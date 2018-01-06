// Drum Arrays
let kicks = new Array(16);
let snares  = new Array (16);
let hiHats = new Array(16);
let rideCymbals = new Array(16);

// Push false to arrays
kicks.forEach(function(kick) {
    kick.push(false);
});

snares.forEach(function(kick) {
    snares.push(false);
});

hiHats.forEach(function(kick) {
    hiHats.push(false);
});

rideCymbals.forEach(function(kick) {
    rideCymbals.push(false);
});

// Takes two arguments: a string representing the array name ('kicks', 'snares', 'hiHats', or 'rideCymbals'), and an index number.
// This function should flip the boolean value in the correct array at the specified index.
function toggleDrum(drumArray, index) {

}

// takes an array name string and sets all values in the correct array to false.
function clear(drumArray) {

}

// takes an array name string and flips the boolean value of all elements in the correct array.
function invert(drumArray) {

}

