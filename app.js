/*
// GAME RULES

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, isGamePlaying, previous,input;
newGame();
document.querySelector('.btn-roll').addEventListener('click', btnClick);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.svg').addEventListener('click', function(){
var value = document.querySelector('.finalValue').value;
if(value){
  input = value;
  document.querySelector('.enterInput').style.display = 'none';
  isGamePlaying = true;
}else{
  document.querySelector('.enterInput').style.display = 'block';
  isGamePlaying = false;
}
});


function btnClick() {  // what happens when roll dice is clicked
  if (isGamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1 ;
    if(dice === 6 && previous === 6){
      scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
        nextPlayer();
    }else{previous = dice;}

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice + '.png';
    if (dice != 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).innerHTML = roundScore + '';
    } else {
      nextPlayer();
    }

  }

}


function hold() {  // what happens when hold is clicked
  if (isGamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
    if (scores[activePlayer] >= input) {
        document.querySelector('.dice').style.display = 'none';
      document.querySelector('#name-' + activePlayer).innerHTML = 'WINNER!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      roundScore = 0;
      document.querySelector('#current-' + activePlayer).innerHTML = roundScore + '';
      isGamePlaying = false;
    } else {
      nextPlayer();
    }

  }

}



function nextPlayer() {  // to shift the active player to next player
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).innerHTML = roundScore + '';
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  previous = 0;
}

function newGame() {  // creates a new game
  scores = [0, 0];
  isGamePlaying = false;
  previous = 0;
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.finalValue').value = ''
  document.querySelector('.enterInput').style.display = 'none';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#current-0').innerHTML = '0';
  document.querySelector('#current-1').innerHTML = '0';
  document.querySelector('#score-0').innerHTML = '0';
  document.querySelector('#score-1').innerHTML = '0';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').innerHTML = 'PLAYER 1';
  document.querySelector('#name-1').innerHTML = 'PLAYER 2';
  document.querySelector('.enterInput').style.diplay = 'none';
}
