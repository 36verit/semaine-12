var board = new Array(9);
 
function init() {
 
  var down = "mousedown"; var up = "mouseup"; 
  if ('createTouch' in document) { down = "touchstart"; up ="touchend"; }
  
  
  document.querySelector("input.button").addEventListener(up, newGame, false);
  var squares = document.getElementsByTagName("td");
  for (var s = 0; s < squares.length; s++) {
    squares[s].addEventListener(down, function(evt){squareSelected(evt, getCurrentPlayer());}, false);
  }
  
  /* creation joueur initial et board */
  createBoard();
  setInitialPlayer();
}
 
 

function createBoard() {
 
 
  if (window.localStorage && localStorage.getItem('tic-tac-toe-board')) {
    
    
    board = (JSON.parse(localStorage.getItem('tic-tac-toe-board')));
    for (var i = 0; i < board.length; i++) {
      if (board[i] != "") {
        fillSquareWithMarker(document.getElementById(i), board[i]);
      }
    }
  }
  
  else {  
    for (var i = 0; i < board.length; i++) {
      board[i] = "";                               
      document.getElementById(i).innerHTML = "";
    }
  }
}
 
/*** appel de cette fonction a chaque fois qu'un carré est cliqué ***/
function squareSelected(evt, currentPlayer) {
  var square = evt.target;
  /* Vérifie si le carré contient déjà un x ou un o */
  if (square.className.match(/marker/)) {
    alert("Cet espace est pris, en choisir un autre !.");
    return;
  }else {
    fillSquareWithMarker(square, currentPlayer);
    updateBoard(square.id, currentPlayer);
    checkForWinner();
    switchPlayers(); 
  }
}
 
function fillSquareWithMarker(square, player) {
  var marker = document.createElement('div');

  marker.className = player + "-marker";
  square.appendChild(marker);
}
 
/*Mise à jour tableau  */
function updateBoard(index, marker) {
  board[index] = marker;
  
  /* conversion du tableau en chaîne */
  var boardstring = JSON.stringify(board);
 
  /* dernier joueur qui a marqué */
  localStorage.setItem('tic-tac-toe-board', boardstring); 
  localStorage.setItem('last-player', getCurrentPlayer());
}
 
 

/* Vérifier et déclarer le gagnant */

function declareWinner() {
  if (confirm("Vous avez gagné !  Rejouer ?")) {
    newGame();
  }
}
 
function weHaveAWinner(a, b, c) {
  if ((board[a] === board[b]) && (board[b] === board[c]) && (board[a] != "" || board[b] != "" || board[c] != "")) {
    setTimeout(declareWinner(), 100);
    return true;
  }
  else
    return false;
}
 
function checkForWinner() {
  var a = 0; var b = 1; var c = 2;
  while (c < board.length) {
    if (weHaveAWinner(a, b, c)) {
      return;
    }
    a+=3; b+=3; c+=3;
  }
    
  /* colonnes de vérification */
  a = 0; b = 3; c = 6;
  while (c < board.length) {
    if (weHaveAWinner(a, b, c)) {
      return;
    }
    a+=1; b+=1; c+=1;
  }
 
  /*colonnes diagonales droites */
  if (weHaveAWinner(0, 4, 8)) {
    return;
  }
  /* colonnes diagonales gauches */
  if (weHaveAWinner(2, 4, 6)) {
    return;
  }
  
  /* Si match nul, message formulé : voulez vous refaire un nouveau jeu ? */
  if (!JSON.stringify(board).match(/,"",/)) {
    if (confirm("Match nul, rejouer ?")) {
      newGame();
    }
  }
}
 
 

function getCurrentPlayer() {
  return document.querySelector(".current-player").id;
}
 
/* Réenitialisation du jeu */
function setInitialPlayer() {
  var playerX = document.getElementById("X");
  var playerO = document.getElementById("O");
  playerX.className = "";
  playerO.className = "";
    
  if (!window.localStorage || !localStorage.getItem('last-player')) {
    playerX.className = "current-player";
    return;
  } 
 
  var lastPlayer = localStorage.getItem('last-player');  
  if (lastPlayer == 'X') {
    playerO.className = "current-player";
  }
  else {
    playerX.className = "current-player";
  }
}
 
function switchPlayers() {
  var playerX = document.getElementById("X");
  var playerO = document.getElementById("O");
  
  if (playerX.className.match(/current-player/)) {
    playerO.className = "current-player";
    playerX.className = "";
  }
  else {
    playerX.className = "current-player";
    playerO.className = "";
  }
}
 
function newGame() {  
  /* Efface le résultat stocké dans le stockage final*/
  localStorage.removeItem('tic-tac-toe-board');
  localStorage.removeItem('last-player');
  
  /* creation d'un nouvelle partie */
  createBoard();
}



    
    
    
    
    
    
    
   