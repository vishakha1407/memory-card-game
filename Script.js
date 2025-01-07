// script.js

const cardImages = ['🍕', '🐼', '🐳', '🍰', '🐒', '🐥', '🍔', '🦄']; // You can add more images
let gameCards = [];
let flippedCards = [];
let moveCount = 0;
let timerInterval;
let timeTaken = 0;

const cardGrid = document.querySelector('.card-grid');
const movesCountDisplay = document.getElementById('moves-count');
const timerDisplay = document.getElementById('timer');
const newGameButton = document.getElementById('new-game');

// Initialize the game with shuffled cards
function startNewGame() {
  // Reset game variables
  gameCards = [...cardImages, ...cardImages]; // Duplicate images for pairs
  gameCards = shuffle(gameCards); // Shuffle cards

  flippedCards = [];
  moveCount = 0;
  timeTaken = 0;

  movesCountDisplay.textContent = moveCount;
  timerDisplay.textContent = timeTaken;
  clearInterval(timerInterval);

  // Clear the grid and create new cards
  cardGrid.innerHTML = '';
  gameCards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    
    const front = document.createElement('div');
    front.classList.add('card-front');
    
    const back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = image;

    card.appendChild(front);
    card.appendChild(back);
    cardGrid.appendChild(card);
    
    // Add event listener for card click
    card.addEventListener('click', () => flipCard(card));
  });

  // Start the timer
  timerInterval = setInterval(() => {
    timeTaken++;
    timerDisplay.textContent = timeTaken;
  }, 1000);
}

// Shuffle function to randomize the card order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip a card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moveCount++;
      movesCountDisplay.textContent = moveCount;

      // Check if the two flipped cards match
      setTimeout(() => {
        checkMatch();
      }, 500);
    }
  }
}

// Check if the two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector('.card-back').textContent === card2.querySelector('.card-back').textContent) {
    flippedCards = [];
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    flippedCards = [];
  }

  // Check if the game is won
  if (document.querySelectorAll('.card.flipped').length === gameCards.length) {
    setTimeout(() => {
      alert(`Congratulations! You completed the game in ${moveCount} moves and ${timeTaken} seconds.`);
      clearInterval(timerInterval);
    }, 500);
  }
}

// Initialize the game when the page loads
window.onload = startNewGame;

// Event listener for the "New Game" button
newGameButton.addEventListener('click', startNewGame);


// Select the Theme Toggle Button
const themeToggleButton = document.querySelector('.theme-toggle');

// Check if there's a saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme'); // Apply dark theme if saved
  themeToggleButton.textContent = 'Switch to Light Theme';
}

// Add Event Listener for Toggle Button
themeToggleButton.addEventListener('click', () => {
  // Toggle the 'dark-theme' class on the body
  document.body.classList.toggle('dark-theme');
  
  // Update Button Text
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleButton.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  
  // Save the preference in localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

