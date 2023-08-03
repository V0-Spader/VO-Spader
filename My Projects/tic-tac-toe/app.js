// first step: attatch even listeners (submit) to form to get data

//attach even listener (click) to each "game box"

//second step: initialize game

//third step: check wich game mode is active

//fourth step: set win conditions 

//fifth step: determin current player

// sixth step: after each move, check win condition and if not met, set other player as active

//sevent step: 1v1, easy ai, hard ai

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const form = document.querySelector("#myform");
const newGameBtn = document.querySelector("#restartBtn");

const resetGameBtn = document.querySelector("#resetBtn");

newGameBtn.addEventListener("click", () => {
    location.reload();
});

form.addEventListener('submit', (event) => {
    //prevent page efresh
    event.preventDefault();

    //initializes user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modalWrapper").setAttribute("hidden", true);
    initializeGame(data)
});

const initializeVar = (data) => {
    data.choice = +data.choice;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

const resetDom = () => {
    document.querySelectorAll(".box").forEach((box) => {
        box.className = "box";
        box.textContent = "";
    });
};

const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data)
        });
    });
    resetGameBtn.addEventListener("click", () => {
        initializeVar(data);
        resetDom();
        adjustDom("displayTurn", `${data.player1Name}'s turn`);
    });
};

const initializeGame = (data) => {
    //initialize game variable
    adjustDom('displayTurn', `${data.player1Name}'s turn`);
    initializeVar(data);
    
    //add event listener to the gameboard
    addEventListenerToGameBoard(data);

};

const playMove = (box, data) => {
    //is game over? If game over, don't do anything
    if (data.gameOver || data.round > 8) {
        return;
    }
    //check if game box has a letter in it, if so then don't do anything
    if (data.board[box.id] === "X" || data.board[box.id] === "O") {
        return;
    }
    
    //adjust the DOM for fplayer move, and then check win consition
    
    data.board[box, id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
    //increse the round #
    data.round++;
    
    //check end conditions
    if(endConditions(data)) {
        return;
    }

    //change current player
    //change dom, and change data.currentplayer
    if(data.choice === 0) {
        changePlayer(data);
    } else if (data.choice === 1) {
        //easy ai
        easyAiMove(data);
        data.currentPlayer = "X"
        //change back to player1
    } else if (data.choice === 2) {
        changePlayer(data);
        hardAiMove(data);
        if (endConditions(data)) {
            return;
        }
        changePlayer(data);
    }
    };

    const endConditions = (data) => {
        //3 options
        //winner
        //tie
        //game not over yet
        if(checkWinner(data, data.currentPlayer)) {
            //adjust the dom to reflect win
            let winnerName = 
            data.currentPlayer === "X" ? data.player1Name : data.player2Name;
           adjustDom("displayTurn", winnerName + " has won the game!");
            return true;
        } else if (data,round === 9) {
            adjustDom("displayTurn", "It's a tie!");
            data.gameOver = true;
            //adjust the dom to reflect tie
            return true;
        }
        return false;
    };

    const checkWinner = (data, player) => {
        let result = false;
        winCondition.foreach((condition) => {
            if(
                data.board[condition[0]] === player &&
                data.board[condition[1]] === player &&
                data.board[condition[2]] === player
            ) {
                result = true;
            }
        });
        return result;
    };

    const adjustDom = (className, textContent) => {
      const element =  document.querySelector(`.${className}`)
      element.textContent = textContent;
    };

    const changePlayer = (data) => {
        data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
        //adjust the dom
        let displayTurnText = 
        data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", `${displayTurnText}'s turn`);
    };

    const easyAiMove = (data) => {
        changePlayer(data);

        data.round++;

        setTimeout( () => {
            let availableSpaces = data.board.filter(
                (space) => space !== "X" && space !== "O");
            let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
             data.board[move] = data.player2;
             let box = document.getElementById(`${move}`);
             box.textContent = data.player2;
             box.classList.add("player2");
        }, 300);
      
        if (endConditions(data)) {
            return;
        }

        changePlayer(data);
    };

    const hardAiMove = (data) => {
        data.round++;
        //get best possible move from minmac algorithm
        const move = minmax(data, "O").index;
        data.board[move] = data.player2;
        let box = document.getElementById(`${move}`);
        box.textContent = data.player2;
        box.classList.add("player2");
    };

    const minmax = (data, player) => {
        let availableSpaces = data.board.filter((space) => space !== "X" && space !== "O");
        if (checkWinner(data, data.player1)) {
            return{
                score: -100,
            };
        } else if (checkWinner(data, data.player2)) {
            return {
                score: 100,
            };
        } else if (availableSpaces.length === 0) {
            return {
                score: 0,
            };
        }
        //check if player 1 wins set score to -100
        //if tie, set score to 0
        //if win set score to 100
        const potentialMoves = [];
        //loop oivert available spaces to get a lsit of all potential moves and check if win
        for (let i = 0; i < availableSpaces.length; i++) {
            let move = {};
            move.index = data.board[availableSpaces[i]];
            data.board[availableSpaces[i]] = player;
            if (player === data.player2) {
                move.score = minmax(data, data.player1).score;
            } else {
                move.score = minmax(data, data.player2).score;
            }
            //reset the move on the board
            data.board[availableSpaces[i]] = move.index;
            //push the potential move to the array
            potentialMoves.push(move);
        }
        let bestMove = 0;
        if (player === data.player2) {
            let bestScore = -10000;
            for (let i = 0; i < potentialMoves.length; i++) {
                if (potentialMoves[i].score > bestScore) {
                    bestScore = potentialMoves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i =0; i < potentialMoves.length; i++) {
                if (potentialMoves[i].score < bestScore) {
                    bestScore = potentialMoves[i].score;
                    bestMove = i;
                }
            }
        }
        return potentialMoves[bestMove];
    };
