const grid = document.querySelector('#grid'),
      errorCounter = document.querySelector('#error'),
      cards = [ 'alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac' ],
      deck = [ ...cards, ...cards ];

let pick = [],
    errors = 0;

deck.sort(() => .5 - Math.random());

const flipCard = e => {
   const card = e.target;
   if(card.classList.contains('flipped')) return;
   card.classList.add(card.getAttribute('data-name'), 'flipped');

   pick.push(card);
   if(pick.length === 2) matchCard();
}

const matchCard = () => {
   const card1 = pick[0],
         card2 = pick[1],
         card1Name = card1.getAttribute('data-name'),
         card2Name = card2.getAttribute('data-name');

   if(card1Name === card2Name) {
      checkVictory();
   } else if(errors === 10) {
      showAlert('Game Over!');
   } else {
      setTimeout(() => {
         card1.classList.remove(card1Name, 'flipped');
         card2.classList.remove(card2Name, 'flipped');
         errors++;
         errorCounter.innerText = errors;
      }, 500);
   }

   pick = [];
}

const checkVictory = () => {
   const flippedCards = document.querySelectorAll('.flipped');
   if(flippedCards.length === deck.length) showAlert('You won!');
}


for (let i=0; i < deck.length; i++) {
   const card = document.createElement('div')
         cardName = deck[i];
   card.classList.add('card');
   card.setAttribute('data-name', cardName);
   card.addEventListener('click', flipCard);
   grid.appendChild(card);
}
errorCounter.innerText = errors;