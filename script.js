// IMPORTS
import { ship } from "./entities/ship.js";
import {
  availableBehaviors,
  Enemies,
  enemyBehaviors,
} from "./entities/enemies.js";
import { ctx, char, getRandomNumber } from "./utility.js";
import { drawBackground } from "./background.js";
import { controlShip } from "./inputs.js";
import { bullets } from "./entities/bullets.js";

export const gameState = {
  keys: [],
  bulletPos: [],
  enemyBulletPos: [],
  enemyPos: [],
  lastShotTime: 0,
  score: 0,
  enemiesLeft: 20,
  round: 1,
  roundActive: false,
  lives: 3,
  backgroundLoaded: false,
  entitiesLoaded: false,
};

// INITIAL

export function spawnEnemy() {
  gameState.enemyPos.push(
    new Enemies(
      getRandomNumber(100, canvas.width - 100),
      getRandomNumber(100, 700),
      availableBehaviors()[
        Math.floor(Math.random() * availableBehaviors().length)
      ]
    )
  );
}

function enemyMove() {
  gameState.enemyPos.forEach((enemy) => {
    enemy.spawnMovement();
    enemy.enemyDraw();
  });
}

function startRound() {
  if (gameState.roundActive === true) return;

  let count = 0;

  const interval = setInterval(() => {
    spawnEnemy();
    count++;

    if (count >= gameState.enemiesLeft * gameState.round) {
      count = 0;
      gameState.roundActive = false;
      gameState.round++;
      clearInterval(interval);
    }
  }, 3000);
}

function OOBClear() {
  gameState.enemyPos.forEach((enemy) =>
    enemy.y > canvas.height + 100 ? (enemy.state = "OOB") : ""
  );
  gameState.enemyPos = gameState.enemyPos.filter(
    (enemy) => enemy.state != "OOB"
  );
}

function displayScore() {
  char.fillStyle = "green";
  char.font = "24px Pixelify Sans";
  char.fillText(`SCORE: ${gameState.score}`, 100, 100);
  char.fillText(`LIVES: ${gameState.lives}`, 100, 120);
}

// RENDER

function render() {
  char.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  bullets.bulletDraw();
  displayScore();
  ship.draw();
}

export function gameloop() {
  if (!gameState.backgroundLoaded || !gameState.entitiesLoaded) {
    console.log(gameState.backgroundLoaded, gameState.entitiesLoaded);
    setTimeout(gameloop, 500);
    return;
  }
  controlShip();
  render();
  enemyMove();
  OOBClear();
  bullets.enemyBulletStartingPositions();
  bullets.bulletLocation();
  bullets.bulletColision();
  if (!gameState.enemyPos.length && !gameState.roundActive) {
    console.log(`ROUND ${gameState.round}`);
    startRound();
    gameState.roundActive = true;
  }
  if (gameState.lives > 0) requestAnimationFrame(gameloop);
  else {
    setTimeout(() => {
      char.fillStyle = "green";
      char.textAlign = "center";
      char.font = "128px Pixelify Sans";
      char.fillText(`GAME OVER!`, canvas.width / 2, 450);
      char.font = "58px Pixelify Sans";
      char.fillText(`YOUR SCORE: ${gameState.score}`, canvas.width / 2, 550);
    }, 5000);
  }
}

window.addEventListener("keydown", (e) => {
  gameState.keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  gameState.keys[e.code] = false;
});

gameloop();
