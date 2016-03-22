boil.kitchen = function(){};

var ptag, kitchen,counters

boil.kitchen.prototype = {
    preload: function(){
        game.load.tilemap('kitchenTilemap', 'Assets/Backgrounds/kitchenTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('kitchenTileset', 'Assets/Backgrounds/kitchenTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        game.load.image('counters','Assets/Backgrounds/counters.png',1500,1500);
         
    },
create: function(){
        x = 1370;
        y = 875;
        flip = 0.45;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the kitchen state');        
        var map = game.add.tilemap('kitchenTilemap');
        map.addTilesetImage('kitchenTileset');
        kitchen = map.createLayer('kitchen');
        ptag = game.add.sprite(110,1170, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);
        game.add.sprite(0,0,'counters');
        
//        map.setCollisionBetween(1,30,'kitchen'); //ceiling
//        map.setCollisionBetween(211,225,'kitchen') //bottom
//        
//        map.setCollision(33,48, 'kitchen');
//        map.setCollision(63,78,'kitchen');
//        map.setCollision(93,108,'kitchen');
//        map.setCollisionBetween(121,123, 'kitchen');//left
//       
//        map.setCollisionBetween(127,135,'kitchen');
//        
//        map.setCollision(135,'kitchen');
//        map.setCollision(150,165,'kitchen');
//        map.setCollision(180,195,'kitchen');
//        map.setCollision(210,225,'kitchen');
   
        
             
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
        //if(ptag.y < 1500 ){
            //ptag.y = 1500;
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        ptag.body.velocity.y =300;
    }
    else{
        ptag.body.velocity.y=0;
}
    game.physics.arcade.collide(ptag,kitchen)
    
     if (ptag.x< 20){
        changeState('hallway', 1385, 885);
     };
    }
};