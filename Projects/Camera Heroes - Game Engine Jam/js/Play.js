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

        const map = this.make.tilemap({ key: `dungeon` })
        const tileset = map.addTilesetImage(`Game Sprite Sheet`, `tiles`)
        const groundLayer = map.createLayer('Ground & hidden stuff', tileset, 0, 0)
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0)
        const aboveLayer = map.createLayer('Above Ground', tileset, 0, 0)

        // Manages the collisions between the players and the camera
        // this.physics.add.collider(this.avatar, this.wall);

        // Manages the collectable items
        // this.physics.add.overlap(this.avatar, this.collectable, this.collectItem, null, this);
        this.collectables = this.physics.add.group({
            key: 'wall',
            quantity: 9
        });


        // Creates all the player avatars
        this.avatar = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(300, 300);
        this.avatar.setTint(0xdd3333);

        this.avatar2 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar2.setMaxVelocity(300, 300);
        this.avatar2.setTint(0xdd3333);

        this.avatar3 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar3.setMaxVelocity(200, 200);
        this.avatar3.setTint(0x3333dd);

        this.avatar4 = this.physics.add.sprite(0, 0, `playerCharacter`);
        // Set up a max velocity you can reach through accelerating
        this.avatar4.setMaxVelocity(200, 200);
        this.avatar4.setTint(0x3333dd);

        this.playerCharacter = this.add.sprite(400, 300, 'playerCharacterMoving');
        this.playerCharacter.setTint(0xdd3333)

        this.createAnimations();

        // this.playerCharacter.play('character-moving')


        // Create our basic controls
        this.cursors = this.input.keyboard.createCursorKeys();



        // Sets up the various cameras in the game
        this.cameras.main.setSize(400, 320);

        const cam2 = this.cameras.add(400, 0, 400, 320);
        const cam3 = this.cameras.add(0, 320, 400, 320);
        const cam4 = this.cameras.add(400, 320, 400, 320);

        this.cameras.main.startFollow(this.avatar);

        cam2.startFollow(this.avatar2, false, 0.5, 0.5);
        cam3.startFollow(this.avatar3, false, 0.1, 0.1);
        cam4.startFollow(this.avatar4, false, 0.05, 0.05);

        this.cameras.main.setBounds(0, 0, 800, 640);
        cam2.setBounds(800, 0, 800, 640);
        cam3.setBounds(0, 0, 800, 640);
        cam4.setBounds(800, 0, 800, 640);

        // Sets the bounds of the world

        this.physics.world.setBounds(0, 0, 800 * 2, 640);
        this.avatar.setCollideWorldBounds(true);
        this.avatar2.setCollideWorldBounds(true);

    }

    // Continuously checks for player input
    update() {
        this.handleInput();

    }

    // Allows the players to collect Items
    collectItem(avatar, item) {
        item.destroy();
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
            this.avatar.setVelocityY(0);
        }

        // Sets avatar2's movement
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
            this.avatar2.setVelocityX(0);
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
            this.avatar2.setVelocityY(0);
        }
    }




}
