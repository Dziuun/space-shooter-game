export const ctx = document.querySelector("#canvas").getContext("2d");
export const char = document.querySelector("#character").getContext("2d");

char.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

export function getRandomNumber(x, y) {
  return Math.trunc(Math.random() * (y - x) + x);
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
