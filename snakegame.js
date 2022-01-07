const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

function drawSnakePart(snakePart) 
{  
snakeboard_ctx.fillStyle = 'lightblue';  
snakeboard_ctx.strokestyle = 'darkblue';
snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/* Game over Screen */
function showGameOverCanvas(){
        snakeboard_ctx.font = "30px Ariel";
        snakeboard_ctx.textBaseline = 'middle';
        snakeboard_ctx.textAlign = 'center';
        snakeboard_ctx.textStyle = "darkblue"
        snakeboard_ctx.fillStyle = board_background
        snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
        snakeboard_ctx.strokeRect(0, 0,snakeboard.width,snakeboard.height);
        snakeboard_ctx.fillStyle = "red"
        snakeboard_ctx.fillText("GAME OVER!", snakeboard.width/2, snakeboard.height/2)
    }

/*Function that prints the parts*/
function drawSnake() 
{  
    snake.forEach(drawSnakePart);
}
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

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


speed = 10
let dx = speed;
let dy = 0;

changing_direction = false 

function moveSnake(){
    const head = {x:snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function change_direction(event){
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

    if (UP_KEY === keyPressed & !goingUp & !goingDown){
        dx = 0
        dy = -speed
    }
    if (DOWN_KEY === keyPressed & !goingDown & !goingUp){
        dx = 0
        dy = speed
    }
    if (RIGHT_KEY === keyPressed & !goingRight & !goingLeft){ 
        dx = +speed
        dy = 0
    }
    if (LEFT_KEY === keyPressed & !goingLeft & !goingRight){
        dx = -speed
        dy = 0
    }
}

function gameOver(){
    if (snake[0].x >= snakeboard.width || snake[0].x <= 0 || snake[0].y >= snakeboard.height || snake[0].y <= 0){
        return true
    }
    else{
        return false
    }
}

document.addEventListener("keydown", change_direction)
function main() {
    if (gameOver()){
        console.log("GAME OVER!")
        showGameOverCanvas()
        return
    }
    else{    
        changing_direction = false
        setTimeout(function onTick(){    
        clearCanvas();    
        moveSnake();  
        drawSnake();
        // Call main again
        main();
        }, 100)
    }
}
main();