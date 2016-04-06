boil.bathroom = function(){};
//var option = false;
//var firstText;
//var moreText;
//var words = false;
//var textJ;
//var textbox;

var ptag, bathroom, x, y, flip, map, furniture, ikea, textbox;
//ikea is whether or not you're near furniture
boil.bathroom.prototype = {
    preload: function(){
        x = 1370;
        y = 1945;
        flip = 0.45;
        game.load.tilemap('bathroomTilemap', 'Assets/Backgrounds/bathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bathroomTileset', 'Assets/Backgrounds/bathroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        game.load.spritesheet('textbox', 'Assets/Spritesheets/textbox.png', 147,47);
         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500, 1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bathroom state');        
        map = game.add.tilemap('bathroomTilemap');
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
        
        
        furniture = {
            toilet: [
                [49, 50]
            ],
            sink: [
                [38,39]
            ],
            bath: [
                [42,45],
                [57,60],
                [72,75],
                [87,90],
                [102,105]
            ]
        };
        this.setupFurniture();
             
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            ptag.body.velocity.x=300;
            ptag.animations.play('walk', 11, true);
            ptag.scale.setTo(-.45,.45);
            ikea = null;
           }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            ptag.body.velocity.x=-300;
            ptag.animations.play('walk', 11, true);
            ptag.scale.setTo(.45,.45);
            ikea = null;
           }
        else{
            ptag.animations.stop('walk');
            ptag.frame = 0;
            ptag.body.velocity.x=0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            ptag.body.velocity.y =-300;
            ptag.animations.play('walkup',6,true);
            ikea = null;
           }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            ptag.body.velocity.y =300;
            ptag.animations.play('walkdown',6,true);
            ikea = null;
        }
        else{
            ptag.body.velocity.y=0;
        }
        
        var self = this;
        game.physics.arcade.collide(ptag,bathroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    

         if (ptag.x< 15){
            changeState('hallway');  
         };
    },
    
    setupFurniture: function() {
        var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                map.setCollisionBetween(tiles[0],tiles[1],'bathroom');
            }
        }
    },
     furnitureType: function(index){
         var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                if (index<=tiles[1] && index>=tiles[0]){
                    return key
                }
            }
        }
         
     },
    changeText: function(){
        console.log(ikea);
        if(textbox){
            textbox.destroy();
            textbox=null;
        }
        else if(ikea!== null){
            textbox = game.add.sprite(0,0,'textbox');
            textbox.scale.setTo(8,8);
            textbox.animations.add('float',[0,1,2,3,4,5]);
            textbox.animations.play('float',5,true);  
            
            //game.add.text(10, 10, 'hello');
        }
    }
     
};
    
 