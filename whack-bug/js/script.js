const pointsDisplay = document.querySelector('#points');
let points = 0;
pointsDisplay.innerText = points;

const timerDisplay = document.querySelector('#timer');
let timeLeft = 30;
let bugSpeed = 800;
timerDisplay.innerText = timeLeft;

const cells = document.querySelectorAll('.cell');

const randomBug = () => {
   removeBug();

   if(points < 5) {
      bugSpeed = 300;
   }

   const randomNumber = Math.floor(Math.random() * cells.length),
         cell = cells[randomNumber];
   cell.classList.add('bug');
};

const bugMove = setInterval(randomBug, bugSpeed);
const removeBug = () => cells.forEach(cell => cell.classList.remove('bug'));

for (let i=0; i < cells.length; i++) {
   const cell = cells[i];

   cell.addEventListener('click', () => {
      if(cell.classList.contains('bug')) {
         points++;
         pointsDisplay.innerText = points;

         cell.classList.remove('bug');
         cell.classList.add('splat');
         setTimeout(() => cell.classList.remove('splat'), 200);
      }
   });
}

const countDown = () => {
   timeLeft--;
   timerDisplay.innerHTML = timeLeft;
   
   if(timeLeft === 0) {
      clearInterval(timer);
      clearInterval(bugMove);
      removeBug();
      showAlert(`GAME OVER! Points: ${points}`);
   }
};
const timer = setInterval(countDown, 1000);