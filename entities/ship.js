import { ctx, char } from "../utility.js";
import { gameState } from "../script.js";
import sprites from "../assets/entities.png";

const sprite = new Image();
sprite.src = sprites;

export const ship = {
  x: 450,
  y: 1450,
  hitBoxRadius: 28,
  maxSpeed: 5,
  sprite: sprite,
  gun: {
    bulletSpeed: 5,
    cooldown: 500,
  },
  draw() {
    char.fillStyle = "transparent";
    char.beginPath();
    char.arc(this.x, this.y, this.hitBoxRadius, 0, Math.PI * 2, false);
    char.fill();
    char.drawImage(this.sprite, 0, 0, 16, 16, this.x - 32, this.y - 32, 64, 64);
  },
};
