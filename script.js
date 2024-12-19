// =========== versi icon array ==============
// const cards = [
//   "🍎",
//   "🍎",
//   "🍐",
//   "🍐",
//   "🍌",
//   "🍌",
//   "🍉",
//   "🍉",
//   "🍓",
//   "🍓",
//   "🥭",
//   "🥭",
// ];

//  ========== versi url img =================
const cards = [
  "https://cdn-icons-png.flaticon.com/512/4359/4359692.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359692.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359642.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359642.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359672.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359672.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359746.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359746.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359613.png ",
  "https://cdn-icons-png.flaticon.com/512/4359/4359613.png ",
  "https://cdn-icons-png.flaticon.com/512/4359/4359725.png",
  "https://cdn-icons-png.flaticon.com/512/4359/4359725.png",
];

let firstCard = null;
let secCard = null;
let lockBoard = false;
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.innerHTML = "";
  shuffle(cards);
  cards.forEach((card) => {
    const cardElement = document.createElement("div");

    cardElement.classList.add("card");
    cardElement.dataset.icon = card;
    // =========== versi icon array ==============
    // cardElement.innerHTML =
    //   '<div class="card-inner"><div class="card-front"></div><div class="card-back">' +
    //   card +
    //   "</div></div>";

    //  ========== versi url img =================
    cardElement.innerHTML =
      '<div class="card-inner"><div class="card-front"></div><div class="card-back">' +
      '<img src="' +
      card +
      '" alt="Card Image" style="width: 70%; height: 70%; border-radius: 0.5rem;"/>' +
      "</div></div>";

    cardElement.addEventListener("click", flipCard);

    gameBoard.appendChild(cardElement);
  });
  matchedCards = 0; // reset kartu yang cocok
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.icon === secCard.dataset.icon;

  if (isMatch) {
    matchedCards += 2;
    disableCards();
    if (matchedCards === cards.length) { //cek semua kartu berpasangan
      showMessage();
    }
  } else {
    unflipCards();
  }

  // isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secCard, lockBoard] = [null, null, false];
}

function showMessage() {
  alert("Wihh keren! Kamu berhasil mencocokkan semua kartu!!");
  confetti();
}

createBoard();

document.getElementById("reset-button").addEventListener("click", createBoard);
