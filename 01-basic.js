var game = new Phaser.Game(800, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

var mySprite;
var bgLayer;
var bgCount = 1;
var bg1;
var bg2;
var bg3;
var bg4;
var bg5;
var i;

function preload() {
    bg1 = game.load.image('bg1', 'images/background1.png');
    bg2 = game.load.image('bg2', 'images/background2.png');
    bg3 = game.load.image('bg3', 'images/background3.png');
    bg4 = game.load.image('bg4', 'images/background4.png');
    bg5 = game.load.image('bg5', 'images/background5.png');

    // Load relevant portion of spritesheet.
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
}

function create() {
    // bgLayer = game.add.group();
    game.add.image(0, 0, 'bg1');

    mySprite = game.add.sprite(100, 200, 'character');
    mySprite.anchor.setTo(.5, 0);
    mySprite.scale.setTo(5, 5);
    
    mySprite.frame = 0;

    mySprite.animations.add('idle', [0], 10, true);
    
    mySprite.animations.add('walk', [1, 2, 3, 4, 5, 6], 10, true);
    
    mySprite.animations.play('walk');
    
    mySprite.animations.stop();
    
    mySprite.frame = 0;
}

function update() {

    //Move the sprite 4px/frame and play walking animation if the left or right key is down.
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        mySprite.x -= 4;
        mySprite.animations.play('walk');
        // mySprite.animations.play('walkLeft');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        mySprite.x += 4;
        mySprite.animations.play('walk');
        // mySprite.animations.play('walkRight');
    }
    else {
        mySprite.animations.play('idle');
    }

    //If the sprite makes it to the far side of the viewport (800px far), call nextRoom function.
    if (mySprite.x >= 800)
    {
        nextRoom();
    }
}

function nextRoom() {
    if (bgCount <=4) {
        // var bgToRemove = 'bg' + bgCount;
        // bgToRemove.destroy();
        console.log(bgCount);
        bgCount++;
        var bgToDisplay = 'bg' + bgCount;
        game.add.image(0, 0, bgToDisplay);
        console.log(bgCount);
        mySprite.x = 0;
        mySprite.bringToTop();
    }
    //Replace background image and reset sprite to starting position.
    // if ('bg'+levelNum+'.png'+1<=5){
    // bg1.destroy();
    // game.add.image(0, 0, 'kitchen');
    // mySprite.x = 0;
    // mySprite.bringToTop();
    // }
}
