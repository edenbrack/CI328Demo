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
// var key;

function create() {
    var bgParty = game.add.image(0, 0, 'party');
    
    mySprite = game.add.sprite(0, 300, 'character');
    mySprite.scale.setTo(5, 5);
    
    mySprite.frame = 0;
    
    mySprite.animations.add('right', [1, 2, 3, 4, 5, 6], 10, true);
    
    mySprite.animations.play('right');
    
    mySprite.animations.stop();
    
    mySprite.frame = 0;
//     key = game.input.keyboard.createCursorKeys();
}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        mySprite.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        mySprite.x += 4;
        console.log('help me');
        mySprite.animations.play('right');
    }

}
