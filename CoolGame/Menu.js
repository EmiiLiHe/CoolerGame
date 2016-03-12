boil.Menu = function(){};
var menu;

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