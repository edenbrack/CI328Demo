var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

var mySprite;
var count = 1;
var room1;
var room2;
var room3;
var room4;
var item1;
var item2;
var item3;
var item4;
var items;
var dayCount = 1;
var itemCount = count - 1;
var roomToDisplay;
var spacebar;
var interactions = 0;

function preload() {
    room1 = game.load.image('rm1', 'images/background1.png');
    room2 = game.load.image('rm2', 'images/background2.png');
    room3 = game.load.image('rm3', 'images/background4.png');
    room4 = game.load.image('rm4', 'images/background5.png');
    
    // Load relevant portion of spritesheet.
    game.load.spritesheet('character', 'images/sprite.png', 330, 600, 8);
    game.load.spritesheet('itm1', 'images/background5.png', 80, 80, 2);
    game.load.spritesheet('itm2', 'images/item2.png', 120, 120, 2);
    game.load.spritesheet('itm3', 'images/background5.png', 400, 150, 2);
    game.load.spritesheet('itm4', 'images/background5.png', 300, 600, 2);
}

function create() {
    startRoom = game.add.image(0, 0, 'rm1');

    item1 = game.add.sprite (193, 445, 'itm1');
    item2 = game.add.sprite (1040, 38, 'itm2');
    item3 = game.add.sprite (800, 600, 'itm3');
    item4 = game.add.sprite (1000, 150, 'itm4');

    item1.visible = true;
    item2.visible = false;
    item3.visible = false;
    item4.visible = false;

    items = [item1, item2, item3, item4];

    item1.frame = 0;
    item2.frame = 0;
    item3.frame = 0;
    item4.frame = 0;

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    mySprite = game.add.sprite(250, 200, 'character');
    mySprite.anchor.setTo(.5, 0);
    
    mySprite.frame = 0;

    mySprite.animations.add('idle', [3], 10, true);
    
    mySprite.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 15, true);
    
    mySprite.animations.play('walk');
    
    mySprite.animations.stop();
    
    mySprite.frame = 1;
}

function update() {

    //Move the sprite 4px/frame and play walking animation if the left or right key is down.
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        mySprite.x -= 7;
        mySprite.animations.play('walk');
        mySprite.scale.x *= -1;
        // mySprite.scale.setTo(-mySprite.width, mySprite.height);
        // mySprite.animations.play('walkLeft');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        mySprite.x += 7;
        mySprite.animations.play('walk');
        mySprite.scale.x *= 1;
        // mySprite.scale.setTo(mySprite.width, mySprite.height);
        // mySprite.animations.play('walkRight');
    }
    else {
        mySprite.animations.play('idle');
    }

    //If the sprite makes it to the far side of the viewport (800px far), call nextRoom function.
    if (mySprite.x >= 1800)
    {
        nextRoom();
    }

    if (mySprite.x > items[itemCount].x - 100 && mySprite.x < items[itemCount].x + items[itemCount].width + 100) {
        spacebar.onDown.add(interact);
        console.log('am i working?');
    }

    // if (interactions = 5) {
    //     gameOver();
    // }
}

function nextRoom() {
    if (count <=3) {
        hide();
        count++;
        show();
    }
    else if (count=4) {
        timeLoop();
    }
}

function interact() {
        interactions++;
        items[itemCount].frame = 1;
        console.log('the item count is ' + itemCount);
}

function timeLoop() {
    console.log ('Number of days gone by: ' + dayCount);
    dayCount++;
    hide();
    count=1;
    show();
}

function hide() {
    console.log('That was room #' + count);
    items[itemCount].visible = false;
}

function show() {
    console.log('this is room count ' + count);
    itemCount = count - 1;
    roomToDisplay = 'rm' + count;
    game.add.image(0, 0, roomToDisplay);
    items[itemCount].visible = true;
    items[itemCount].bringToTop();
    mySprite.x = 0;
    mySprite.bringToTop();
}

function gameOver() {
    console.log ('It took you ' + count + ' days to find all the ways you can be more present in your every day life. Thanks for getting involved in your own life. Hope you have had a good day!');
}