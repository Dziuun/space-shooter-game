import { gameState } from "../script.js";
import { ctx, char, getRandomNumber } from "../utility.js";
import sprites from "../assets/entities.png";

export const enemyBehaviors = ["base", "zigzag", "tripleShooter"];
const sprite = new Image();
sprite.src = sprites;

sprite.onload = () => {
  gameState.entitiesLoaded = true;
};

export function availableBehaviors() {
  if (gameState.round === 1) return enemyBehaviors.slice(0, 1);
  if (gameState.round <= 2) return enemyBehaviors.slice(0, 2);
  if (gameState.round >= 3) return enemyBehaviors;
}

export class Enemies {
  constructor(x, maxY, behavior) {
    this.x = x;
    this.y = -50;
    this.maxY = maxY;
    this.speed = 5;
    this.speedX = 1;
    this.state = "alive";
    this.behavior = behavior;
    this.offset = 0;
    this.swap = 1;
    this.sprite = sprite;
  }

  enemyShoot() {
    gameState.enemyPos.forEach((enemy) => {
      if (Math.random() <= 0.01) {
        gameState.enemyBulletPos.push([ship.x + 50, ship.y + 50, "alive"]);
      }
    });
  }

  enemyDraw() {
    char.fillStyle = "transparent";
    char.beginPath();
    char.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
    char.fill();
    if (this.behavior === "base")
      char.drawImage(
        this.sprite,
        0,
        38,
        16,
        16,
        this.x - 64,
        this.y - 64,
        128,
        128
      );
    if (this.behavior === "zigzag")
      char.drawImage(
        this.sprite,
        0,
        19,
        16,
        16,
        this.x - 64,
        this.y - 64,
        128,
        128
      );
    if (this.behavior === "tripleShooter")
      char.drawImage(
        this.sprite,
        19,
        38,
        16,
        16,
        this.x - 64,
        this.y - 64,
        128,
        128
      );
  }

  spawnMovement() {
    if (
      this.y < this.maxY &&
      (this.behavior === "base" || this.behavior === "tripleShooter")
    )
      this.y += this.speed;

    if (
      this.y >= this.maxY &&
      (this.behavior === "base" || this.behavior === "tripleShooter")
    ) {
      this.fidget();
    }

    if (this.behavior === "zigzag") this.moveZigzag();
  }

  fidget() {
    this.offset = this.offset + this.swap;
    this.x = this.x + this.speedX;

    if (this.offset === 50) {
      this.swap = -this.swap;
      this.speedX = -this.speedX;
    }

    if (this.offset === -50) {
      this.swap = this.swap * -1;
      this.speedX = this.speedX * -1;
    }
  }

  moveZigzag() {
    if (this.x >= 800) this.swap = -this.swap;
    if (this.x <= 100) this.swap = this.swap * -1;

    this.x += this.speed / this.swap;

    this.y += this.speed;
  }
}
