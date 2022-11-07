const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let tailLength = 2;
let xvel = 0;
let yvel = 0;
let goalX = 5;
let goalY = 5;
let score = 0;
let speed = 7;
let tileCount = 20;
let tileSize = canvas.clientWidth / tileCount - 2;
let frontX = 10;
let frontY = 10;
const snakeParts = [];

class snakeLength {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function startGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  drawSnake();
  drawGoal();
  checkCollision();
  drawScore();
  setTimeout(startGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yvel === 0 && xvel === 0) {
    return false;
  }
  if (frontX < 0) {
    gameOver = true;
  } else if (frontX === tileCount) {
    gameOver = true;
  } else if (frontY < 0) {
    gameOver = true;
  } else if (frontY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === frontX && part.y === frontY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(
      "GAME OVER!!! ",
      canvas.clientWidth / 6.5,
      canvas.clientHeight / 2
    );
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "15px sans-serif";
  ctx.fillText("TOTAL: " + score, canvas.clientWidth - 70, 20);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
  ctx.fillStyle = "blue";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakeLength(frontX, frontY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
  ctx.fillStyle = "pink";
  ctx.fillRect(frontX * tileCount, frontY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  frontX = frontX + xvel;
  frontY = frontY + yvel;
}

function drawGoal() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(goalX * tileCount, goalY * tileCount, tileSize, tileSize);
}

function checkCollision() {
  if (goalX == frontX && goalY == frontY) {
    goalX = Math.floor(Math.random() * tileCount);
    goalY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up arrow key
  if (event.keyCode == 38) {
    if (yvel == 1) return;
    yvel = -1;
    xvel = 0;
  }
  if (event.keyCode == 40) {
    if (yvel == -1) return;
    yvel = 1;
    xvel = 0;
  }
  //left arrow key
  if (event.keyCode == 37) {
    if (xvel == 1) return;
    yvel = 0;
    xvel = -1;
  }
  if (event.keyCode == 39) {
    if (xvel == -1) return;
    yvel = 0;
    xvel = 1;
  }
}
startGame();
