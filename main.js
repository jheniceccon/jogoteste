let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let mode = "friend"; // Default mode: friend

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Set the game mode
function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

// Make a move
function makeMove(cell, index) {
    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();

        if (isGameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            // Robot's turn
            if (mode === "robot" && currentPlayer === "O") {
                setTimeout(robotMove, 500);
            }
        }
    }
}

// Robot makes a random move
function robotMove() {
    let availableCells = board
        .map((val, idx) => (val === "" ? idx : null))
        .filter(val => val !== null);

    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let cell = document.querySelectorAll(".cell")[randomIndex];
        makeMove(cell, randomIndex);
    }
}

// Check for winner or draw
function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("result").textContent = `Jogador ${board[a]} venceu!`;
            isGameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("result").textContent = "Empate!";
        isGameActive = false;
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    document.getElementById("result").textContent = "";
    document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
}
