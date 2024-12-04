import { ctx, char } from "./utility.js";
import { gameState } from "./script.js";
import backgroundImage from "./assets/space.png";

const background = new Image();
background.src = backgroundImage;

background.onload = () => {
  console.log("BG LOADED");
  gameState.backgroundLoaded = true;
};

background.onerror = (e) => {
  console.error("Background image failed to load", e);
};

let offset = 0;
let bgY = 0;
const scrollSpeed = 1;

export function drawBackground() {
  const scaledWidth = background.width * 4;
  const scaledHeight = background.height * 4;

  ctx.drawImage(background, 0, bgY, scaledWidth, scaledHeight);
  ctx.drawImage(background, 0, bgY - scaledHeight, scaledWidth, scaledHeight);

  bgY += scrollSpeed;

  if (bgY >= scaledHeight) {
    bgY = 0;
  }
}
