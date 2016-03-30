boil.hallway = function(){};

var ptag, hallway;

boil.hallway.prototype = {
    init: function(){
        console.log(x + ' ' + y)
    },
    preload: function(){
        game.load.tilemap('hallwayTilemap', 'Assets/Backgrounds/hallwayTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('hallwayTileset', 'Assets/Backgrounds/hallwayTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
         
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500, 3000);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the hallway state');        
        var map = game.add.tilemap('hallwayTilemap');
        map.addTilesetImage('hallwayTileset');
        bathroom = map.createLayer('hallway');
        ptag = game.add.sprite(x, y, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
        game.physics.enable(ptag);
        ptag.scale.setTo(flip,.45);
        ptag.anchor.setTo(0.5);
        //ptag.body.collideWorldBounds = true;
        //game.camera.deadzone = new Phaser.Rectangle(1000,1000,1000,1000);
        game.camera.follow(ptag);
        //game.camera.deadzone.setTo(1000,1000,1000,1000);
        //map.setCollisionBetween(1,25,'hallway');       
        
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
    game.physics.arcade.collide(ptag,hallway)
    
    if (ptag.x>1475 && ptag.y<900){
     changeState('kitchen');
     }
    if (ptag.x>1475 && ptag.y>1790){
        changeState('bathroom');
    }
    if (ptag.x<20 && ptag.y<1120){
        changeState('bedroom');
    }
    if (ptag.x<20 && ptag.y>1695){
        changeState('livingR')
    }
    }
};