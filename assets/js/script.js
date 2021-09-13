/*Variables */
const speed = 10;
let direction = { x: 0, y: 0 };
let mainFrame = createMainFrame();
let lastPaintTime = 0;
let snakeArray = [
  { x: Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 40) },
];

/*Food*/
const food = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40),
};

/*Adding EventListener*/
document.addEventListener("keydown", moveSnake);

/*calling function */
let interval=setInterval(function () {
  game();
}, 100);

/*Main Frame */
function createMainFrame() {
  const mainFrame = document.getElementById("main-frame");
  mainFrame.style.width = "800px";
  mainFrame.style.height = "800px";
  mainFrame.style.marginLeft = "27vw";
  mainFrame.style.background = "lightgray";
  mainFrame.style.display = "grid";
  mainFrame.style.border = "2px solid black";
  mainFrame.style.gridTemplateRows = "repeat(40, 1fr)";
  mainFrame.style.gridTemplateColumns = "repeat(40, 1fr)";
  return mainFrame;
}
function game() {
  //updateSnake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;

  // Display the snake
  mainFrame.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakebody = document.createElement("div");
    snakebody.style.borderRadius = "5px";
    snakebody.style.gridRowStart = e.y;
    snakebody.style.gridColumnStart = e.x;
    if (index === 0) {
      snakebody.classList.add("head");
      snakebody.style.background = "red";
    } else {
      snakebody.classList.add("snake-body");
      snakebody.style.background = "black";
    }
    mainFrame.appendChild(snakebody);
  });

  /*Create Food*/

  const foodbody = document.createElement("div");
  foodbody.style.gridRowStart = food.y;
  foodbody.style.gridColumnStart = food.x;
  foodbody.style.borderRadius = "2px";
  foodbody.classList.add("food");
  foodbody.style.background = "green";

  mainFrame.appendChild(foodbody);

  // check self collision
  for (let i = 1; i < snakeArray.length; i++) {
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[0].y
    ) {
      //logic
      console.log("border collision");
      direction = { x: 0, y: 0 };
      gameOver();

      //snakeArray = [{ x:Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 40)}];
       
     
    }
  }

  // check wall collision
  if (
    snakeArray[0].x >= 40 ||
    snakeArray[0].x <= 0 ||
    snakeArray[0].y >= 40 ||
    snakeArray[0].y <= 0
  ) {
    //logic
    direction = { x: 0, y: 0 };

    gameOver();

    //snakeArray = [{ x:Math.floor(Math.random() * 40), y:Math.floor(Math.random() * 40) }];
  }

  //Eat food
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    snakeArray.unshift({
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    });

    //change food location
    const x = Math.floor(Math.random() * 40);
    const y = Math.floor(Math.random() * 40);
    food.x = x;
    food.y = y;
  }
}

/*Key Pressed */
function moveSnake(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (e.keyCode == UP_KEY) {
    // up arrow
    direction.x = 0;
    direction.y = -1;
  } else if (e.keyCode == DOWN_KEY) {
    // down arrow
    direction.x = 0;
    direction.y = 1;
  } else if (e.keyCode == LEFT_KEY) {
    // left arrow
    direction.x = -1;
    direction.y = 0;
  } else if (e.keyCode == RIGHT_KEY) {
    // right arrow
    direction.x = 1;
    direction.y = 0;
  }
}

function gameOver() {
  window.clearInterval(interval);
  let gameOverBody = document.createElement("div");
  gameOverBody.style.marginLeft = "350px";
  gameOverBody.style.marginTop = "300px";
  gameOverBody.style.color = "red";
  gameOverBody.style.fontSize = "2rem";
  gameOverBody.style.textAlign='center';
  gameOverBody.style.transition = "0.5s linear";
  gameOverBody.innerHTML =
  "<h1>Game Over!!!</h1> <button id='tryagain-btn'>Try Again</button>";

  mainFrame.innerHTML = " ";
 
  mainFrame.appendChild(gameOverBody);
  let tryAgainBtn = document.getElementById("tryagain-btn");

  tryAgainBtn.addEventListener("click", () => {
    location.reload();
  });
}
