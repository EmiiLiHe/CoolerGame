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
        
        
        map.setCollisionBetween(1,90,'kitchen'); //ceiling
        map.setCollisionBetween(841,900,'kitchen') //bottom
  
        map.setCollision(365,395,'kitchen');
        map.setCollision(425,455,'kitchen'); 
        map.setCollisionBetween(481,485, 'kitchen');   //left
        map.setCollisionBetween(185,198,'kitchen'); // table & chair
        map.setCollisionBetween(146,150,'kitchen');//cupboard
        map.setCollisionBetween(524,540,'kitchen');//counters
        
        map.setCollision(30,60,'kitchen');
        map.setCollision(90,120,'kitchen');
        map.setCollision(150,180,'kitchen');
        map.setCollision(300,330,'kitchen');
        map.setCollision(360,390,'kitchen');
        map.setCollision(690,720,'kitchen');
        map.setCollision(750,780,'kitchen');
        map.setCollision(810,840,'kitchen');
        map.setCollision(870,900,'kitchen');//right
              
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