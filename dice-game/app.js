/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Dice roll
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display result
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice-2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // Update round score IF the rolled number was NOT a 1
    if(dice !== 1 && dice2 !== 1) {
      //Add score
      var scoreSum = dice + dice2;
      roundScore += scoreSum;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});


// Update scores
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add CURRENT score tp GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    var playerSetScore = document.querySelector('.scoreInput').value;
    var winningScore;

    if(playerSetScore) {
      winningScore = playerSetScore;
    } else {
      winningScore = 100;
    }

    if(scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      noDiceDisplay();
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  noDiceDisplay();
}

document.querySelector('.btn-new').addEventListener('click', init);

function noDiceDisplay() {
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  noDiceDisplay();

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
