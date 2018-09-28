import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("grass.png");

class Wall extends Sprite {
    constructor(x, y, name, image) {
        super();
        this.x = 0;
        this.y = 0;
        this.name = "A sppoky castle wall";
        this.setImage("castle.png");
        this.accelerateOnBounce = false;
        
    }
}

new Wall(0, 0, "A spooky castle wall", "castle.png");

let leftWall = new Wall;
leftWall.x = 0;
leftWall.y = 200;
leftWall.name = "Left side wall";
leftWall.setImage("wall.png");

let rightWall = new Wall();
rightWall.x = game.displayWidth - 48;
rightWall.y = 200;
rightWall.name = "Right side wall";
rightWall.setImage("wall.png");

class Princess extends Sprite {
    constructor() {
        super();
        this.name = "Princess Ann";
        this.setImage("ann.png");
        this.height = 48;
        this.width = 48;
        this.x = game.displayWidth - 432;
        this.y = game.displayHeight - 50;
        this.speedWhenWalking = 150;
        this.lives = 3;
        this.accelerateOnBounce = false;
        this.defineAnimation("left",9,11);
        this.defineAnimation("right",3,5);
        this.defineAnimation("down",6,8);
        this.defineAnimation("up",0,2);
        this.lives = 3;
    }
    handleLeftArrowKey() {
        this.playAnimation("left");
        this.angle = 180;
        this.speed = this.speedWhenWalking;
    }
    handleRightArrowKey() {
        this.playAnimation("right");
        this.angle = 0;
        this.speed = this.speedWhenWalking;
    }
        handleGameLoop() {
        this.x = Math.min(game.displayWidth - rightWall.width - this.width, this.x);
        this.x = Math.max(48, this.x);
        this.speed = 0;
    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.angle = 270;
        this.speed = this.speedWhenWalking;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.angle = 90;
        this.speed = this.speedWhenWalking;
    }
    handleCollision(otherSprite) {
        // Horizonatally, Ann's image file is about one-third blank, one-third Ann, and // one-third blank
        // Vertically, there is very little blank space. Ann's head is about one-fourth // the height.
        // The other sprite (Ball) should change angle if
        // 1 it hits the middle horizontal third of the image, which is not blank, and
        // 2 it hits the upper fourth which is Ann's head.
        let horizontalOffset = this.x - otherSprite.x;
        let verticalOffset = this.y - otherSprite.y;
        if (Math.abs(horizontalOffset) < this.width / 3
                && verticalOffset > this.height / 4) {
                    // The new angle depends on the horizontal difference between sprites.
                    otherSprite.angle = 90 + 2 * horizontalOffset;
                }
                return false;
    }
    handleFirstGameLoop() {
        // Set up a text area to display the number of lives remaining.
        this.livesDisplay = game.createTextArea(game.displayWidth - 4 * 50,20);
        this.updateLivesDisplay();
    }
    updateLivesDisplay() {
        game.writeToTextArea(this.livesDisplay, "Lives = " + this.lives);
    }
    LoseALife() {
        this.lives = -1
        this.updateLivesDisplay();
        if (this.lives > 0) {
            new Ball();
        }
        if (this.lives <= 0) {
            game.end('The Very Illusive Mysterious Stranger Has Evaded\nYou For Now!\nBetter Luck Next Time Scrub...')
        }
    }
}
let ann = new Princess;

class Ball extends Sprite {
    constructor() {
        super();
        this.x = game.displayWidth - 432;
        this.y = game.displayHeight - 216;
        this.height = 48;
        this.width = 48;
        this.name = "Soccer Ball";
        this.setImage("ball.png");
        this.defineAnimation("spin",0,12);
        this.speed = 1;
        this.angle = 50 + Math.random() * 80;
    }
    handleGameLoop() {
        if (this.speed <= 200) {
            this.speed = this.speed + 2;
        }
    }
    handleBoundaryContact() {
        game.removeSprite(this);
        Ball.ballsInPlay = Ball.ballsInPlay - 1;
        if (Ball.ballsInPlay <= 0) {
            ann.loseALife();
        }
    }
}

new Ball(game.displayWidth - 432, game.displayHeight - 216, "Soccer Ball", "ball.png");

