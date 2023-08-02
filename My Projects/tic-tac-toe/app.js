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

const form = document.querySelector("#myform")

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
}

const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data)
        })
    })
}

const initializeGame = (data) => {
    //initialize game variable
    adjustDom('displayTurn', `${displayTurnText}'s turn`);
    initializeVar(data);
    
    //add event listener to the gameboard
    addEventListenerToGameBoard(data);

}

const playMove = (box, data) => {
    //is game over? If game over, don't do anything
    if (data.gameOver || data.round > 8) {
        return;
    }
    //check if game box has a letter in it, if so then don't do anything
    if(data.board[box.id] === "X" || data.board[box.id] === "O") {
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
        easyAimove(data);
        data.currentPlayer = "X"
        //change back to player1
    }
    };

    const endConditions = (data) => {
        //3 options
        //winner
        //tie
        //game not over yet
        if(checkWinner(data)) {
            //adjust the dom to reflect win
            let winnerName = data.currentPlayer === "X" ? data.player1Name ? data.player2Name;
           adjustDom("displayTurn", winnerName + " has won the game!");
            return true
        } else if (data,round === 9) {
            adjustDom("displayTurn", "It's a tie!");
            data.gameOver = true;
            //adjust the dom to reflect tie
            return true
        }
        return false
    };

    const checkWinner = (data) => {
        let result = false;
        winCondition.foreach(condition => {
            if(
                data.board[condition[0]] === data.board[condition[1]] &&
                data.board[condition[1]] === data.board[condition[2]]
            ) {
                data.gameOver = true;
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
        setTimeout( () => {
            let availableSpaces = data.board.filter(
                space => space !== "X" && space !== "O"
                );
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
