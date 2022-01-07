const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");

let snake = [{
    x: 200,
    y: 200
}, {
    x: 190,
    y: 200
}, {
    x: 180,
    y: 200
}, {
    x: 170,
    y: 200
}, {
    x: 160,
    y: 200
}, ];

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = 'lightblue';
    snakeboard_ctx.strokestyle = 'darkblue';
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function growSnake(){
    // WRITE this funciton
    console.log('Grow snake')
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(drawSnakePart);
}
function clearCanvas() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);
    snake.pop();
}
changing_direction = false;
function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;

    keyPressed = event.keyCode;

    let goingUp = dy === speed;
    let goingDown = dy === -speed;
    let goingLeft = dx === -speed;
    let goingRight = dx === speed;

    if (UP_KEY === keyPressed & !goingUp & !goingDown) {
        dx = 0;
        dy = -speed;
    }
    if (DOWN_KEY === keyPressed & !goingDown & !goingUp) {
        dx = 0;
        dy = speed;
    }
    if (RIGHT_KEY === keyPressed & !goingRight & !goingLeft) {
        dx = speed;
        dy = 0;
    }
    if (LEFT_KEY === keyPressed & !goingLeft & !goingRight) {
        dx = -speed;
        dy = 0;
    }
}
/*GAME OVER */
/* Game over Screen */
function showGameOverCanvas() {
    snakeboard_ctx.font = "30px Ariel";
    snakeboard_ctx.textBaseline = 'middle';
    snakeboard_ctx.textAlign = 'center';
    snakeboard_ctx.textStyle = "darkblue";
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.fillStyle = "red";
    snakeboard_ctx.fillText("GAME OVER!", snakeboard.width / 2, snakeboard.height / 2);
}
function gameOver() {
    if (snake[0].x >= snakeboard.width || snake[0].x <= 0 || snake[0].y >= snakeboard.height || snake[0].y <= 0) {
        return true;
    } else {
        return false;
    }
}

const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

speed = 10;
let dx = speed;
let dy = 0;



document.addEventListener("keydown", change_direction);


/* EATING FOOD */
let x_food;
let y_food;
let start = true;
let reDraw = true;

function generateFoodCoords(){
    let x_ret = Math.round((Math.random() * snakeboard.width)/10) * 10;
    let y_ret = Math.round((Math.random() * snakeboard.height)/10) * 10;

    return [x_ret, y_ret];
}
function drawFood(){

    if(reDraw){
        let foodChords = generateFoodCoords();
        x_food = foodChords[0];
        y_food = foodChords[1];
    }
    snakeboard_ctx.fillStyle = 'lightred';
    snakeboard_ctx.strokestyle = 'darkred';
    snakeboard_ctx.fillRect(x_food, y_food, 10, 10);
    snakeboard_ctx.strokeRect(x_food, y_food, 10, 10);
}
function foodIsEaten(){
    if (snake[0].x === x_food && snake[0].y === y_food){
        console.log("ate some food");
        return true;
    }
    else{
        return false;
    }
}

function main() {
    if (gameOver()) {
        console.log("GAME OVER!");
        showGameOverCanvas();
        return;
    } else {
        changing_direction = false;
        setTimeout(function onTick() {
            clearCanvas();
            moveSnake();
            drawSnake();
            
            if(foodIsEaten()|| start){
                reDraw = true;
                growSnake()
            }
            else{
                reDraw = false;
            }
            drawFood();
            console.log(x_food, y_food);
            // Call main again
            start = false;
            main();
        }, 100);
    }
}
main();