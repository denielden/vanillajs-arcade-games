const showAlert = messagge => {
   const gameArea = document.querySelector('.game-area');
   const alertMessagge = `
      <div class="game-message">
         <h2>${messagge}</h2>
         <button id="restart">Restart</button>
      </div>
   `;

   setTimeout(() => { 
      gameArea.innerHTML = gameArea.innerHTML + alertMessagge;
      const restart = document.querySelector('#restart');
      restart.addEventListener('click', () => window.location.reload());
   }, 500);
}

const currentDate = document.querySelector('#currentDate');
currentDate.innerText = new Date().getFullYear();