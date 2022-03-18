const grid = document.querySelector('#grid'),
		pointsDisplay = document.querySelector('#points'),
		size = 15,
		rxc = size * size,
		cells = [],
		speed = 350;

const aliens = [
	0,1,2,3,4,5,6,7,8,9,
	16,17,18,19,20,21,22,23,
	30,31,32,33,34,35,36,37,38,39
];

const aliensKilled = [];
let alienMoveIntVal = null,
	 points = 0;
pointsDisplay.innerText = points;

for(let i=0; i < rxc; i++) {
	const cell = document.createElement('div');
	cells.push(cell);
	grid.appendChild(cell);
}

// who won?
const checkVictory = () => {
	if(aliensKilled.length === aliens.length) {
		showAlert(`HUMAN WINS!<br>Points: ${points}`);
		clearInterval(alienMoveIntVal);
	}
}
const checkAlienWin = () => {
	for(let i=0; i < aliens.length; i++) {
		if(
			!aliensKilled.includes(aliens[i]) &&
			aliens[i] >= spaceshipIdx
		) {
			showAlert(`ALIEN WINS!<br>Points: ${points}`);
			clearInterval(alienMoveIntVal);
		}
	}
}

const drawAliens = () => {
	for(let i=0; i < aliens.length; i++) {
		if(!aliensKilled.includes(i)) {
			cells[aliens[i]].classList.add('alien');
		}
	}
}

const removeAliens = () => {
	for(let i=0; i < aliens.length; i++) {
		cells[aliens[i]].classList.remove('alien');
	}   
}

// aliens
let step = 1,
	 direction = 'forward';

const moveAliens = () => {
	const leftLimit = aliens[0] % size === 0,
			rightLimit = aliens[aliens.length - 1] % size === size - 1;

	removeAliens();

	if(direction === 'forward' && rightLimit) {
		for(let i=0; i < aliens.length; i++) {
			aliens[i] = aliens[i] + size + 1;      
			step = -1;
			direction = 'backward';
		}
	}
	
	if(direction === 'backward' && leftLimit) {
		for(let i=0; i < aliens.length; i++) {
			aliens[i] = aliens[i] + size - 1;
			step = 1;
			direction = 'forward';
		}
	}

	for(let i=0; i < aliens.length; i++) {
		aliens[i] = aliens[i] + step;        
	}
	checkAlienWin();
	drawAliens();
}
drawAliens();
alienMoveIntVal = setInterval(moveAliens, speed);

// spaceship
let spaceshipIdx = 217;
cells[spaceshipIdx].classList.add('spaceship');

const moveSpaceship = e => {
	const leftLimit = spaceshipIdx % size === 0,
			rightLimit = spaceshipIdx % size === size - 1;

	cells[spaceshipIdx].classList.remove('spaceship');

	if(e.code === 'ArrowLeft' && !leftLimit) {
		spaceshipIdx--;
	} else if(e.code === 'ArrowRight' && !rightLimit) {
		spaceshipIdx++;
	}
	cells[spaceshipIdx].classList.add('spaceship');
}
document.addEventListener('keydown', moveSpaceship);

// shoot
const shoot = e => {
	if(e.code !== "Space") return; 

	let laserIdx = spaceshipIdx,
		 laserIntVal = null;

	const moveLaser = () => {
		cells[laserIdx].classList.remove('laser');
		laserIdx = laserIdx - size;

		if(laserIdx < 0) {
			clearInterval(laserIntVal);
			return;
		}

		if(cells[laserIdx].classList.contains('alien')) {
			clearInterval(laserIntVal);
			cells[laserIdx].classList.remove('alien', 'laser');
			cells[laserIdx].classList.add('boom');
			setTimeout(() => {
				cells[laserIdx].classList.remove('boom');
			}, 200);

			const killed = aliens.indexOf(laserIdx);
			aliensKilled.push(killed);
			
			points++;
			pointsDisplay.innerText = points;
				
			checkVictory();
			return;
		}
		cells[laserIdx].classList.add('laser');
	}
	laserIntVal = setInterval(moveLaser, 200);
}
document.addEventListener('keydown', shoot);