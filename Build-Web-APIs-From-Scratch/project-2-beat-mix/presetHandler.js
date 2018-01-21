// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:

// presetHandler takes up to three arguments.
// The first argument is a string representing the request type: 'GET' or 'PUT'. 
// The second argument is the array index of the presets array. 
// For 'PUT' requests, a third argument, newPresetArray will also be passed in, representing the new drum preset array to save at that index.
const presetHandler = (requestType, index, newPresetArray) => {
    
    switch(requestType) {
        case 'GET':
            if(presets[index]) {
                return [200, presets[index]];
            }
            else {
                return [404];
            }
            break;

        case 'PUT':
            if(presets[index]) {
                presets[index] = newPresetArray;
                return [200, presets[index]];
            }

            else {
                return [404];
            }
            break;

        default:
            console.error('Invalid request type');
            return [400];
            break;
    }
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
