boil.bathroom = function(){};

var ptag, bathroom;

boil.bathroom.prototype = {
    preload: function(){
        game.load.tilemap('bathroomTilemap', 'Assets/Backgrounds/bathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bathroomTileset', 'Assets/Backgrounds/bathroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',470,950);
         
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bathroom state');        
        var map = game.add.tilemap('bathroomTilemap');
        map.addTilesetImage('bathroomTileset');
        bathroom = map.createLayer('bathroom');
        ptag = game.add.sprite(game.world.centerX-650,game.world.centerY+300, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
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
        ptag.animations.play('walk', 20, true);
        ptag.scale.setTo(-.45,.45)
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        ptag.body.velocity.x=-300;
        ptag.animations.play('walk', 20, true);
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
    game.physics.arcade.collide(ptag,bathroom)
    
     if (ptag.x< 15){
     changeState('hallway');
     };
    }
};