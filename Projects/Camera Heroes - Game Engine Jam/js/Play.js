class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `Play`
        });
    }

    create() {
        // NOTE: Creating and adding a text object to our scene
        // EXAMPLE: https://phaser.io/examples/v3/view/game-objects/text/basic-text
        // Create a style object to define what the text will look like
        let style = {
            // Use font-family in the same way you use it in CSS
            fontFamily: `sans-serif`,
            // And font size too!
            fontSize: `40px`,
            // Set a fill color for the text (white)
            fill: `#ffffff`,
        };
        // Create a string that describes an amazing game experience!
        let gameDescription = `Current Game`;
        // Create the text object that will actually add the text into our
        // scene and display it. The parameters here are:
        // - x position
        // - y position
        // - string to display
        // - style configuration
        this.gameText = this.add.text(100, 100, gameDescription, style);
        // Note that it's often a good idea to assign the resulting text object
        // into a property of the scene if you might want to manipulate it
        // at some later point in your program!

        // Creates the stage where the game is played
        this.floor = this.add.tileSprite(400, 300, 500, 500, 'floorTile');
        this.floor.setScale(1.2);

        this.wall = this.add.tileSprite(320, 320, 320, 320, 'wallTile');
        this.wall.setScale(1.2);


        // Creates all the player avatars
        this.avatar = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(200, 200);
        this.avatar.setTint(0xdd3333)

        this.avatar2 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar2.speed = 500;
        this.avatar2.setMaxVelocity(200, 200);
        this.avatar2.setTint(0xdd4444)

        this.avatar3 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar3.setMaxVelocity(200, 200);
        this.avatar3.setTint(0xdd3333)

        this.avatar4 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar4.setMaxVelocity(200, 200);
        this.avatar4.setTint(0xdd3333)

        this.playerCharacter = this.add.sprite(400, 300, 'playerCharacterMoving');
        this.playerCharacter.setTint(0xdd3333)

        this.createAnimations();

        // this.playerCharacter.play('character-moving')

        // Add colliders between the avatar and the sadness, and the sadness and itself
        // so that we get physics for free!
        this.physics.add.collider(this.avatar, this.sadness);

        // Create our basic controls
        this.cursors = this.input.keyboard.createCursorKeys();



        // Sets up the various cameras in the game
        this.cameras.main.setSize(400, 300);

        const cam2 = this.cameras.add(400, 0, 400, 300);
        const cam3 = this.cameras.add(0, 300, 400, 300);
        const cam4 = this.cameras.add(400, 300, 400, 300);

        this.cameras.main.startFollow(this.avatar);

        cam2.startFollow(this.avatar2, false, 0.5, 0.5);
        cam3.startFollow(this.avatar3, false, 0.1, 0.1);
        cam4.startFollow(this.avatar4, false, 0.05, 0.05);


        // Sets the bounds of the world
        // this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
        // this.player.setCollideWorldBounds(true);

    }

    // Continuously checks for player input
    update() {
        this.handleInput();

    }

    createAnimations() {

        // this.anims.create({
        //     key: 'character-moving',
        //     frames: this.anims.generateFrameNumbers('character-moving, { start: 0, end: 23, first: 23 }),
        //     frameRate: 20,
        //     repeat: -1
        // });


    }

    handleInput() {
        // If either left or right is pressed, rotate appropriately
        if (this.cursors.left.isDown) {
            this.avatar.setGravityX(-this.avatar.speed);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setGravityX(this.avatar.speed);
        }
        // Otherwise stop rotating
        else {
            this.avatar.setGravityX(0);
            this.avatar.setVelocityX(0);
        }

        // If the up key is pressed, accelerate in the current rotation direction
        if (this.cursors.up.isDown) {
            this.avatar.setGravityY(-this.avatar.speed);
        }
        // Otherwise, zero the acceleration
        else if (this.cursors.down.isDown) {
            this.avatar.setGravityY(this.avatar.speed);
        }
        else {
            this.avatar.setGravityY(0);
        }

        // If either left or right is pressed, rotate appropriately
        if (this.cursors.left.isDown) {
            this.avatar2.setGravityX(-this.avatar.speed);
        }
        else if (this.cursors.right.isDown) {
            this.avatar2.setGravityX(this.avatar.speed);
        }
        // Otherwise stop rotating
        else {
            this.avatar2.setGravityX(0);
        }

        // If the up key is pressed, accelerate in the current rotation direction
        if (this.cursors.up.isDown) {
            this.avatar2.setGravityY(-this.avatar.speed);
        }
        // Otherwise, zero the acceleration
        else if (this.cursors.down.isDown) {
            this.avatar2.setGravityY(this.avatar.speed);
        }
        else {
            this.avatar2.setGravityY(0);
        }
    }




}
