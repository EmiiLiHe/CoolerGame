boil.bathroom = function(){};
//var option = false;
//var firstText;
//var moreText;
//var words = false;
//var textJ;
//var textbox;

var ptag, bathroom, x, y, flip;

boil.bathroom.prototype = {
    preload: function(){
        x = 1370;
        y = 1945;
        flip = 0.45;
        game.load.tilemap('bathroomTilemap', 'Assets/Backgrounds/bathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bathroomTileset', 'Assets/Backgrounds/bathroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
         
    },
    create: function(){
//        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//        enter.onDown.add(this.changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500, 1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bathroom state');        
        var map = game.add.tilemap('bathroomTilemap');
        map.addTilesetImage('bathroomTileset');
        bathroom = map.createLayer('bathroom');
        ptag = game.add.sprite(game.world.centerX-650, 1065, 'ptag');
        ptag.animations.add('walkdown',[0,1,2,3]);
        ptag.animations.add('walkup',[4,5,6,7]);
        ptag.animations.add('walk',[8,9,10,11,12,13,14,15]);
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);
        map.setCollisionBetween(1,30,'bathroom'); //ceiling
        map.setCollisionBetween(196,225,'bathroom') //bottom
        
        map.setCollision(31,46, 'bathroom');
        map.setCollision(61,76,'bathroom');
        map.setCollision(91,'bathroom'); //left
        
        map.setCollision(90,106,'bathroom');
        
        map.setCollision(135,'bathroom');
        map.setCollision(150,165,'bathroom');
        map.setCollision(180,195,'bathroom');
        map.setCollision(210,225,'bathroom');
        map.setCollisionBetween(49,50,'bathroom'); //toilet
        map.setCollisionBetween(38,39,'bathroom'); //sink
        
        map.setCollisionBetween(42,45,'bathroom');//bath
        map.setCollisionBetween(57,60,'bathroom'); //bath
        map.setCollisionBetween(72,75,'bathroom'); //bath
        map.setCollisionBetween(87,90,'bathroom'); //bath
        map.setCollisionBetween(102,105,'bathroom'); //bath
             
},
update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        ptag.body.velocity.x=300;
        ptag.animations.play('walk', 11, true);
        ptag.scale.setTo(-.45,.45)
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        ptag.body.velocity.x=-300;
        ptag.animations.play('walk', 11, true);
        ptag.scale.setTo(.45,.45)
       }
    else{
        ptag.animations.stop('walk');
        ptag.frame = 0;
        ptag.body.velocity.x=0;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        ptag.body.velocity.y =-300;
        ptag.animations.play('walkup',6,true);
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        ptag.body.velocity.y =300;
        ptag.animations.play('walkdown',6,true);
    }
    else{
        ptag.body.velocity.y=0;
}
    game.physics.arcade.collide(ptag,bathroom)
    
     if (ptag.x< 15){
        changeState('hallway');  
     };
    }
};