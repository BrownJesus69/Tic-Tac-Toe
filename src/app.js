// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O';
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// DOM elements
const gameButtons = document.querySelectorAll('.game-button');
const resetButton = document.getElementById('resetButton');
const newGameButton = document.getElementById('newGameButton');
const messageContainer = document.getElementById('messageContainer');
const winnerMessage = document.getElementById('winnerMessage');
const winLine = document.getElementById('winLine'); // Ensure this exists in your HTML

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    // Add event listeners to game buttons
    gameButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            handleButtonClick(index);
        });
    });
    
    // Add event listeners to control buttons
    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', resetGame);
}

function handleButtonClick(index) {
    // Prevent clicking if game is over or button already clicked
    if (gameOver || board[index] !== '') {
        return;
    }
    
    // Make the move
    board[index] = currentPlayer;
    const button = gameButtons[index];
    button.textContent = currentPlayer;
    button.disabled = true;
    
    // Add player-specific styling
    if (currentPlayer === 'O') {
        button.classList.add('player-o');
    } else {
        button.classList.add('player-x');
    }
    
    // Check for winner
    const winPattern = checkWinner();
    if (winPattern) {
        showWinLine(winPattern); // Draw the winning line
        endGame(`Player ${currentPlayer} Wins!`);
        return;
    }
    
    // Check for draw
    if (checkDraw()) {
        endGame('Match Drawn!');
        return;
    }
    
    // Switch players
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
}

function checkWinner() {
    // Loop through all possible win patterns
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        // Check if all three cells match and are not empty
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // Return winning pattern (e.g., [0, 1, 2])
        }
    }
    return null;
}

function checkDraw() {
    // If all cells are filled and no winner, it's a draw
    return board.every(cell => cell !== '');
}

function endGame(message) {
    gameOver = true;
    
    // Set the winner message
    winnerMessage.textContent = message;
    
    // Show the message container
    messageContainer.classList.remove('hide');
    
    // Disable all remaining buttons
    gameButtons.forEach(button => {
        button.disabled = true;
    });
}

function showWinLine(pattern) {
    winLine.className = 'win-line'; // reset classes
    if (pattern[0] === 0 && pattern[1] === 1 && pattern[2] === 2) winLine.classList.add('win-row-0');
    else if (pattern[0] === 3 && pattern[1] === 4 && pattern[2] === 5) winLine.classList.add('win-row-1');
    else if (pattern[0] === 6 && pattern[1] === 7 && pattern[2] === 8) winLine.classList.add('win-row-2');
    else if (pattern[0] === 0 && pattern[1] === 3 && pattern[2] === 6) winLine.classList.add('win-col-0');
    else if (pattern[0] === 1 && pattern[1] === 4 && pattern[2] === 7) winLine.classList.add('win-col-1');
    else if (pattern[0] === 2 && pattern[1] === 5 && pattern[2] === 8) winLine.classList.add('win-col-2');
    else if (pattern[0] === 0 && pattern[1] === 4 && pattern[2] === 8) winLine.classList.add('win-diag-0');
    else if (pattern[0] === 2 && pattern[1] === 4 && pattern[2] === 6) winLine.classList.add('win-diag-1');
    winLine.style.display = 'block';
}

function resetGame() {
    // Reset game state
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'O';
    gameOver = false;
    
    // Reset buttons
    gameButtons.forEach(button => {
        button.textContent = '';
        button.disabled = false;
        button.classList.remove('player-o', 'player-x');
    });
    
    // Hide message container
    messageContainer.classList.add('hide');
    winnerMessage.textContent = '';

    // Hide the winning line
    winLine.style.display = 'none';
    winLine.className = '';
}
