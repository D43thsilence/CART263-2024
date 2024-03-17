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

        // Creates the collisions between the players and the level
        wallsLayer.setCollisionByProperty({ collides: true })

        // Creates all the player avatars
        this.avatar = this.physics.add.sprite(90, 340, `playerCharacter`);
        this.avatar.scale = 0.4
        // Set up a max velocity you can reach through accelerating
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(130, 130);
        this.avatar.setTint(0xdd3333);
        this.physics.add.collider(this.avatar, wallsLayer)

        this.avatar2 = this.physics.add.sprite(90, 380, `playerCharacter`);
        this.avatar2.scale = 0.4
        // Set up a max velocity you can reach through accelerating
        this.avatar2.speed = 500;
        this.avatar2.setMaxVelocity(130, 130);
        this.avatar2.setTint(0x3333dd);
        this.physics.add.collider(this.avatar2, wallsLayer)


        // this.playerCharacter = this.add.sprite(400, 300, 'playerCharacterMoving');
        // this.playerCharacter.setTint(0xdd3333)

        // Creates and manages the collectable items
        this.heroSword = this.physics.add.sprite(1300, 430, `heroSword`);
        this.heroStaff = this.physics.add.sprite(1300, 100, `heroStaff`);

        // Allows the players to pick up their respective items
        this.physics.add.overlap(this.avatar, this.heroSword, this.collectSword, null, this);
        this.physics.add.overlap(this.avatar2, this.heroStaff, this.collectStaff, null, this);

        // Creates the animations used in the program
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

    // Removes the items after the player has collected them
    collectSword(playerCharacter, item) {
        item.destroy();
        swordPickup = true
    }

    collectStaff(playerCharacter, item) {
        item.destroy();
        staffPickup = true
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

        // Handles player 1's movement and the size changes and attacks of both players
        this.input.keyboard.on('keydown', event => {

            if (event.keyCode === 87) {
                this.avatar.setGravityY(-this.avatar.speed);
            }
            else if (event.keyCode === 83) {
                this.avatar.setGravityY(this.avatar.speed);
            }

            else if (event.keyCode === 65) {
                this.avatar.setGravityX(-this.avatar.speed);
            }

            else if (event.keyCode === 68) {
                this.avatar.setGravityX(this.avatar.speed);
            }

            // Makes P1 smaller using the e key
            else if (event.keyCode === 82) {
                this.avatar.scale = 0.2
            }

            // Returns P1 to the original size using the r key
            else if (event.keyCode === 84) {
                this.avatar.scale = 0.4
            }

            // Makes P2 smaller using the u key
            else if (event.keyCode === 73) {
                this.avatar2.scale = 0.2
            }

            // Returns P2 to the original size using the i key
            else if (event.keyCode === 79) {
                this.avatar2.scale = 0.4
            }

            // Triggers player 1's attack using the f key
            else if (event.keyCode === 70 || swordPickup === true) {
                // this.avatar.anims.play('avatar attack')
                swordAttack()
            }

            // Triggers player 2's attack using the k key
            else if (event.keyCode === 75 || staffPickup === true) {
                // this.avatar2.anims.play('avatar attack')
                staffAttack()
            }
        });

        // Makes player 1 stop moving when the movement keys are released
        this.input.keyboard.on('keyup', event => {

            if (event.keyCode === 87) {
                this.avatar.setGravityY(0);
                this.avatar.setVelocityY(0);
            }
            else if (event.keyCode === 83) {
                this.avatar.setGravityY(0);
                this.avatar.setVelocityY(0);
            }

            else if (event.keyCode === 65) {
                this.avatar.setGravityX(0);
                this.avatar.setVelocityX(0);
            }

            else if (event.keyCode === 68) {
                this.avatar.setGravityX(0);
                this.avatar.setVelocityX(0);
            }
        });

        // Manages Player 2's movement and attack
        if (this.cursors.left.isDown) {
            this.avatar2.setGravityX(-this.avatar.speed);
        }
        else if (this.cursors.right.isDown) {
            this.avatar2.setGravityX(this.avatar.speed);
        }

        else {
            this.avatar2.setGravityX(0);
            this.avatar2.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.avatar2.setGravityY(-this.avatar.speed);
        }

        else if (this.cursors.down.isDown) {
            this.avatar2.setGravityY(this.avatar.speed);
        }
        else {
            this.avatar2.setGravityY(0);
            this.avatar2.setVelocityY(0);
        }

        // swordAttack() {
        //     maleficientRuneLifePoints = maleficientRuneLifePoints - 1
        // }

        // staffAttack() {
        //     maleficientRuneLifePoints = maleficientRuneLifePoints - 1
        // }



    }




}
