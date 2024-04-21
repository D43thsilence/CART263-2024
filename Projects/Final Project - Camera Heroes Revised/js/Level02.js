class Level02 extends Phaser.Scene {
    constructor() {
        super({
            key: `Level02`
        });
    }

    create() {

        // Creates the stage where the game is played
        const map = this.make.tilemap({ key: `dungeon02` });
        const tileset = map.addTilesetImage(`Level 2 Tilemap`, `tiles02`);
        const backgroundColorLayer = map.createLayer('Background Color', tileset, 0, 0);
        const backgroundLayer = map.createLayer('Background', tileset, 0, 0);
        const groundLayer = map.createLayer('Floor', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0)

        // Creates the collisions between the players and the level
        wallsLayer.setCollisionByProperty({ collides: true });

        // Creates all the player avatars and their collisions
        this.avatar = this.physics.add.sprite(740, 400, `playerCharacter`);
        this.avatar.scale = 0.4;
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(130, 130);
        this.avatar.setTint(0xdd3333);
        this.physics.add.collider(this.avatar, wallsLayer);
        this.physics.add.collider(this.avatar, this.maleficientRune);


        this.avatar2 = this.physics.add.sprite(860, 400, `playerCharacter`);
        this.avatar2.scale = 0.4;
        this.avatar2.speed = 500;
        this.avatar2.setMaxVelocity(130, 130);
        this.avatar2.setTint(0x3333dd);
        this.physics.add.collider(this.avatar2, wallsLayer);
        this.physics.add.collider(this.avatar2, this.maleficientRune);


        // Resets the pickup variable for both players
        this.swordPickup = false;
        this.staffPickup = false;

        // Spawns an enemy lizard that blocks access to one of the weapons the heroes need
        this.lizard = this.physics.add.sprite(71.5, 458, `lizardIdle`);
        this.lizard.setImmovable(true);
        this.physics.add.collider(this.lizard, this.avatar);
        this.physics.add.collider(this.lizard, this.avatar2);

        // Creates the Maleficient Rune
        this.maleficientRune = this.physics.add.sprite(800, 400, `maleficientRune`);
        this.maleficientRune.scale = 0.9;
        // Adjusts the collision box of the Maleficient Rune
        this.maleficientRune.body.setSize(this.maleficientRune.width / 2, this.maleficientRune.height * 0.8)
        this.maleficientRune.setImmovable(true);
        this.physics.add.collider(this.maleficientRune, this.avatar);
        this.physics.add.collider(this.maleficientRune, this.avatar2);

        // Creates and manages the collectable items
        this.heroSword = this.physics.add.sprite(100, 560, `heroSword`);
        this.heroStaff = this.physics.add.sprite(1280, 370, `heroStaff`);

        // Allows the players to pick up their respective items
        this.physics.add.overlap(this.avatar, this.heroSword, this.collectSword, null, this);
        this.physics.add.overlap(this.avatar2, this.heroStaff, this.collectStaff, null, this);

        // Initiates the character's animations
        this.avatar.play('idle animation')
        this.avatar2.play('idle animation')
        this.maleficientRune.play('idle Rune')
        this.lizard.play('lizard idle')

        // Create our basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Sets up the various cameras in the game
        this.cameras.main.setSize(200, 160);

        const cam2 = this.cameras.add(200, 0, 200, 160);
        const cam3 = this.cameras.add(0, 160, 200, 160);
        const cam4 = this.cameras.add(200, 160, 200, 160);

        this.cameras.main.startFollow(this.avatar, 0.1, 0.1);

        cam2.startFollow(this.heroSword, false, 0.1, 0.1);
        cam3.startFollow(this.avatar2, false, 0.1, 0.1);
        cam4.startFollow(this.heroStaff, false, 0.1, 0.1);

        // this.cameras.main.setBounds(0, 0, 800, 640);
        // cam2.setBounds(800, 0, 800, 640);
        // cam3.setBounds(0, 0, 800, 640);
        // cam4.setBounds(800, 0, 800, 640);

        // Sets the bounds of the world
        this.physics.world.setBounds(0, 0, 800 * 2, 640);
        this.avatar.setCollideWorldBounds(true);
        this.avatar2.setCollideWorldBounds(true);

        // Assigns the amount of life points the maleficient rune has
        this.maleficientRuneLifePoints = 100000
    }

    // Continuously checks for player input, the distance between the players and the Maleficient Rune and if the game end conditions are met
    update() {
        this.handleInput();
        this.distanceCalculation()
        this.gameEnd();
    }

    // Removes the items after the player has collected them
    collectSword(playerCharacter, item) {
        item.destroy();
        this.swordPickup = true
    }

    collectStaff(playerCharacter, item) {
        item.destroy();
        this.staffPickup = true
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

            // Makes P2 smaller using the o key
            else if (event.keyCode === 73) {
                this.avatar2.scale = 0.2
            }

            // Returns P2 to the original size using the i key
            else if (event.keyCode === 79) {
                this.avatar2.scale = 0.4
            }

            // Triggers player 1's attack using the f key
            else if (event.keyCode === 70 && this.swordPickup === true) {
                this.avatar.anims.play('avatar attack')
                this.swordAttack()
                this.avatar.chain('idle animation');
            }

            // Triggers player 2's attack using the k key
            else if (event.keyCode === 75 && this.staffPickup === true) {
                this.avatar2.anims.play('avatar attack')
                this.staffAttack()
                this.avatar2.chain('idle animation');
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

        // Manages Player 2's movement
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
    }

    distanceCalculation() {
        // Determines the distance between the player, the lizard and the Maleficient Rune
        proximity[0] = dist(this.avatar.x, this.avatar.y, this.maleficientRune.x, this.maleficientRune.y);
        proximity[1] = dist(this.avatar2.x, this.avatar2.y, this.maleficientRune.x, this.maleficientRune.y);
        proximity[2] = dist(this.avatar.x, this.avatar.y, this.lizard.x, this.lizard.y);
        proximity[3] = dist(this.avatar2.x, this.avatar2.y, this.lizard.x, this.lizard.y);
    }

    // Allows both players to deal damage to the lizard and Maleficient Rune if both weapons have been acquired. Also plays the Rune's damage animation
    swordAttack() {
        if (proximity[0] < attackRange && this.swordPickup === true && this.staffPickup === true) {
            this.maleficientRuneLifePoints = this.maleficientRuneLifePoints - 1
            this.maleficientRune.anims.play('damaged Rune')
            this.maleficientRune.chain('idle Rune');
        }

        else if (proximity[3] < attackRange) {
            this.lizard.destroy()
        }
    }

    staffAttack() {
        if (proximity[1] < attackRange && this.swordPickup === true && this.staffPickup === true) {
            this.maleficientRuneLifePoints = this.maleficientRuneLifePoints - 1
            this.maleficientRune.anims.play('damaged Rune')
            this.maleficientRune.chain('idle Rune');
        }

        else if (proximity[3] < attackRange) {
            this.lizard.destroy()
        }
    }

    // Checks if the game end conditions have been met and if so switches the scene to the end screem
    gameEnd() {
        if (this.maleficientRuneLifePoints < 0) {
            this.scene.start(`Level03`);
        }
    }

}
