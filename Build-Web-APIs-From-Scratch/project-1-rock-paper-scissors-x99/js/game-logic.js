// All code should be written in this file.
let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;

let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;

let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;

let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;

const rock = 'rock';
const scissors = 'scissors';
const paper = 'paper';

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    
    // Check if move type is missing
    if (!player || !moveOneType || !moveOneValue || !moveTwoType || !moveTwoValue || !moveThreeType || !moveThreeValue) {
        console.error('Argument is not supplied.');
        return;
    }

    if(moveOneType === undefined || moveTwoType === undefined || moveThreeType == undefined) {
        return;
    }

    // should not set moves if an invalid move type is supplied
    if (!isValidMoveType(moveOneType) ||
        !isValidMoveType(moveTwoType) ||
        !isValidMoveType(moveThreeType)) {
            return;
    }

    // should not set moves if any move values are less than one
    // should not set moves if any move values are greater than ninety-nine
    if (!(moveOneValue >= 1) && (moveOneValue <= 99) ||
        !(moveTwoValue >= 1) && (moveTwoValue <= 99) ||
        !(moveThreeValue >= 1) && (moveThreeValue <= 99)) {
        return;
    }

    // should not set moves if move values sum to more than ninety-nine
    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
    }

    if(player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    }
    else if(player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
};

function isValidMoveType(moveType) {
    return (moveType === 'rock') ||
           (moveType === 'paper') ||
           (moveType === 'scissors');
}

const getRoundWinner = (round) => {
    // compare player move types and values and return appopriate winner
    const r1 = determineRoundWinner(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
    const r2 = determineRoundWinner(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
    const r3 = determineRoundWinner(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);

    // Check if any arguments are null
    if(!playerOneMoveOneType || !playerTwoMoveOneType || !playerOneMoveOneValue || !playerTwoMoveOneValue) {
        return null;
    }

    // Arguments are all valid
    else {
        if (round === 1) return r1;
        else if (round === 2) return r2;
        else if (round === 3) return r3;
        else return null;
    }
};

const determineRoundWinner = (playerOneMoveType, playerTwoMoveType, playerOneMoveValue, playerTwoMoveValue) => {
    if(playerOneMoveType == rock) {

        if(playerTwoMoveType == rock) {
            if(playerOneMoveValue > playerTwoMoveValue) {
                return 'Player One';
            }
            else if (playerOneMoveValue < playerTwoMoveValue){
                return 'Player Two';
            }
            else {
                return 'Tie';
            }
        }

        else if(playerTwoMoveType == scissors) {
            return 'Player One';
        }

        else if (playerTwoMoveType == paper) {
            return 'Player Two';
        }

        else {
            return 'Tie';
        }
    }

    else if(playerOneMoveType == paper) {
        
        if(playerTwoMoveType == paper) {
            if(playerOneMoveValue > playerTwoMoveValue) {
                return 'Player One';
            }
            else if (playerOneMoveValue < playerTwoMoveValue){
                return 'Player Two';
            }
            else {
                return 'Tie';
            }
        }

        else if(playerTwoMoveType == rock) {
            return 'Player One';
        }
        else if (playerTwoMoveType == scissors) {
            return 'Player Two';
        }
        else {
            return 'Tie';
        }
    }

    else if (playerOneMoveType == scissors) {
        
        if(playerTwoMoveType == scissors) {
            if(playerOneMoveValue > playerTwoMoveValue) {
                return 'Player One';
            }
            else if (playerOneMoveValue < playerTwoMoveValue){
                return 'Player Two';
            }
            else {
                return 'Tie';
            }
        }
        
        else if(playerTwoMoveType == paper) {
            return 'Player One';
        }
        else if (playerTwoMoveType == rock) {
            return 'Player Two';
        }
        else {
            return 'Tie';
        }
    }
};

const getGameWinner = () => {
    // compare both players move types and value for hte whole game and return appripriate winner

    // stores a string with the winner
    const round1 = getRoundWinner(1); 
    const round2 = getRoundWinner(2);
    const round3 = getRoundWinner(3);

    let playerOneWonCount = 0;
    let playerTwoWonCount = 0;

    incrementWinnerCountForPlayer(round1);
    incrementWinnerCountForPlayer(round2);
    incrementWinnerCountForPlayer(round3);

    function incrementWinnerCountForPlayer(round) {
        // Check if player one won a round
        if(round == 'Player One') {
            playerOneWonCount++;
        } 

        // Check if player two won a round
        else if(round == 'Player Two') {
            playerTwoWonCount++;
        }
        else if(round == 'Tie') {

        }
    }

    console.log(playerOneWonCount);
    console.log(playerTwoWonCount);

    // Let user know who won the entire game
    if(playerOneWonCount > playerTwoWonCount) {
        console.log('player one won');
        return 'Player One';
    }

    else if(playerOneWonCount < playerTwoWonCount) {
        console.log('player two won');
        return 'Player Two';
    }

    else if(playerOneWonCount === 0 && playerTwoWonCount === 0) {
        return null;
    }

    else if(playerOneWonCount === playerTwoWonCount) {
        console.log("tie!");
        return 'Tie';
    }

};

const p1 = setPlayerMoves(1, 'rock', 30, 'rock', 30, 'rock', 30);
const p2 = setPlayerMoves(2, 'paper', 30, 'paper', 30, 'paper', 30);

getGameWinner();