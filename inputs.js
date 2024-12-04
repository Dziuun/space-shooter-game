import { gameState } from "./script.js";
import { ship } from "./entities/ship.js";
import { bullets } from "./entities/bullets.js";

export function controlShip() {
  if (gameState.keys.KeyD && ship.x <= canvas.width - 100) {
    ship.x += ship.maxSpeed;
  }
  if (gameState.keys.KeyA && ship.x >= 0) {
    ship.x -= ship.maxSpeed;
  }
  if (gameState.keys.KeyW && ship.y >= 0) {
    ship.y -= ship.maxSpeed;
  }
  if (gameState.keys.KeyS && ship.y <= canvas.height - 100) {
    ship.y += ship.maxSpeed;
  }
  if (gameState.keys.Space && Date.now() >= gameState.lastShotTime) {
    bullets.bulletStartingPositions();
    gameState.lastShotTime = Date.now() + ship.gun.cooldown;
  }
}
