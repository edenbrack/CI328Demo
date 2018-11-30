var game = new Phaser.Game(800, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

function preload() {
    game.load.image('kitchen', 'images/kitchen.png');
    game.load.image('diningroom', 'images/diningroom.png');
    game.load.image('party', 'images/xmas.png');
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
}

var mySprite;
var bgParty;

function create() {
    bgParty = game.add.image(0, 0, 'party');

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
    bgParty.destroy();
    game.add.image(0, 0, 'diningroom');
    mySprite.x = 0;
    mySprite.bringToTop();
    // }
}
