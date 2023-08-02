// first step: attatch even listeners (submit) to form to get data

//attach even listener (click) to each "game box"

//second step: initialize game

//third step: check wich game mode is active

//fourth step: set win conditions 

//fifth step: determin current player

// sixth step: after each move, check win condition and if not met, set other player as active

//sevent step: 1v1, easy ai, hard ai

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
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}

const initializeGame = (data) => {
    //initialize game variable
    initializeVar(data);


    //add event listener to the gameboard


}