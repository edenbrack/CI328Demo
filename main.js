var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

var mySprite;
var count = 0;
var solid;
var button;
var room1;
var room2;
var room3;
var room4;
var rooms;
var item1;
var item2;
var item3;
var item4;
var items;
var success;
var dayCount = 1;
var enter;
var spacebar;
var interactions = 0;
var walkLeftButton;
var walkRightButton;

function preload() {
    game.load.image('rm1', 'assets/images/background1.png');
    game.load.image('rm2', 'assets/images/background2.png');
    game.load.image('rm3', 'assets/images/background3.png');
    game.load.image('rm4', 'assets/images/background4.png');
    game.load.image('sld', 'assets/images/solid.png');
    game.load.image('button', 'assets/images/button.png');

    game.load.spritesheet('sound', 'assets/images/sound.png', 100, 80, 2);
    game.load.spritesheet('character', 'assets/images/sprite.png', 330, 600, 8);
    game.load.spritesheet('itm1', 'assets/images/item1.png', 100, 120, 2);
    game.load.spritesheet('itm2', 'assets/images/item2.png', 120, 120, 2);
    game.load.spritesheet('itm3', 'assets/images/item3.png', 80, 90, 2);
    game.load.spritesheet('itm4', 'assets/images/item4.png', 210, 600, 2);

    game.load.audio('success', 'assets/sounds/success.wav');
}

function create() {
    room1 = game.add.image(0, 0, 'rm1');
    room2 = game.add.image(0, 0, 'rm2');
    room3 = game.add.image(0, 0, 'rm3');
    room4 = game.add.image(0, 0, 'rm4');

    room1.visible = true;
    room2.visible = false;
    room3.visible = false;
    room4.visible = false;

    rooms = [room1, room2, room3, room4];

    item1 = game.add.sprite(193, 415, 'itm1');
    item2 = game.add.sprite(1000, 29, 'itm2');
    item3 = game.add.sprite(800, 530, 'itm3');
    item4 = game.add.sprite(1000, 210, 'itm4');

    item1.visible = true;
    item2.visible = false;
    item3.visible = false;
    item4.visible = false;

    items = [item1, item2, item3, item4];

    item1.frame = 0;
    item2.frame = 0;
    item3.frame = 0;
    item4.frame = 0;

    items[count].inputEnabled = true;
    items[count].events.onInputDown.add(interact, this);

    sound = game.add.sprite(1270, 10, 'sound');
    sound.inputEnabled = true;
    sound.events.onInputDown.add(soundOnOff, this);

    success = game.add.audio('success');

    mySprite = game.add.sprite(250, 200, 'character');
    mySprite.anchor.setTo(.5, 0);
    
    mySprite.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 15, true);

    solid = game.add.image(0, 0, 'sld');
    document.getElementById('tallyText').style.display = 'none';

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    button = game.add.button(game.world.centerX - 100, 560, 'button', playState, this);
    button.inputEnabled = true;
    button.events.onInputDown.add(playState, this);
    enter.onDown.add(playState);
}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.activePointer.isDown && game.input.activePointer.x < mySprite.x - 10)
    {
        walkLeft();
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.activePointer.isDown && game.input.activePointer.x > mySprite.x + 10)
    {
        walkRight();
    }
    else {
        idle();
    }

    if (mySprite.x >= 1500)
    {
        nextRoom();
    }

    if (mySprite.x > items[count].x - 50 && mySprite.x < items[count].x + items[count].width + 50) {
        spacebar.onDown.add(interact);
    }
    else {
        spacebar.onDown.removeAll();
    }

    if (interactions == 4) {
        setTimeout(gameOver, 800);
    }
}

function walkLeft() {
    mySprite.x -= 7;
    mySprite.animations.play('walk');
    mySprite.scale.x = -1;
}

function walkRight() {
    mySprite.x += 7;
    mySprite.animations.play('walk');
    mySprite.scale.x = 1;
}

function idle() {
    mySprite.frame = 2;
}

function soundOnOff() {
    if (sound.frame == 0) {
        game.sound.mute = true; 
        sound.frame = 1;
    }
    else if (sound.frame == 1) {
        game.sound.mute = false;
        sound.frame = 0;
    }
}

function nextRoom() {
    if (count <=2) {
        hide();
        count++;
        show();
    }
    else {
        timeLoop();
    }
}

function timeLoop() {
    console.log ('Number of days gone by: ' + dayCount);
    dayCount++;
    hide();
    count=0;
    show();
}

function hide() {
    rooms[count].visible = false;
    items[count].visible = false;
}

function show() {
    rooms[count].visible = true;
    items[count].visible = true;
    items[count].bringToTop();
    items[count].inputEnabled = true;
    items[count].events.onInputDown.add(interact, this);
    mySprite.x = 0;
    mySprite.bringToTop();
}

function interact() {
        interactions++;
        items[count].frame = 1;
        success.play();
        document.getElementById('currentTally').innerHTML = interactions;
}

function playState() {
    solid.visible = false;
    button.visible = false;
    document.getElementById('introText').style.display = 'none';
    document.getElementById('tallyText').style.display = 'inline';
    rooms[count].visible = true;
    items[count].visible = true;
    mySprite.visible = true;
    game.paused = false;
}

function pauseState() {
    document.getElementById('tallyText').style.display = 'none';
    rooms[count].visible = false;
    items[count].visible = false;
    mySprite.visible = false;
    game.paused = true;
    solid.visible = true;
}

function gameOver() {
    pauseState();
    document.getElementById('gameOverText').innerHTML = ('It took you ' + dayCount + ' days to find all the ways you can be more present in your every day life. Thanks for getting involved in your own life. Hope you have had a good day!');
}