/* 
    GAME FUNCTION:
    - Player must guess a number between min and max
    - Player gets a certain amount of guess
    - Notify player of guess remainging
    - Notify the Player of correct answer if loose
    - Let Player choose to play again
*/


let min = 1, max = 10, winningNum = getRandomNum(min,max), guessesLeft = 3;

//UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;  

//Play again Event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    //Check if won
    if (guess === winningNum) {
        //Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!!!`);

    } else{
        //Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over - Lost
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
        } else{
            //Game Continues - answer wrong 

            //Change border color
            guessInput.style.borderColor = 'red';

            //Clear the input
            guessInput.value = '';

            //Tell user its the wrong number
            setMessage(`${guess} is not correct , ${guessesLeft} guesses left`,'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disable = true;
    //Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    //Set Message
    setMessage(msg); 

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    
}

// Get Winning Num
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg,color){
    message.style.color = color; 
    message.textContent = msg;
}
