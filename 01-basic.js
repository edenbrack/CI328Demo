function main() {

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            create: create
        }
    };

    var game = new Phaser.Game(config);
}

function preload() {
    game.load.image('kitchen', 'images/kitchen.png');
    game.load.image('diningroom', 'images/diningroom.png');
    game.load.image('party', 'images/xmas.png');
}

function create() {
    var text = this.add.text(50, 50, "Phaser is working!", { fontSize: '32px', fill: '#FFF' });
        
    game.add.sprite(0, 0, 'party');
}
