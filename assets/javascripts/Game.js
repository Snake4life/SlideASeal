/**
 * Created by Besitzer on 14.05.2014.
 */

define(['phaser', 'jquery', 'network', '_'],function (Phaser, $, network, _){
    var shipStripe;
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamefield', { preload: preload, create: create, update: update }, true);
    var name = "Peter";
    var sessionid = $("#sessionid").text();         // in the future parsed from the dom 

   function preload() {
        game.load.image('ship','../Images/Schiff.svg');

        // establish Network Connection 
        network.addGameStartEventListener(handelGameStart);     // Is called when two Players are in one Game
        network.addNewGameStateEventListener(handelGameState);  // Is called when a new GameState arrives
        network.addDisconnectEventListener(handelDisconnect);   // Is called when a Disconnect happend
        network.register(name, sessionid);
    }
    
    function create () {

        shipStripe = game.add.sprite(game.world.width, 80, 'ship');
        shipStripe.scale.setTo(0.9 , 0.9);
        game.physics.enable(shipStripe,Phaser.Physics.ARCADE);
        //shipStripe.body.velocity.x = -1000;
        game.add.tween(shipStripe).to({x:-20}, 5000, Phaser.Easing.Quadratic.Out, true, 0, false);

    }

    function update(){

    }

    // handel Slide
    handelSlide = function (m, n) {
        // Handle Click and than call this function.
        network.slide(m, n);
    }

    // handel GameStart
    function handelGameStart(data){
        console.log('!!! GameStart !!!');
        console.log(data);
    }

    // handel GameState
    function handelGameState(data){
        console.log('!!! New GameState !!!');
        console.log(data);
    }

    // handel Disconnect
    function handelDisconnect(){
        console.log('!!! Disconnect !!!');
    }

});
