var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game', { preload: preload, create: create });

function main() {
}

function preload() {
    game.load.image('kitchen', 'images/kitchen.png');
    game.load.image('diningroom', 'images/diningroom.png');
    game.load.image('party', 'images/xmas.png');
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
}

function create() {
    var text = this.add.text(50, 50, "Phaser is working!", { fontSize: '32px', fill: '#FFF' });
    
    var bgParty = game.add.image(0, 0, 'party');
    
    var sprite = game.add.sprite(0, 0, 'character');
    
    sprite.animations.add('right', [1, 2, 3, 4, 5, 6], 10, true);
    
    sprite.animations.play('right');
}
