// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // console.log("in Enemy app.js");
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var createEnemies = function(){
    for(var row=1; row<4; row++){
        for(var i=1; i<4; i++){
            var x = -100;
            var y = row*83-25;
            var speed = Math.floor((Math.random() * 2) +1);
            allEnemies.push(new Enemy(x, y, speed));
        }
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // console.log("in Enemy.update app.js");
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var enemyRow = (this.y +25)/83;
    var enemyRowCount = 0;
    // console.log(enemyRow);
    //if enemy position is still on screen move enemy at speed
    if(this.x>=-100 && this.x < 505){
        //move at speed
        this.x = this.x+(this.speed*(dt*80));
    }
    //If the enemy is not already on the screen, check to see if there as an enemy in the first two blocks
    else
    {
        for(enemy in allEnemies){
            if(((allEnemies[enemy].y+25)/83 === enemyRow) && allEnemies[enemy].x >-100 && allEnemies[enemy].x < 505){
                enemyRowCount++;
            }
        }
        if (enemyRowCount >= 2){
            this.x = -100;
            this.speed = 0;
        }
        else
        {
            this.x = -100;
            this.speed = Math.floor((Math.random() * 3) +1);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // console.log("in render app.js");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Selector Icon class
var charImages = [
    'images/char-boy.png',          //Draw in spot 1
    'images/char-cat-girl.png',     //Draw in spot 2
    'images/char-horn-girl.png',    //Draw in spot 3
    'images/char-pink-girl.png',    //Draw in spot 4
    'images/char-princess-girl.png' //Draw in spot 5
];

var Selector = function(){
    this.x = 202;
    this.y = 415;
    this.img = 'images/Selector.png';
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.img), this.x, this.y);
}

Selector.prototype.handleInput = function(key){
    switch(key){
        case "up" :
            break;
        case "down" :
            var charCol = this.x/101
            player.char = charImages[charCol];
            break;
        case "left" :
            if(this.x > 0){
                this.x = this.x-101;
            }
            break;
        case "right" :
            if (this.x < 404){
                this.x = this.x + 101;
            }
            break;
        default :
            break;
    }
}

//Score class
var Score = function(){
    this.score = 0;
}

Score.prototype.render = function(){
    ctx.clearRect(0,0, 200,50)
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textalign = "left";
    ctx.fillText("Score: " + score.score, 0, 45);
    ctx.strokeStyle = "black";
    ctx.strokeText("Score: " + score.score, 0, 45);
}

Score.prototype.update = function(){
    this.score = this.score+1;
}

//Lives class
var Lives = function(){
    this.count = 3;
    this.img = 'images/Heart.png';
}

Lives.prototype.render = function(){
    ctx.clearRect(350,0,505,50);
    for(var i=0; i<this.count; i++){
        ctx.drawImage(Resources.get(this.img), 350+(i*50), 0, 40, 50);
    }
}
Lives.prototype.update = function(count){
    this.count = this.count + count;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    // console.log("in Player app.js");
    this.x = (505/2)-(101/2);
    this.y = 400;
    this.char='';
};

Player.prototype.update = function(){
    // console.log("in PLayer.update app.js");
    //Check if the player and enemy are occupying the same space, if so reset player to the start
    var enemyCol;
    var enemyRow;
    var playerCol = this.x/101;
    var playerRow = Math.floor((this.y+83)/83);

    // console.log("PLAYER: " + playerCol, playerRow);
    //if player and enemy occupy same space restart player and subtract life
    for(enemy in allEnemies){
        enemyCol =Math.floor((allEnemies[enemy].x+50)/101);
        enemyRow = (allEnemies[enemy].y+25)/83;
        // console.log("ENEMY: " +enemyCol, enemyRow);
        if((enemyRow === playerRow)  && (enemyCol === playerCol)){
            this.x = (505/2)-(101/2);
            this.y = 400;
            lives.update(-1);
        }
    }

    //if player reached top row, reset to start and add to score
    if(playerRow === 0){
        score.update();
        this.x = (505/2)-(101/2);
        this.y = 400;
    }
};

Player.prototype.render = function(){
    //Player image width is 101
    //console.log("in Player.render app.js");
    ctx.drawImage(Resources.get(this.char), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    // console.log("in Player.handleInput app.js");
    // console.log(key);
    switch(key){
        case "up" :
            var newY = this.y-83
            if(this.y>0){
                this.y=newY;
            }
            break;
        case "down" :
            var newY = this.y+83
            if(this.y <400){
                this.y = newY;
            }
            break;
        case "left" :
            var newX = this.x-101
            if(this.x > 0){
                this.x = newX;
            }
            break;
        case "right" :
            var newX = this.x+101
            if(this.x < 404){
                this.x = newX;
            }
            break;
        default :
            break;
    }

};

var Reset = function(){

}

Reset.prototype.handleInput = function(key){
    console.log("in rest handle Input");
    switch(key){
        case "n" :
            break;
        case "y" :
            score.score = 0;
            lives.count = 3;
            player.char = '';
            break;
        default :
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var enemy1 = new Enemy(50, 100);
var selector = new Selector();
var score = new Score();
var lives = new Lives();
var reset = new Reset();

var allEnemies = [];
createEnemies();

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        78: 'n',
        89: 'y'
    };

    if(lives.count >0){
        if(player.char === ''){
            selector.handleInput(allowedKeys[e.keyCode]);
        }
        else{
            player.handleInput(allowedKeys[e.keyCode]);
        }
    }else{
        reset.handleInput(allowedKeys[e.keyCode]);
    }


});
