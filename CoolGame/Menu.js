boil.Menu = function(){};
var menu, ikea = null;

boil.Menu.prototype = {
    preload: function(){
        game.load.spritesheet('menu', 'Assets/Spritesheets/menuscreen.png',600,600);

    },
    create: function(){
        console.log('You are in the Menu state');
        //game.stage.backgroundColor = '#000000';
        var menu = game.add.sprite(150,150, 'menu');
        var load = menu.animations.add('load');
        menu.animations.play('load', 7, true);
        menu.scale.setTo (2,2);
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function(){
            game.state.start('bathroom');
        });
         
    },
    update: function(){
        
    }
};

function changeText(){
        console.log('ikea', ikea);
        if(textbox){
            textbox.destroy();
            textbox=null;
        }
        else if(ikea!== null){
            textbox = game.add.sprite(10,0,'textbox');
            textbox.scale.setTo(8,8);
            textbox.animations.add('float',[0,1,2,3,4,5]);
            textbox.animations.play('float',5,true);  
            
            //game.add.text(10, 10, 'hello');
            ikea = null;
        }
    }