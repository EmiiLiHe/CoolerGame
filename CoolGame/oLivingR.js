boil.oLivingR = function(){};

var ptag, oLivingR, sammy, x, y, flip, map, furniture, textbox, ikea, lastKeyPressed,text;

boil.oLivingR.prototype = {
    preload: function(){
        x = 105;
        y = 1810;
        flip = 0.45;
        game.load.tilemap('livingRTilemap', 'Assets/Backgrounds/livingRTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('livingRTileset', 'Assets/Backgrounds/livingRTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        game.load.spritesheet('sammy','Assets/Spritesheets/Sammy.png',1400,940);
         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,1400,2100);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the livingR state');        
        var map = game.add.tilemap('livingRTilemap');
        map.addTilesetImage('livingRTileset');
        oLivingR = map.createLayer('livingR');
        sammy = game.add.sprite(0,0,'sammy');
        sammy.animations.add('move',[0,1]);
        sammy.animations.play('move', 2, true);
        ptag = game.add.sprite(1295,555, 'ptag');
        
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
        game.physics.enable(ptag);
        ptag.scale.setTo(.45,.45);
        ptag.anchor.setTo(0.5);
        game.camera.follow(ptag);
        
        map.setCollisionBetween(1,14,'livingR');
        map.setCollisionBetween(15,28,'livingR');//ceiling
        
        map.setCollision(57,71,'livingR');
        map.setCollision(85,99,'livingR');
        map.setCollision(113,127,'livingR');
        map.setCollision(141,155,'livingR');
        map.setCollision(169,183,'livingR');
        map.setCollision(197,211,'livingR');//left
        
        //map.setCollisionBetween(122,126,'livingR');
        map.setCollisionBetween(136,140,'livingR');//entrance bit
        map.setCollisionBetween(150,154,'livingR');
//        map.setCollisionBetween(164,168,'livingR'); //TV
        map.setCollision(210,224,'livingR'); //right
        
        //map.setCollisionBetween(29,37,'livingR');
//        map.setCollisionBetween(42,50,'livingR')//shelf&sammy
//        
//        map.setCollisionBetween(253,258,'livingR');
//        map.setCollisionBetween(245,252,'livingR');//bottom    
        
          furniture = {
            shelf: [
                [42, 46]
            ],
            sammy: [
                [47, 50]
            ],
            TV: [
                [164,168]
            ],
            table: [
                [253,258]
            ],
            couch: [
                [245,252]
            ]
        };
        this.setupFurniture()
   text = {
            shelf: {
                dialog: [
                    'a collection of books you got from your mom, two pictures of you and your parents, and an old track and field trophy.',
                ],
                sprite: 'null'     //'talkfrige'
            },
            sammy:{
                dialog: [
                    'His name is Sammy. All he does is blow bubbles and swim.',                
                         ],
                sprite: 'null'
            },
            TV:{
                dialog: [
                    'your bathtub doesn’t work.',
                    'The pipes are connected to your toilet.',
                    'Which clogged.'
                ],
                sprite: 'null'
            },
            table: {
                dialog: [
                    'you are actually extremely allergic to the pollen of this plant in particular.',
                    'Hence the tissues.'
                ],
                sprite: 'null' 
            },
            couch: {
                 dialog: [
                     'The couch is only for show.',
                     'It’s actually extremely uncomfortable to sit on'
                 ],
                sprite: 'null'
   },
        };
    },
update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            ptag.body.velocity.x=300;
            if (!game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                ptag.animations.play('walk', 7, true);
            }
            ptag.scale.setTo(-.45,0.45);
            ikea = null;
            lastKeyPressed = 'right';
           }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            ptag.body.velocity.x=-300;
            if (!game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                ptag.animations.play('walk', 7, true);
            }
            ptag.scale.setTo(.45,.45);
            ikea = null;
            lastKeyPressed = 'left';
           }
        else{
            ptag.animations.stop('walk');
            ptag.body.velocity.x=0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            ptag.body.velocity.y =-300;
            ptag.animations.play('walkup',7,true);   
            ikea = null;
            lastKeyPressed = 'up';
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            ptag.body.velocity.y =300;
            ptag.animations.play('walk',7,true);
            ikea = null;
            lastKeyPressed = 'down';
        }
        else{
            ptag.body.velocity.y=0;
        }
            
        var self = this;
        game.physics.arcade.collide(ptag, bedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
     if (ptag.x> 1350){
     changeState('hallway');
     };
     if (!game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (lastKeyPressed == 'right') {
                ptag.frame = 0;
                ptag.scale.setTo(-.45,0.45);
            } else if (lastKeyPressed == 'up') {
                ptag.frame = 8;
            } else if (lastKeyPressed == 'left'){
                ptag.frame = 0;
            } 
        }
    },
    setupFurniture: function() {
        var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                map.setCollisionBetween(tiles[0],tiles[1],'livingR');
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
         
     }
};