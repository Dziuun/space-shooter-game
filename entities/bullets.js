import { ship } from "./ship.js";
import { ctx, char } from "../utility.js";
import { gameState } from "../script.js";

export const bullets = {
  bulletDraw() {
    char.fillStyle = "lightblue";
    gameState.bulletPos.forEach((x) => {
      char.beginPath();
      char.arc(x[0], x[1], 5, 0, Math.PI * 2, false);
      char.fill();
    });
    gameState.enemyBulletPos.forEach((x) => {
      char.beginPath();
      char.arc(x[0], x[1], 5, 0, Math.PI * 2, false);
      char.fill();
    });
  },
  bulletStartingPositions() {
    gameState.bulletPos.push([ship.x, ship.y, "alive"]);
  },

  enemyBulletStartingPositions() {
    gameState.enemyPos.forEach((enemy) => {
      if (Math.random() * 1000 < 1 && enemy.behavior !== "tripleShooter") {
        gameState.enemyBulletPos.push([enemy.x + 50, enemy.y + 50, "alive"]);
      } else if (
        Math.random() * 1000 < 10 &&
        enemy.behavior === "tripleShooter"
      ) {
        console.log(enemy.behavior);
        gameState.enemyBulletPos.push([
          enemy.x + 50,
          enemy.y + 50,
          "alive",
          -1,
        ]);
        gameState.enemyBulletPos.push([enemy.x + 50, enemy.y + 50, "alive"]);
        gameState.enemyBulletPos.push([enemy.x + 50, enemy.y + 50, "alive", 1]);
      }
    });
  },

  bulletLocation() {
    gameState.bulletPos.forEach((y) => {
      y[1] -= ship.gun.bulletSpeed;
    });
    gameState.enemyBulletPos.forEach((y) => {
      y[1] += 2;
      if (y[3]) y[0] += y[3];
    });
  },

  bulletClear() {
    gameState.bulletPos = gameState.bulletPos.filter(
      (bullet) => bullet[2] === "alive"
    );
  },

  enemyBulletClear() {
    gameState.enemyBulletPos = gameState.enemyBulletPos.filter(
      (bullet) => bullet[2] === "alive"
    );
  },

  bulletColision() {
    gameState.enemyPos.forEach((enemy) => {
      gameState.bulletPos.forEach((bullet) => {
        const dx = bullet[0] - enemy.x;
        const dy = bullet[1] - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (bullet[1] <= 0) {
          bullet[2] = "dead";
          bullets.bulletClear();
        }

        if (distance < 50) {
          bullet[2] = "dead";
          this.bulletClear();
          enemy.state = "dead";
          gameState.enemyPos = gameState.enemyPos.filter(
            (enemy) => enemy.state === "alive"
          );

          gameState.score += 100;
          console.log(gameState.score);
        }
      });

      gameState.enemyBulletPos.forEach((enemyBullet) => {
        const bdx = enemyBullet[0] - ship.x;
        const bdy = enemyBullet[1] - ship.y;
        const distanceB = Math.sqrt(bdx * bdx + bdy * bdy);

        if (distanceB < ship.hitBoxRadius) {
          enemyBullet[2] = "dead";
          this.enemyBulletClear();
          gameState.lives -= 1;
          console.log(`LIVES LEFT: ${gameState.lives}`);
        }
      });

      const sdx = enemy.x - ship.x;
      const sdy = enemy.y - ship.y;
      const distanceS = Math.sqrt(sdx * sdx + sdy * sdy);

      if (distanceS < ship.hitBoxRadius + 50) {
        gameState.lives -= 1;
        enemy.state = "dead";
        gameState.enemyPos = gameState.enemyPos.filter(
          (enemy) => enemy.state === "alive"
        );
      }
    });
  },
};
