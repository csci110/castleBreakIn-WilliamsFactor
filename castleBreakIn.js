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
        this.y = game.displayHeight - 432;
        this.speedWhenWalking = 150;
        this.lives = 3;
        this.accelerateOnBounce = false;
        this.defineAnimation("left",9,11);
        this.defineAnimation("right",3,5);
        this.defineAnimation("down",6,8);
        this.defineAnimation("up",0,2);
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
        
    }
}

new Ball(game.displayWidth - 432, game.displayHeight - 216, "Soccer Ball", "ball.png");

