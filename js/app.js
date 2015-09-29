// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
var lives = 3;

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemyMove = dt * 120 * this.speed;
    this.x = this.x + enemyMove;

    // Enemy moves to the start once off screen
    if (this.x > 600) {
        this.x = -200;
    }

    // Player moves back to start if he collides with enemy
    if (player.x < this.x + 85 && player.x + 45 > this.x && player.y < this.y + 45 && 45 + player.y > this.y) {
        
        player.x = 201;
        player.y = 380;

        lives --;
        if (lives < 1) {
            gameover();
        };
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Main player

var Player = function(x, y) {
    this.sprite = character;
    this.x = 201;
    this.y = 380;
};

Player.prototype.update = function() {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x > 99) {
                this.x -= 101;
            };
            break;
        case 'right':
            if(this.x < 400) {
                this.x += 101;
            };
            break;
        case 'up':
            if(this.y > 0) {
                this.y -= 80;
            };
            break;
        case 'down':
            if(this.y < 380) {
                this.y += 80;
            };
            break;
    }
}

gem = function() {
    var randNum = Math.floor(Math.random() * (3)) + 1;
    if (randNum = 1) {
        return 'images/gem-blue.png'
    } else if (randNum = 2) {
        return 'images/gem-green.png'
    } else {
        return 'images/gem-orange.png'
    };
};

var Gem = function(x, y) {
    var randNum = Math.floor(Math.random() * (3)) + 1;
    if (randNum == 1) {
        this.sprite = 'images/gem-blue.png';
    } else if (randNum == 2) {
        this.sprite = 'images/gem-green.png';
    } else {
        this.sprite = 'images/gem-orange.png';
    };

    this.x = x;
    this.y = y;
};

var score = 0;

Gem.prototype.update = function() {

    // Player moves back to start if he collects a gem
    // Additionally the gem is removed and score is incremented by 1
    if (player.x < this.x + 59 && player.x + 71 > this.x && player.y < this.y) {
        
        player.x = 201;
        player.y = 380;

        allGems.forEach(function(gem) {
            gem.render();
        });

        this.x = -100000
        score ++;
        if (score > 4) {
            reset();
        };

    };
};

// Draw the player on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 85);
};

// Now instantiate your objects.



var enemy1 = new Enemy (-250, 58, Math.random()+(Math.floor(Math.random() * 2)));
var enemy2 = new Enemy (-250, 142, Math.random()+(Math.floor(Math.random() * 2)));
var enemy3 = new Enemy (-250, 225, Math.random()+(Math.floor(Math.random() * 2)));

var gem1 = new Gem (25, 35);
var gem2 = new Gem (126, 35);
var gem3 = new Gem (227, 35);
var gem4 = new Gem (328, 35);
var gem5 = new Gem (429, 35);

// Place all enemy objects in an array called allEnemies

allEnemies = [enemy1, enemy2, enemy3];
allGems = [gem1, gem2, gem3, gem4, gem5];

// Place the player object in a variable called player

var player = new Player();

function createPlayer() {
    player = new Player();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
