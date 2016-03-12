boil.mBathroom = function(){};
    
var ptag, mBathroom;

boil.mBathroom.prototype = {
    preload: function(){
         game.load.tilemap('mBathroomTilemap', 'Assets/Backgrounds/mBathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('mBathroomTileset', 'Assets/Backgrounds/mBathroomTileset.png');
         game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',470,950);
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the mBathroom state');        
        var map = game.add.tilemap('mBathroomTilemap');
        map.addTilesetImage('mBathroomTileset');
        mBathroom = map.createLayer('mBathroom');
        ptag = game.add.sprite(game.world.centerX-650,game.world.centerY+300, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);
        //map.setCollisionBetween(1,25,'bathroom');   
             
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
    game.physics.arcade.collide(ptag,mBathroom)
        
    }
    };