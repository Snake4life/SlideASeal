/**
 * Created by Besitzer on 14.05.2014.
 */

define(['Phaser', 'jquery', './Panel', 'network', '_', 'app/Gamefield', './Player'],function (Phaser, $, Panel, network, _,Gamefield,Player){

    var shipStripe;
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamefield', { preload: preload, create: create, update: update}, true);
    var gamefield;
    var registername = $("#registername").text(); 
    var sessionid = $("#sessionid").text();


    //Define Class extension of the game
    game._SAS_currentPlayer = null
    game.getCurrentPlayer = function(){
        return game._SAS_currentPlayer
    }
    game.setCurrentPlayer = function(player){
        game._SAS_currentPlayer = player
    }
    game.normalizeUrl = function(relativeUrl){
        return '//'+window.location.host+ relativeUrl
    }


   function preload() {
        Panel.loadAllTypes(game)
        game.load.image('ship',game.normalizeUrl('/Images/Schiff.svg'));
        game.load.spritesheet('Robbe', game.normalizeUrl('/Images/Robbe.png'), 520, 520, 17);
        game.load.spritesheet('Robbe2',game.normalizeUrl('/Images/RobbeBall.png'), 520, 520, 18);


        game.load.audio("beachWithGulls",game.normalizeUrl('/sounds/beach_with_gulls.ogg'),true)
   }
    
    function create () {
        game.physics.startSystem(Phaser.Physics.P2JS);
        shipStripe = game.add.sprite(game.world.width, -150, 'ship');

        beachSound = game.sound.play("beachWithGulls",1,true)
        player = new Player(registername,sessionid)
        gamefield = new Gamefield(game,player)

        game.sound.volume = 0

        game.physics.p2.restitution = 0.0;
        game.physics.p2.gravity.y = 300;
        window.test = gamefield
        setTimeout(gamefield.testFunction,1000)

        network.addGameStartEventListener(handelGameStart);     // is called when the game starts
        network.addNewGameStateEventListener(handelGameState);  // is called when a new GameState arrives
        network.addScoreEventListener(handelScore);             // is called when new Score information are available
        network.addDisconnectEventListener(handelDisconnect);   // is called when a disconnect happend
        network.register(registername, sessionid);                      // register the client at the server and join a session

        //test = gamefield.children[0].getBackgroundSprite()
        //test2 = gamefield.children[1].getBackgroundSprite()





        game.add.tween(shipStripe).to({x:-100}, 5000, Phaser.Easing.Quadratic.Out, true, 0, false);
        game.add.tween(shipStripe.scale).to({x:1.25, y:1.25}, 5000, Phaser.Easing.Quadratic.Out, true, 0, false);

        robbe_eins = game.add.sprite(630, 400, 'Robbe');
        robbe = game.add.sprite(600, 430, 'Robbe2');

        robbe.scale.set(0.3);
        robbe_eins.scale.set(0.28);
        anim = robbe.animations.add('walk');
        anim.play( 13, true );
        anim_eins = robbe_eins.animations.add('walk');
        anim_eins.play( 10, true );
        anim = robbe.animations.add('walk');
        anim.play( 13, true );
    }

    function update(){

        if(  game.sound.volume < 1){
            game.sound.volume =  game.sound.volume +0.0001
        }




    }



    // handel Slide
    handelSlide = function (m, n) {
        // Handle Click and than call this function.
        network.slide(m, n);
    }

    // handel GameStart
    function handelGameStart(data){

        if (gamefield.getSize() == 0){
            gamefield.createGamefield(data.field)
        }
        console.log('!!! GameStart !!!');
        console.log(data);
        console.log("The next Panel is: " + data.nextPanels[0]);
        for(var i = 0; i < 5; i++) {
            console.log("| " + data.field[i][0] + " | " + data.field[i][1] + " | " + data.field[i][2] + " | " + data.field[i][3] + " | " + data.field[i][4] + " |")
            console.log("|---|---|---|---|---|")
        }
    }

    // handel GameState
    function handelGameState(data){


        if (gamefield.getSize() == 0){
            gamefield.createGamefield(data.field)
        }
        if (data.actions.length > 0 ){
            gamefield.handleNetworkActions(data.actions)
        }
        //@tdo set current player
        console.log('!!! New GameState !!!');
        console.log(data);
        console.log("The next Panel is: " + data.nextPanels[0]);
        for(var i = 0; i < 5; i++) {
            console.log("| " + data.field[i][0] + " | " + data.field[i][1] + " | " + data.field[i][2] + " | " + data.field[i][3] + " | " + data.field[i][4] + " |")
            console.log("|---|---|---|---|---|")
        }

    }

   // handel Score
    function handelScore(data){
        console.log('!!! Score !!!');
        console.log("you score is: " + data.you.score);
        console.log("rival score is: " + data.rival.score);
        //console.log(data);
    }

    // handel Disconnect
    function handelDisconnect(){
        console.log('!!! Disconnect !!!');
    }

});
