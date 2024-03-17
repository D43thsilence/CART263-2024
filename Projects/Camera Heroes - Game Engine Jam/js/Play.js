class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `Play`
        });
    }

    create() {
        // Creates the stage where the game is played

        const map = this.make.tilemap({ key: `dungeon` })
        const tileset = map.addTilesetImage(`Game Sprite Sheet`, `tiles`)
        const groundLayer = map.createLayer('Ground & hidden stuff', tileset, 0, 0)
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0)
        const aboveLayer = map.createLayer('Above Ground', tileset, 0, 0)

        // Manages the collisions between the players and the level
        wallsLayer.setCollisionByProperty({ collides: true })

        // Manages the collectable items
        // this.physics.add.overlap(this.avatar, this.collectable, this.collectItem, null, this);
        this.collectables = this.physics.add.group({
            key: 'wall',
            quantity: 9
        });

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        wallsLayer.renderDebug(debugGraphics, {
            tilecolor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })


        // Creates all the player avatars
        this.avatar = this.physics.add.sprite(90, 340, `playerCharacter`);
        this.avatar.scale = 0.4
        // Set up a max velocity you can reach through accelerating
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(300, 300);
        this.avatar.setTint(0xdd3333);

        this.avatar2 = this.physics.add.sprite(90, 380, `playerCharacter`);
        this.avatar2.scale = 0.4
        // Set up a max velocity you can reach through accelerating
        this.avatar2.speed = 500;
        this.avatar2.setMaxVelocity(200, 200);
        this.avatar2.setTint(0x3333dd);


        this.playerCharacter = this.add.sprite(400, 300, 'playerCharacterMoving');
        this.playerCharacter.setTint(0xdd3333)

        this.createAnimations();

        // this.playerCharacter.play('character-moving')


        // Create our basic controls
        this.cursors = this.input.keyboard.createCursorKeys();



        // Sets up the various cameras in the game
        this.cameras.main.setSize(200, 160);

        const cam2 = this.cameras.add(200, 0, 200, 160);
        const cam3 = this.cameras.add(0, 160, 200, 160);
        const cam4 = this.cameras.add(200, 160, 200, 160);

        this.cameras.main.startFollow(this.avatar, 0.1, 0.1);

        cam2.startFollow(this.avatar, false, 0.1, 0.1);
        cam3.startFollow(this.avatar2, false, 0.1, 0.1);
        cam4.startFollow(this.avatar2, false, 0.1, 0.1);

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

    collectItem(avatar2, item) {
        item.destroy();
    }

    // Creates the attack animations
    createAnimations() {

        // this.anims.create({
        //     key: 'avatar attack',
        //     frames: this.anims.generateFrameNumbers('avatar1-attacking, { start: 0, end: 23, first: 23 }),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'avatar2 attack',
        //     frames: this.anims.generateFrameNumbers('avatar2-attacking, { start: 0, end: 23, first: 23 }),
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
