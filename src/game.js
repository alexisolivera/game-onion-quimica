    var config = {
        type: Phaser.AUTO,
        parent: 'juego',
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var platforms;
    var score = 0;
    var puntaje = 0;
    var puntajeText;
    var elementText;
    var stars8;
    var stars9;
    var stars10;
    var plataformas = false;

    /*var stars2;
    var stars3;*/

    var game = new Phaser.Game(config);



    function preload ()
    {
        this.load.image('laboratorio','assets/laboratorio.png');
        this.load.image ('estante', 'assets/estanteria.png');
        this.load.image ('piso', 'assets/piso.png');
        this.load.image ('uno', 'assets/stars1.png');
        this.load.image ('dos', 'assets/stars2.png');
        this.load.image ('tres', 'assets/stars3.png');
        this.load.image ('cuatro', 'assets/stars4.png');
        this.load.image ('cinco', 'assets/stars5.png');
        this.load.image ('seis', 'assets/stars6.png');
        this.load.image ('siete', 'assets/stars7.png');
        this.load.image ('ocho', 'assets/stars8.png');
        this.load.image ('nueve', 'assets/stars9.png');
        this.load.image ('diez', 'assets/stars10.png');
        this.load.image ('once', 'assets/stars11.png');
        this.load.image ('doce', 'assets/stars12.png');
        this.load.image ('trece', 'assets/stars13.png');
        this.load.image ('catorce', 'assets/stars14.png');
        this.load.image ('quince', 'assets/stars15.png');
        this.load.image ('dieciseis', 'assets/stars16.png');
        this.load.image ('diecisiete', 'assets/stars17.png');
        this.load.image ('dieciocho', 'assets/stars18.png');
        this.load.image ('diecinueve', 'assets/stars19.png');
        this.load.image ('veinte', 'assets/stars20.png');
        this.load.image ('veintiuno', 'assets/stars21.png');
        this.load.image('mesa', 'assets/mesa.png');
        this.load.image('caja', 'assets/caja.png');
        this.load.image ('bomb', 'assets/bomb.png');
        this.load.image('derecha','assets/right.png');
        this.load.image('microscopio','assets/microscopios.png');
        this.load.image('tubo','assets/tubosdeensayo.png');
        this.load.spritesheet ('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48} );
        this.load.audio('principal', 'assets/Song.mp3');
        this.load.audio('Esonido', 'assets/EstrellaSonido.mp3');
        this.load.audio('Bomba', 'assets/Bomb.mp3');
        //this.load.spritesheet ('starse', 'assets/starsheet.png', {frameWidth: 24, frameHeight: 22, endFrame: 1})
    }

    function create ()
    {
       
        fondo=this.add.image(400, 300, 'laboratorio');

        this.input.addPointer(2);

   
        platforms = this.physics.add.staticGroup();
        //let soundSample = this.sound.add('principal', 'loop');
        //soundSample.play();
        //soundSample.setLoop('loop');
        sonidoEstrella =  this.sound.add('Esonido');
        sonidoBomba = this.sound.add('Bomba');    
        // creacion de las plataformas
        tubo=this.add.image(220,245,'tubo');
        micro=this.add.image(50,235,'microscopio');
        platforms.create(400, 590, 'piso').setScale(16, 1.3).refreshBody();
        plataforma1 = platforms.create(193, 440, 'mesa');
        plataforma2 = platforms.create(160, 150, 'estante');
        plataforma3 = platforms.create(650, 220, 'estante');
        plataforma4 = platforms.create(650, 508, 'caja');
       
        //fisica del personaje
        player = this.physics.add.sprite (450, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);
        //animaciones del sprite del personaje
        this.anims.create ({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate:10,
            repeat: -1
        });

        this.anims.create ({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //VARIABLE PARA EL TECLADO
        cursors = this.input.keyboard.createCursorKeys();
        //COLISION ENTRE EL PERSONAJE Y LAS PLATAFORMAS
        this.physics.add.collider(player, platforms);
        // creacion de las estrellas
      
        // TEXTO DE PUNTAJE
        puntajeText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#000'});
        elementText = this.add.text(300,16, 'Hidrogeno', { fontSize: '32px', fill: '#000'});
        finishText = this.add.text(200,90, '', { fontSize: '32px', fill: '#000'});
        finishText2 = this.add.text(250,210,'', { fontSize: '32px', fill: '#000'});
  //BOMBA
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs,platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);
        // colision estrellas con plataformas y personaje junta estrellas, creacion estrellas
         //numero 1

        stars1 = this.physics.add.group({
            key: 'uno',
            setXY:{x:235, y:0},
            setScale: {
                x:0.4,
                y:0.4
            },
        });
        this.physics.add.overlap(player, stars1, collectStar1, null, this);
        this.physics.add.collider(stars1, platforms);
        stars1.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
        //child.setScale(1.3);
        }); 
        //NUMERO 2, FISICA Y REBOTE
        stars2 = this.physics.add.group({
            key:'dos',
            setXY:{x:300, y:0}
        });
        this.physics.add.overlap(player, stars2, collectStar2, null, this);
        this.physics.add.collider(stars2, platforms);
        stars2.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
        child.setScale(0.4);
        });

        //NUMERO 3, FISICA Y REBOTE
        stars3 = this.physics.add.group({
            key:'tres',
            setXY:{x:500, y:450}
        });
        this.physics.add.overlap(player, stars3, collectStar3, null, this);
        this.physics.add.collider(stars3, platforms);
        stars3.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        //NUMERO 4, FISICA Y REBOTE
        stars4 = this.physics.add.group({
            key:'cuatro',
            setXY:{x:630, y:0}
        });
        this.physics.add.overlap(player, stars4, collectStar4, null, this);
        this.physics.add.collider(stars4, platforms);
        stars4.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        //NUMERO 5,FISICA Y REBOTE
        stars5 = this.physics.add.group({
            key:'cinco',
            setXY:{x:700, y:300}
        });
        this.physics.add.overlap(player, stars5, collectStar5, null, this);
        this.physics.add.collider(stars5, platforms);
        stars5.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        //NUMERO 6, FISICA Y REBOTE
        stars6 = this.physics.add.group({
            key:'seis',
            setXY:{x:84, y:0}
        });
        this.physics.add.overlap(player, stars6, collectStar6, null, this);
        this.physics.add.collider(stars6, platforms);
        stars6.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        //NUMERO 7, FISICA Y REBOTE
        stars7 = this.physics.add.group({
            key:'siete',
            setXY:{x:25, y:0}
        });
        this.physics.add.overlap(player, stars7, collectStar7, null, this);
        this.physics.add.collider(stars7, platforms);
        stars7.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        // NUMERO 8, FISICA Y REBOTE
        stars8 = this.physics.add.group({
            key:'ocho',
            setXY:{x:557, y:700}
        });
        this.physics.add.overlap(player, stars8, collectStar8, null, this);
        this.physics.add.collider(stars8, platforms);
        stars8.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        //NUMERO 9, FISICA Y REBOTE
        stars9 = this.physics.add.group({
            key:'nueve',
            setXY:{x:500, y:700}
        });
        this.physics.add.overlap(player, stars9, collectStar9, null, this);
        this.physics.add.collider(stars9, platforms);
        stars9.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars10 = this.physics.add.group({
            key:'diez',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars10, collectStar10, null, this);
        this.physics.add.collider(stars10, platforms);
        stars10.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars11 = this.physics.add.group({
            key:'once',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars11, collectStar11, null, this);
        this.physics.add.collider(stars11, platforms);
        stars10.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars12 = this.physics.add.group({
            key:'doce',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars12, collectStar12, null, this);
        this.physics.add.collider(stars12, platforms);
        stars10.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars13 = this.physics.add.group({
            key:'trece',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars13, collectStar13, null, this);
        this.physics.add.collider(stars13, platforms);
        stars10.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        /*stars14 = this.physics.add.group({
            key:'catorce',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars14, collectStar14, null, this);
        this.physics.add.collider(stars14, platforms);
        stars10.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });*/

        stars15 = this.physics.add.group({
            key:'quince',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars15, collectStar15, null, this);
        this.physics.add.collider(stars15, platforms);
        stars15.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars16 = this.physics.add.group({
            key:'dieciseis',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars16, collectStar16, null, this);
        this.physics.add.collider(stars16, platforms);
        stars16.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars17 = this.physics.add.group({
            key:'diecisiete',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars17, collectStar17, null, this);
        this.physics.add.collider(stars17, platforms);
        stars17.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars18 = this.physics.add.group({
            key:'dieciocho',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars18, collectStar18, null, this);
        this.physics.add.collider(stars18, platforms);
        stars18.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars19 = this.physics.add.group({
            key:'diecinueve',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars19, collectStar19, null, this);
        this.physics.add.collider(stars19, platforms);
        stars19.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars20= this.physics.add.group({
            key:'veinte',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars20, collectStar20, null, this);
        this.physics.add.collider(stars20, platforms);
        stars20.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });

        stars21= this.physics.add.group({
            key:'veintiuno',
            setXY:{x:650, y:700}
        });
        this.physics.add.overlap(player, stars21, collectStar21, null, this);
        this.physics.add.collider(stars21, platforms);
        stars21.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.4);
        });
    }

    function update ()
    {
        if(game.input.activePointer.isDown)
        {
            if(game.input.activePointer.x > 600)
            {
                player.setVelocityX(160);
                player.anims.play('right', true);
            }   
                else if (game.input.activePointer.x < 200 )
                {
                    player.setVelocityX(-160);
                    player.anims.play('left', true);
                }
                if(game.input.activePointer.x < 600  && game.input.activePointer.x > 200 && player.body.touching.down)
            {
                player.setVelocityY(-530);
            }
        } else if (!game.input.activePointer.isDown)
            {
                    if (cursors.left.isDown)
                {
                    player.setVelocityX(-160);
                    player.anims.play('left', true);
                }
                else if (cursors.right.isDown)
                {
                    player.setVelocityX(160);

                    player.anims.play('right', true);
                }
                else
                {
                    player.setVelocityX(0);

                    player.anims.play('turn', true);
                }
                if ((cursors.space.isDown || cursors.up.isDown) && player.body.touching.down)
                {
                    player.setVelocityY(-530);
                }     
            } else {
                    player.setVelocityX(0);

                    player.anims.play('turn', true);
            }
    }
         
    
    function crearEstrellas(){
            
            stars8.create(630,0, 'ocho').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars9.create(300,0, 'nueve').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);       
            stars10.create(85,0, 'diez').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars11.create(25,0, 'once').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars12.create(700,300, 'doce').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars13.create(500,450, 'trece').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            //stars14.create(235,0, 'catorce').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
    }

    function crearEstrellas2()
    {
            stars15.create(630,0, 'quince').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars16.create(300,0, 'dieciseis').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);       
            stars17.create(85,0, 'diecisiete').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars18.create(25,0, 'dieciocho').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars19.create(700,300, 'diecinueve').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars20.create(500,450, 'veinte').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
            stars21.create(235,0, 'catorce').setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
    }
    function collectStar1 (player,stars1)
    {
         let soundEstrella = this.sound.add('Esonido');
        if (score ==0)
        {
            stars1.disableBody(true, true);
            score += 10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star1 = this.add.sprite(95, 368, 'uno').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Oxigeno');
        }
    } 
    

    function collectStar2 (player,stars2)
    {

         if (score > 0){
            stars2.disableBody(true, true);
            score += 10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star2 = this.add.image(115, 368, 'dos').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Cloro');

            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();
        }
    }
    function collectStar3 (player, stars3)
    {
        if (score>10){
            stars3.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star3 = this.add.image(135, 368, 'tres').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Cromo');
        }
    }
    function collectStar4 (player, stars4)
    {
        if (score>20){
            stars4.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star4 = this.add.image(155, 368, 'cuatro').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Cobre');

            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();

        }
    }

        function collectStar5 (player, stars5)
    {
        if (score>30){
            stars5.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star5 = this.add.image(105, 350, 'cinco').setScale(0.2);
            elementText.setText('Hierro');
        }
    }

        function collectStar6 (player, stars6)
    {
        if (score>40){
            stars6.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star6 = this.add.image(125, 350, 'seis').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Bismuto');

            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();

        }
    }

        function collectStar7 (player, stars7)
    {
        if (score>50){
            stars7.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star7 = this.add.image(145, 350, 'siete').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Magnesio');
            crearEstrellas();
        }
    }

            function collectStar8 (player, stars8)
    {
        if (score>60){
            stars8.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star8 = this.add.image(95, 460, 'ocho').setScale(0.2);
            elementText.setText('Sodio');


            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();
        }
    }

            function collectStar9 (player, stars9)
    {
        if (score>70){
            stars9.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star9 = this.add.image(115, 460, 'nueve').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Calcio');

        }
    }

            function collectStar10 (player, stars10)
    {
        if (score>80){
            stars10.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star10 = this.add.image(135, 460, 'diez').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Oro');

            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();
        }
    }

            function collectStar11 (player, stars11)
    {
        if (score>90){
            stars11.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star11 = this.add.image(155, 460, 'once').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Platino');

        }
    }

        function collectStar12 (player, stars12)
    {
        if (score>100){
            stars12.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star12 = this.add.image(105, 442, 'doce').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText('Azufre');

            var x = (player.x <400)? Phaser.Math.Between(400, 800): Phaser.Math.Between (0, 400);
            var bomb = bombs.create (x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            sonidoEstrella.play();
        }
    }

    function collectStar13 (player, stars13)
    {
        if (score>110){
            stars13.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star13 = this.add.image(125, 442, 'trece').setScale(0.2);
            sonidoEstrella.play();
        }
    }

    /*function collectStar14 (player, stars14)
    {
        if (score>120){
            stars14.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star14 = this.add.image(145, 442, 'catorce').setScale(0.2);
            sonidoEstrella.play();
            finishText.setText('FELICIDADES, HAS GANADO!,');
            finishText2.setText('TU PUNTAJE:' + puntaje)
            crearEstrellas2();
        }
    }*/
    function collectStar15 (player, stars15)
    {
        if (score>130){
            stars15.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star15 = this.add.image(95, 545, 'quince').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar16 (player, stars16)
    {
        if (score>140){
            stars16.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star16 = this.add.image(115, 545, 'dieciseis').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar17 (player, stars17)
    {
        if (score>150){
            stars17.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star17 = this.add.image(135, 545, 'diecisiete').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar18 (player, stars18)
    {
        if (score>160){
            stars18.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star18 = this.add.image(155, 545, 'dieciocho').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar19 (player, stars19)
    {
        if (score>170){
            stars19.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star19 = this.add.image(105, 527, 'diecinueve').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar20 (player, stars20)
    {
        if (score>180){
            stars20.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star20 = this.add.image(125, 527, 'veinte').setScale(0.2);
            sonidoEstrella.play();
        }
    }

        function collectStar21 (player, stars21)
    {
        if (score>190){
            stars21.disableBody(true, true);
            score +=10;
            puntaje +=10
            puntajeText.setText('Puntos: ' + puntaje);
            this.star21 = this.add.image(145, 527, 'veintiuno').setScale(0.2);
            sonidoEstrella.play();
            elementText.setText(' ');
            finishText.setText('FELICIDADES, HAS GANADO!,');
            finishText2.setText('TU PUNTAJE:' + puntaje);
        }
    }
    function hitBomb (player, bomb)
    {
            bomb.disableBody(true,true);
            puntaje -=10;
            puntajeText.setText('Puntos: ' + puntaje);
            sonidoBomba.play();
        }
        
    
        /*player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;*/
    

