const cells = document.querySelectorAll('.cell');

let turn = 0;
cellSigns = [];

for (let i=0; i < cells.length; i++) {
   const cell = cells[i];
   
   cell.addEventListener('click', () => {
      if(cellSigns[i]) {
         alert(`You have already clicked the cell ${i}`);
         return;
      }

      turn++;
      let sign;
      turn % 2 === 0 ? sign='O' : sign='X';
      
      cell.innerText = sign;
      cellSigns[i] = sign;

      let hasWon = checkVictory();
      if(hasWon) {
         showAlert(`${sign} won!`);
      } else if(turn === 9) {
         showAlert('Draw!');
      }
   });
}

const checkVictory = () => {
   const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   for (let i=0; i < winCombinations.length; i++) {
      const combination = winCombinations[i];

      const a = combination[0],
            b = combination[1],
            c = combination[2];
      
      if(cellSigns[a] && cellSigns[a]===cellSigns[b] && cellSigns[b]===cellSigns[c]) {
         return true;
      }
   }
   return false;
}