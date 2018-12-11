var game = new Phaser.Game(800, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function main() {
}

var mySprite;
var count = 1;
var room1;
var room2;
var room3;
var room4;
var room5;
var item = 'item' + count;
var item1;
var item2;
var item3;
var item4;
var item5;
var dayCount = 1;

function preload() {
    room1 = game.load.image('room1', 'images/background1.png');
    room2 = game.load.image('room2', 'images/background2.png');
    room3 = game.load.image('room3', 'images/background3.png');
    room4 = game.load.image('room4', 'images/background4.png');
    room5 = game.load.image('room5', 'images/background5.png');
    
    // Load relevant portion of spritesheet.
    game.load.spritesheet('character', 'images/sprite.png', 32, 63, 7);
    game.load.spritesheet('item1', 'images/placeholder.jpg', 32, 63, 2);
    game.load.spritesheet('item2', 'images/placeholder.jpg', 80, 80, 2);
    game.load.spritesheet('item3', 'images/placeholder.jpg', 32, 63, 2);
    game.load.spritesheet('item4', 'images/placeholder.jpg', 200, 100, 2);
    game.load.spritesheet('item5', 'images/placeholder.jpg', 32, 63, 2);
}

function create() {
    game.add.image(0, 0, 'room1');
    item1 =  game.add.sprite (155, 300, 'item1');
    item2 = game.add.sprite (700, 50, 'item2');
    item3 = game.add.sprite (350, 400, 'item3');
    item4 = game.add.sprite (150, 200, 'item4');
    item5 = game.add.sprite (155, 300, 'item5');
    item1.visible = true;
    item2.visible = false;
    item3.visible = false;
    item4.visible = false;
    item5.visible = false;

    console.log(item1.x);

    mySprite = game.add.sprite(100, 200, 'character');
    // mySprite.anchor.setTo(.5, 0);
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

    //If the left side of the sprite is greater than the right side of the interactive item or if the right side of the sprite is less than the left side of the interactive item. If neither of these are true, then the interact function will be fired.
    if (! (mySprite.x > item.x + item.width || mySprite.x + mySprite.width < item.x)) {
        interact();
        // console.log('codebar help me');
    }

    if (count == 5) {
        gameOver();
    }
}

function nextRoom() {
    if (count <=4) {
        console.log('That was room #' + count);
        count++;
        var roomToDisplay = 'room' + count;
        game.add.image(0, 0, roomToDisplay);
        console.log(roomToDisplay);
        console.log('This is room #' + count);
        nextItem();
        mySprite.x = 0;
        mySprite.bringToTop();
    }
    else {
        timeLoop();
    }
}

function nextItem() {
    item.visible = false;
    count++;
    item.visible = true;
    console.log('This is item #' + count);
}
    //If the spacebar is pressed and the item count is less than or equal to 5, 
function interact() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && count<=5) {
        console.log('This item is #' + count);
        count++;
        var itemToDisplay = 'resultItem' + count;
        console.log('The next item is #' + count);
        mySprite.bringToTop();
    }
}

function timeLoop() {
    count=0;
    count++;
    console.log ('Number of days gone by: ' + count);
}

function gameOver() {
    console.log ('It took you ' + count + ' days to find all the ways you can be more present in your every day life. Thanks for getting involved in your own life. Hope you have had a good day!');
}