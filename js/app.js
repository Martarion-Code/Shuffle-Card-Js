"use strict";



const cardDeck = document.querySelector(".card-deck");
const deck = document.querySelector(".deck");
const card = document.getElementsByClassName("card");
const cards = [...card];
const overlay = document.querySelector(".overlay");
const matchedCard = document.getElementsByClassName("match");
const counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
const modal = document.getElementById("pop-up1");
const starsList = document.querySelectorAll(".stars li");
const closeIcon = document.querySelector(".close");

let moves = 0;
let openedCards = [];

let second = 0,
  minute = 0,
  hour = 0;
const timer = document.querySelector(".timer");
let interval;
console.log(deck);

console.log(cards);

deck.addEventListener("click", (e) => {
  cards.forEach((el) => {
    if (e.target.closest(".card") == el) {
      cardOpen(el);
      congratulations();
      el.classList.toggle("open");
      el.classList.toggle("show");
      el.classList.toggle("disabled");
    }
  });
});

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    console.log("loop");
  }
  console.log(array);
  return array;
}

console.log(shuffle([1, 2, 3, 4, 5, 6]));
//Deck in the front page(that visible from user) should change

function startGame() {
 

  let shuffledCards = shuffle(cards);
  console.log(shuffledCards);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function (el) {
      deck.appendChild(el);
    });
    shuffledCards[i].classList.remove("show", "open", "match", "disabled", "unmatched");
  }

  //reset moves
  moves = 0;
  counter.innerHTML = moves;

  //reset rating
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = "#ffd700";
    stars[i].style.visibility = "visible";
  }

  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  let timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}



function cardOpen(el) {
  openedCards.push(el);
  let len = openedCards.length;
  console.log(len);
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

//When match cards match
function matched() {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}

function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(() => {
    openedCards[0].classList.remove("unmatched", "show", "open");
    openedCards[1].classList.remove("unmatched", "show", "open");
    enable();
    openedCards = [];
  }, 1100);
}

function disable() {
  cards.forEach((item) => {
    item.classList.add("disabled");
  });
}

function enable() {
  cards.forEach((item) => {
    item.classList.remove("disabled");
    [...matchedCard].forEach((item2, i) => {
      item2.classList.add("disabled");
    });
  });
}

//game timer
function startTimer() {
  interval = setInterval(() => {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  //start timer on first move
  if (moves == 1) {
    second = 0;
    minute = 0;
    startTimer();
  }

  if (moves > 8 && moves < 12) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

function congratulations() {
  console.log(matchedCard.length);
  let finalTime;
  if (([...matchedCard].length === 16)) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    //show congrats modal
    modal.classList.add("show");

    //declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time, on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    closeModal();
    console.log('asdf');
  }
}

function closeModal() {
  closeIcon.addEventListener("click", (e) => {
    modal.classList.remove("show");
    startGame();
  });
}

function playAgain() {
  modal.classList.remove("show");
  startGame();
}

window.onload = startGame();
