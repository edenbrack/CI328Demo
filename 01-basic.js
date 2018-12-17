var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

var mySprite;
var count = 1;
var interactions = 0;
var room1;
var room2;
var room3;
var room4;
var room5;
var item1;
var item2;
var item3;
var item4;
var item5;
var items;
var dayCount = 1;
var itemCount = count - 1;
var roomToDisplay;


function preload() {
    room1 = game.load.image('rm1', 'images/background1.png');
    room2 = game.load.image('rm2', 'images/background2.png');
    room3 = game.load.image('rm3', 'images/background3.png');
    room4 = game.load.image('rm4', 'images/background4.png');
    room5 = game.load.image('rm5', 'images/background5.png');
    
    // Load relevant portion of spritesheet.
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
    game.load.spritesheet('itm1', 'images/placeholder.jpg', 80, 80, 2);
    game.load.spritesheet('itm2', 'images/placeholder.jpg', 120, 120, 2);
    game.load.spritesheet('itm3', 'images/placeholder.jpg', 32, 63, 2);
    game.load.spritesheet('itm4', 'images/placeholder.jpg', 200, 100, 2);
    game.load.spritesheet('itm5', 'images/placeholder.jpg', 300, 600, 2);
}

function create() {
    startRoom = game.add.image(0, 0, 'rm1');

    item1 = game.add.sprite (193, 445, 'itm1');
    item2 = game.add.sprite (1040, 30, 'itm2');
    item3 = game.add.sprite (350, 400, 'itm3');
    item4 = game.add.sprite (150, 200, 'itm4');
    item5 = game.add.sprite (1000, 150, 'itm5');

    item1.visible = true;
    item2.visible = false;
    item3.visible = false;
    item4.visible = false;
    item5.visible = false;

    items = [item1, item2, item3, item4, item5];

    console.log(items);

    console.log(items[0].position);

    //items[itemCount].visible = false;

    mySprite = game.add.sprite(100, -50, 'character');
    mySprite.anchor.setTo(.5, 0);
    mySprite.scale.setTo(13, 13);
    
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
        mySprite.x -= 10;
        mySprite.animations.play('walk');
        mySprite.scale.x *= -1;
        // mySprite.scale.setTo(-mySprite.width, mySprite.height);
        // mySprite.animations.play('walkLeft');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        mySprite.x += 10;
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

    //If the left side of the sprite is greater than the right side of the interactive item or if the right side of the sprite is less than the left side of the interactive item. If neither of these are true, then the interact function will be fired.
    if (! (mySprite.x > items[itemCount].x + items[itemCount].width || mySprite.x + mySprite.width < items[itemCount].x)) {
        interact();
    }

    if (interactions == 5) {
        gameOver();
    }
}

function nextRoom() {
    if (count <=4) {
        hide();
        count++;
        show();
    }
    else if (count=5) {
        timeLoop();
    }
}

        
    // item1.visible = false;
    // console.log('This is item #' + count);
    // item2.visible = true;
    // // console.log(item);
    // item2.bringToTop();
    //If the spacebar is pressed and the interaction count is less than 5, add 1 to the interaction count and move to item's second frame to show the result of the interaction. 
function interact() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && interactions<5) {
        interactions++;
        console.log('You have interacted with ' + count + ' items!');
        item1.frame = 1;
    }
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