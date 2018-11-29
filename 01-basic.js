var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game', { preload: preload, create: create });

function main() {
}

function preload() {
    game.load.image('kitchen', 'images/kitchen.png');
    game.load.image('diningroom', 'images/diningroom.png');
    game.load.image('party', 'images/xmas.png');
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
}

var up;
var down;
var left;
var right;

function create() {
    var bgParty = game.add.image(0, 0, 'party');
    
    var mySprite = game.add.sprite(0, 0, 'character');
    mySprite.scale.setTo(5, 5);
    
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    mySprite.frame = 0;
    
    mySprite.animations.add('right', [1, 2, 3, 4, 5, 6], 10, true);
    
//     mySprite.animations.play('right');
    
    mySprite.animations.stop();
    
    mySprite.frame = 0;
}

function update() {

    if (up.isDown)
    {
        mySprite.y--;
    }
    else if (down.isDown)
    {
        mySprite.y++;
    }

    if (left.isDown)
    {
        mySprite.x--;
    }
    else if (right.isDown)
    {
        mySprite.x++;
        mySprite.animations.play('right');
    }

}
