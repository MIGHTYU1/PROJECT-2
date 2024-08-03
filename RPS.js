// Cache the DOM and reset everything to 0 value
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const reset_button = document.getElementById('reset');

// Set up the core function for the computer that will use Math.random to loop through an array and return that value
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

// Similar to convertCase but just takes lowercase and replaces with titlecase
function convertCase(anythingIwant) {
  if (anythingIwant === 'paper') return 'Paper';
  if (anythingIwant === 'scissors') return 'Scissors';
  return 'Rock';
}

// Winning condition
function win(user, computer) {
  userScore++;
  userScore_span.innerHTML = userScore;
  const userName = ' (You)'.fontsize(3).sup();
  const compName = ' (Bot)'.fontsize(3).sup();
  result_div.innerHTML = `<p>${convertCase(user)}${userName} beats ${convertCase(computer)}${compName}. You win!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('winningStyles');
  setTimeout(() => roundStatus.classList.remove('winningStyles'), 300);
}

// Losing condition
function loses(user, computer) {
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  const userName = ' (You)'.fontsize(3).sup();
  const compName = ' (Bot)'.fontsize(3).sup();
  result_div.innerHTML = `<p>${convertCase(computer)}${compName} beats ${convertCase(user)}${userName}. You lose!</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('losingStyles');
  setTimeout(() => roundStatus.classList.remove('losingStyles'), 300);
}

// Draw condition
function draw(user, computer) {
  const userName = ' (You)'.fontsize(3).sup();
  const compName = ' (Bot)'.fontsize(3).sup();
  result_div.innerHTML = `<p>It was a draw! You both chose ${convertCase(user)}</p>`;
  const roundStatus = document.getElementById(user);
  roundStatus.classList.add('drawStyles');
  setTimeout(() => roundStatus.classList.remove('drawStyles'), 300);
}

// The core game functions that set up and determine the game's actual logic
function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case 'paperrock':
    case 'rockscissors':
    case 'scissorspaper':
      win(userChoice, computerChoice);
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      loses(userChoice, computerChoice);
      break;
    case 'rockrock':
    case 'scissorsscissors':
    case 'paperpaper':
      draw(userChoice, computerChoice);
      break;
  }
}

// Add event listeners to choices
function main() {
  rock_div.addEventListener('click', () => game('rock'));
  paper_div.addEventListener('click', () => game('paper'));
  scissors_div.addEventListener('click', () => game('scissors'));
}

// Reset game function
function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_div.innerHTML = '<p>Make your move!</p>';
}

reset_button.addEventListener('click', resetGame);

// Initialize game
main();
