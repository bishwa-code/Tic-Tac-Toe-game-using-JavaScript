// comments are given aside to understand game logic better

let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-game-btn");
let resetBtn = document.querySelector("#reset-btn");
let displayWinner = document.querySelector(".display-winner");
let winnerMsg = document.querySelector("#winner-msg");


let turnX = true;     // set initial turn to Player'X'
let clickCount = 0; 

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], 
    [3, 4, 5],
    [6, 7, 8],
];

// this fuction checks for turn of the player and even change in text color of players  

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {    // player'X' & color=red & turn get changed
            box.innerText = "X";
            box.style.color = "#fc171f";
            turnX = false;
        } else {     // player'O' & color=green & turn get changed
            box.innerText = "O";
            box.style.color = "#00f110";
            turnX = true; 
        }
        clickCount+= 1;
        box.disabled = true;     // disable the box after click
        checkWinner();
        if (clickCount === 9 && displayWinner.classList.contains("hidden")) {
            drawGame();
        }
    });
});

const drawGame = () => {
    winnerMsg.innerText = "Game Draw";    //game draw mesage 
    displayWinner.classList.remove("hidden");    // to display the game draw message
};

// this function checks if any winning pattern is matched and show winner accordingly

const checkWinner = () => {
    for (let pattern of winPattern) {
        let box1 = boxes[pattern[0]].innerText;     // innerText of first box as per winPattern
        let box2 = boxes[pattern[1]].innerText;     // innerText of second box as per winPattern
        let box3 = boxes[pattern[2]].innerText;     // innerText of third box as per winPattern

        if (box1 != "" && box2 != "" && box3 != "") {
            if (box1 === box2 && box2 === box3) {
                showWinner(box1);      // function showWinner is called or invoked with an argument "box1"
                disableBoxes();      // disable the box after winner is congratulated 
            }
        }
    }
};

// below functions are used to print congratulation message for winning player and disable the boxes so that game is not continued further

const showWinner = (winner) => {
    winnerMsg.innerText = `Congratulations, Winner is ${winner}`;    //winner is congratulated 
    displayWinner.classList.remove("hidden");    // to display the congratulation message container
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;     // disable the boxes and now boxes didn't respond on click
    }
};

// below functions are used to reset a game and start a new game 

const newGame = () => {
    turnX = true;      // set initial turn to Player'X'
    clickCount = 0;   // set initial value of clickCount
    enableBoxes();     // enable the boxes and now boxes respond on click
    displayWinner.classList.add("hidden");     // to hide the congratulation message container
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";      // make the innerText of each box empty
    }
};

newGameBtn.addEventListener("click", newGame);   // new game button
resetBtn.addEventListener("click", newGame);     // reset game button
