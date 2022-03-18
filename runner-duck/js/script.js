const road = document.querySelectorAll('#grid > div'),
      pointsDisplay = document.querySelector('#points'),
      duckIdx = 1,
      duck = road[duckIdx];

let speed = 200,
    points = 0;

duck.classList.add('duck');


const addPlant = () => {
   let currentPlantIdx = road.length - 1;
   road[currentPlantIdx].classList.add('plant');
   
   const plantInterval = setInterval(() => {
      points++;
      pointsDisplay.innerText = points;
      if(points % 50 === 0) speed = speed - 20;

      road[currentPlantIdx].classList.remove('plant');
      currentPlantIdx--
      
      if(currentPlantIdx < 0) {
         clearInterval(plantInterval);
         addPlant();
         return;
      }
      
      if(
         currentPlantIdx === duckIdx &&
         !road[currentPlantIdx].classList.contains('duck-jump')
      ) {
         showAlert(`CRASH!<br>Points: ${points}`);
         clearInterval(plantInterval);
         road[currentPlantIdx].classList.remove('duck');
         road[currentPlantIdx].classList.add('plant');
         return;
      }

      road[currentPlantIdx].classList.add('plant');
   }, speed);
}
addPlant();


const jump = e => {
   if(e.code === 'Space' && !e.repeat) {
      duck.classList.add('duck-jump')
      setTimeout(() => {
         duck.classList.remove('duck-jump')
      }, 300);
   }
}

document.addEventListener('keydown', jump);