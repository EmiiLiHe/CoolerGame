boil.bedroom = function(){};

var ptag, bedroom, x, y, flip;

boil.bedroom.prototype = {
    preload: function(){
        x = 90;
        y = 1100;
        flip = 0.45;
        game.load.tilemap('bedroomTilemap', 'Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bedroomTileset', 'Assets/Backgrounds/bedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
         
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bedroom state');        
        var map = game.add.tilemap('bedroomTilemap');
        map.addTilesetImage('bedroomTileset');
        bedroom = map.createLayer('bedroom');
        ptag = game.add.sprite(game.world.centerX+650,game.world.centerY+400, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
        game.physics.enable(ptag);
        ptag.scale.setTo(.45,.45);
        ptag.anchor.setTo(0.5);
        
        map.setCollisionBetween(1,45,'bedroom'); //ceiling
        map.setCollisionBetween(211,225,'bedroom') //bottom
        map.setCollision(103,118,'bedroom');
        map.setCollisionBetween(133,135,'bedroom');
        
//        map.setCollisionBetween(40,43,'bedroom');
//        map.setCollisionBetween(55,58,'bedroom'); //dresser
        
        map.setCollision(151,'bedroom');
        map.setCollision(151,165,'bedroom');
        map.setCollision(181,196,'bedroom'); //left
        
        map.setCollisionBetween(61,65,'bedroom');
        map.setCollisionBetween(76,80,'bedroom'); 
        map.setCollisionBetween(91,95,'bedroom');
        map.setCollisionBetween(106,110,'bedroom');//bed
        
        map.setCollisionBetween(121,126,'bedroom'); 
        map.setCollisionBetween(136,141,'bedroom'); 
        map.setCollisionBetween(151,156,'bedroom'); 
        map.setCollisionBetween(165,170,'bedroom'); //desk+chair
        
             
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
    game.physics.arcade.collide(ptag,bedroom)
    
     if (ptag.x>1500){
     changeState('hallway');
     };
    }
};