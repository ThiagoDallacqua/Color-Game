/**
 * Created by thiago on 20/10/16.
 */

var numSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function () {

    reset();
});

function changeColors(color) {

    for(var i = 0; i < squares.length; i++){

        squares[i].style.background = color;
    }
}

function pickColor() {

    var random = Math.floor(Math.random() * colors.length);

    return colors[random];
}

function generateRandomColors(num) {

    var arr = [];

    for(var i = 0; i < num; i++){

        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {

    var color = "rgb(" + Math.floor(Math.random() * 255 + 1)+ ", " + Math.floor(Math.random() * 255 + 1) + ", " +
        Math.floor(Math.random() * 255 + 1) + ")";

    return color;
}

function reset() {

    colors = generateRandomColors(numSquares);

    for(var i = 0; i < squares.length; i++) {

        if(colors[i]){

            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }else{

            squares[i].style.display = "none";
        }

    }

    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor.toUpperCase();
    h1.style.background = "steelblue";
    message.textContent = "";
    resetButton.textContent = "New Colors";
}

function init() {

    setupModeButtons();

    setupSquares();

    reset();
}

function setupModeButtons() {

    for(var i = 0; i < modeButtons.length; i++){

        modeButtons[i].addEventListener("click", function () {

            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

            reset();
        })
    }
}

function setupSquares() {

    for(var i = 0; i < squares.length; i++){

        squares[i].addEventListener("click", function () {

            if(this.style.background === pickedColor){

                message.textContent = "Correct!";
                changeColors(this.style.background);
                h1.style.background = this.style.background;
                resetButton.textContent = "Play Again?";
            }else{

                this.style.background = "#232323";
                message.textContent = "Try Again!";
            }
        })
    }
}