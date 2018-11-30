var game = new Phaser.Game(800, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

function preload() {
    game.load.image('bedroom', 'images/background1.png');
    game.load.image('kitchen', 'images/background2.png');
    game.load.image('diningroom', 'images/background3.png');
    game.load.image('outdoors', 'images/background4.png');
    game.load.image('party', 'images/background5.png');
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
}

var mySprite;
var bg1;

function create() {
    bg1 = game.add.image(0, 0, 'bedroom');

    mySprite = game.add.sprite(0, 200, 'character');
    mySprite.anchor.setTo(.5, 0);
    mySprite.scale.setTo(5, 5);
    
    mySprite.frame = 0;
    
    mySprite.animations.add('walk', [1, 2, 3, 4, 5, 6], 10, true);
    
    mySprite.animations.play('walk');
    
    mySprite.animations.stop();
    
    mySprite.frame = 0;
}

function update() {
    
    if (game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, 50)) 
    {
        mySprite.scale.x *= -1;
    }
    else if (game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, 50))
    {
        mySprite.scale.x *= 1;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        mySprite.x -= 4;
        mySprite.animations.play('walk');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        mySprite.x += 4;
        mySprite.animations.play('walk');
    }

    if (mySprite.x >= 800)
    {
        nextLevel();
    }
}

function nextLevel(levelNum) {
    // if ('bg'+levelNum+'.png'+1<=5){
    bg1.destroy();
    game.add.image(0, 0, 'kitchen');
    mySprite.x = 0;
    mySprite.bringToTop();
    // }
}
