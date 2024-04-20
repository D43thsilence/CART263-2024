class Level03 extends Phaser.Scene {
    constructor() {
        super({
            key: `Level03`
        });
    }

    create() {

        // Creates the stage where the game is played
        const map = this.make.tilemap({ key: `dungeon03` });
        const tileset = map.addTilesetImage(`Level 3 Tilemap`, `tiles03`);
        const backgroundColorLayer = map.createLayer('Endless pit', tileset, 0, 0);
        const backgroundLowerWalls = map.createLayer('Lower Walls Extra', tileset, 0, 0);
        const backgroundWalls = map.createLayer('Lower walls', tileset, 0, 0);
        const groundLayer = map.createLayer('Floor', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0)

        // Creates the collisions between the players and the level
        wallsLayer.setCollisionByProperty({ collides: true });

        // Creates all the player avatars and their collisions
        this.avatar = this.physics.add.sprite(1280, 350, `playerCharacter`);
        // 1280, 270
        this.avatar.scale = 0.4;
        this.avatar.speed = 500;
        this.avatar.setMaxVelocity(130, 130);
        this.avatar.setTint(0xdd3333);
        this.physics.add.collider(this.avatar, wallsLayer);
        this.physics.add.collider(this.avatar, this.maleficientRune);


        this.avatar2 = this.physics.add.sprite(1280, 270, `playerCharacter`);
        this.avatar2.scale = 0.4;
        this.avatar2.speed = 500;
        this.avatar2.setMaxVelocity(130, 130);
        this.avatar2.setTint(0x3333dd);
        this.physics.add.collider(this.avatar2, wallsLayer);
        this.physics.add.collider(this.avatar2, this.maleficientRune);

        // Resets all variables
        this.swordPickup = false;
        this.staffPickup = false;
        this.merchantGone = false;
        this.wizardGone = false;
        this.treasureCount = 0;

        // Spawns a wizard and a merchant that block access to the weapons the heroes need
        this.wizard = this.physics.add.sprite(1512, 392, `wizardIdle`);
        this.wizard.setImmovable(true);
        this.physics.add.collider(this.wizard, this.avatar);
        this.physics.add.collider(this.wizard, this.avatar2);

        this.merchant = this.physics.add.sprite(1512, 180, `merchantIdle`);
        this.merchant.setImmovable(true);
        this.physics.add.collider(this.merchant, this.avatar);
        this.physics.add.collider(this.merchant, this.avatar2);

        // Spawns enemy lizards that block access to two of the chests the heroes need to open
        this.lizard = this.physics.add.sprite(760, 363, `lizardRunning`);
        this.lizard.setImmovable(true);
        this.physics.add.collider(this.lizard, this.avatar);
        this.physics.add.collider(this.lizard, this.avatar2);

        this.lizard2 = this.physics.add.sprite(1027, 443, `lizardRunning`);
        this.lizard2.setImmovable(true);
        this.physics.add.collider(this.lizard2, this.avatar);
        this.physics.add.collider(this.lizard2, this.avatar2);

        // Creates the Maleficient Rune
        this.maleficientRune = this.physics.add.sprite(1149, 276, `maleficientRune`);
        this.maleficientRune.scale = 0.8;
        // Adjusts the collision box of the Maleficient Rune
        this.maleficientRune.body.setSize(this.maleficientRune.width / 2, this.maleficientRune.height * 0.8)
        this.maleficientRune.setImmovable(true);
        this.physics.add.collider(this.maleficientRune, this.avatar);
        this.physics.add.collider(this.maleficientRune, this.avatar2);

        // Creates and manages the collectable items and chests
        this.heroSword = this.physics.add.sprite(1512, 222, `heroSword`);
        this.heroStaff = this.physics.add.sprite(1512, 361, `heroStaff`);

        this.chest1 = this.physics.add.sprite(414, 318, 'chestOpening')
        this.chest1.setImmovable(true);
        this.physics.add.collider(this.chest1, this.avatar);
        this.physics.add.collider(this.chest1, this.avatar2);

        this.chest2 = this.physics.add.sprite(733, 79, 'chestOpening')
        this.chest2.setImmovable(true);
        this.physics.add.collider(this.chest2, this.avatar);
        this.physics.add.collider(this.chest2, this.avatar2);

        this.chest3 = this.physics.add.sprite(232, 316, 'chestOpening')
        this.chest3.setImmovable(true);
        this.physics.add.collider(this.chest3, this.avatar);
        this.physics.add.collider(this.chest3, this.avatar2);

        this.chest4 = this.physics.add.sprite(137, 124, 'chestOpening')
        this.chest4.setImmovable(true);
        this.physics.add.collider(this.chest4, this.avatar);
        this.physics.add.collider(this.chest4, this.avatar2);

        this.chest5 = this.physics.add.sprite(760, 325, 'chestOpening')
        this.chest5.setImmovable(true);
        this.physics.add.collider(this.chest5, this.avatar);
        this.physics.add.collider(this.chest5, this.avatar2);

        this.chest6 = this.physics.add.sprite(895, 416, 'chestOpening')
        this.chest6.setImmovable(true);
        this.physics.add.collider(this.chest6, this.avatar);
        this.physics.add.collider(this.chest6, this.avatar2);

        // Allows the players to pick up their respective items
        this.physics.add.overlap(this.avatar, this.heroSword, this.collectSword, null, this);
        this.physics.add.overlap(this.avatar2, this.heroStaff, this.collectStaff, null, this);

        // Initiates all animations
        this.avatar.play('idle animation')
        this.avatar2.play('idle animation')
        this.maleficientRune.play('idle Rune')
        this.lizard.play('lizard idle')
        this.lizard2.play('lizard idle')
        this.chest1.play('closed chest')
        this.wizard.play('wizard idle')
        this.merchant.play('merchant idle')

        // Create our basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Sets up the various cameras in the game
        this.cameras.main.setSize(200, 160);

        const cam2 = this.cameras.add(200, 0, 100, 160);
        const cam3 = this.cameras.add(0, 160, 100, 80);
        const cam4 = this.cameras.add(200, 160, 200, 160);
        const cam5 = this.cameras.add(0, 240, 100, 80);
        const cam6 = this.cameras.add(100, 240, 100, 80);
        const cam7 = this.cameras.add(100, 160, 100, 80);
        const cam8 = this.cameras.add(300, 0, 100, 160);

        this.cameras.main.startFollow(this.avatar, 0.1, 0.1);
        cam2.startFollow(this.wizard, false, 0.1, 0.1);
        cam3.startFollow(this.chest1, false, 0.1, 0.1);
        cam4.startFollow(this.avatar2, false, 0.1, 0.1);
        cam5.startFollow(this.chest2, false, 0.1, 0.1);
        cam6.startFollow(this.chest3, false, 0.1, 0.1);
        cam7.startFollow(this.chest4, false, 0.1, 0.1);
        cam8.startFollow(this.merchant, false, 0.1, 0.1);


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

        // Creates a style and constant for the text
        let style3 = {
            fontFamily: `sans-serif`,
            fontSize: `10px`,
            fill: `#ffffff`,
        };
    }

    // Continuously checks for player input, the distance between the players and the Maleficient Rune and if the game end conditions are met
    update() {
        this.handleInput();
        this.distanceCalculation()
        this.gameEnd();
        this.cameraUpdate();
        this.npcUpdate();
        console.log(this.treasureCount);
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
                this.swordAttack();
                this.avatar.chain('idle animation');
            }


            // Triggers player 2's attack using the k key
            else if (event.keyCode === 75 && this.staffPickup === true) {
                this.avatar2.anims.play('avatar attack')
                this.staffAttack();
                this.avatar2.chain('idle animation');
            }

            // Allows player 2 to interact using the l key
            else if (event.keyCode === 76) {
                this.interaction()
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

            // Allows player 1 to interact using the g key
            else if (event.keyCode === 71) {
                this.interaction()
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
        // Determines the distance between the player, the lizard, the Maleficent Rune and the various chests
        proximity[0] = dist(this.avatar.x, this.avatar.y, this.maleficientRune.x, this.maleficientRune.y);
        proximity[1] = dist(this.avatar2.x, this.avatar2.y, this.maleficientRune.x, this.maleficientRune.y);

        proximity[2] = dist(this.avatar.x, this.avatar.y, this.lizard.x, this.lizard.y);
        proximity[3] = dist(this.avatar2.x, this.avatar2.y, this.lizard.x, this.lizard.y);

        proximity[4] = dist(this.avatar.x, this.avatar.y, this.chest1.x, this.chest1.y);
        proximity[5] = dist(this.avatar2.x, this.avatar2.y, this.chest1.x, this.chest1.y);

        proximity[6] = dist(this.avatar.x, this.avatar.y, this.chest2.x, this.chest2.y);
        proximity[7] = dist(this.avatar2.x, this.avatar2.y, this.chest2.x, this.chest2.y);

        proximity[8] = dist(this.avatar.x, this.avatar.y, this.chest3.x, this.chest3.y);
        proximity[9] = dist(this.avatar2.x, this.avatar2.y, this.chest3.x, this.chest3.y);

        proximity[10] = dist(this.avatar.x, this.avatar.y, this.chest4.x, this.chest4.y);
        proximity[11] = dist(this.avatar2.x, this.avatar2.y, this.chest4.x, this.chest4.y);

        proximity[12] = dist(this.avatar.x, this.avatar.y, this.chest5.x, this.chest5.y);
        proximity[13] = dist(this.avatar2.x, this.avatar2.y, this.chest5.x, this.chest5.y);

        proximity[14] = dist(this.avatar.x, this.avatar.y, this.chest6.x, this.chest6.y);
        proximity[15] = dist(this.avatar2.x, this.avatar2.y, this.chest6.x, this.chest6.y);
    }

    // Allows both players to deal damage to the lizard and Maleficient Rune. Also plays the Rune's damage animation
    swordAttack() {
        if (proximity[0] < attackRange && this.merchantGone === true && this.wizardGone === true) {
            this.maleficientRuneLifePoints = this.maleficientRuneLifePoints - 1
            this.maleficientRune.anims.play('damaged Rune')
            this.maleficientRune.chain('idle Rune');
        }

        else if (proximity[3] < attackRange) {
            this.lizard.destroy()
        }
    }


    staffAttack() {
        if (proximity[1] < attackRange && this.merchantGone === true && this.wizardGone === true) {
            this.maleficientRuneLifePoints = this.maleficientRuneLifePoints - 1
            this.maleficientRune.anims.play('damaged Rune')
            this.maleficientRune.chain('idle Rune');
        }

        else if (proximity[3] < attackRange) {
            this.lizard.destroy()
        }
    }

    interaction() {
        if (proximity[4] < attackRange) {
            this.chest1.anims.play('chest opening')
            setTimeout(() => this.chest1.destroy(), 2000);
            setTimeout(() => this.treasureCount = this.treasureCount + 1, 2000)
        }
        if (proximity[5] < attackRange) {
            this.chest1.anims.play('chest opening')
            setTimeout(() => this.chest1.destroy(), 2000);
        }

        if (proximity[6] < attackRange) {
            this.chest2.anims.play('chest opening')
            setTimeout(() => this.chest2.destroy(), 2000);
        }
        if (proximity[7] < attackRange) {
            this.chest2.anims.play('chest opening')
            setTimeout(() => this.chest2.destroy(), 2000);
        }

        if (proximity[8] < attackRange) {
            this.chest3.anims.play('chest opening')
            setTimeout(() => this.chest3.destroy(), 2000);
        }
        if (proximity[9] < attackRange) {
            this.chest3.anims.play('chest opening')
            setTimeout(() => this.chest3.destroy(), 2000);
        }

        if (proximity[10] < attackRange) {
            this.chest4.anims.play('chest opening')
            setTimeout(() => this.chest4.destroy(), 2000);
        }
        if (proximity[11] < attackRange) {
            this.chest4.anims.play('chest opening')
            setTimeout(() => this.chest4.destroy(), 2000);
        }

        if (proximity[12] < attackRange) {
            this.chest5.anims.play('chest opening')
            setTimeout(() => this.chest5.destroy(), 2000);
        }
        if (proximity[13] < attackRange) {
            this.chest5.anims.play('chest opening')
            setTimeout(() => this.chest5.destroy(), 2000);
        }

        if (proximity[14] < attackRange) {
            this.chest6.anims.play('chest opening')
            setTimeout(() => this.chest6.destroy(), 2000);
        }
        if (proximity[15] < attackRange) {
            this.chest6.anims.play('chest opening')
            setTimeout(() => this.chest6.destroy(), 2000);
        }
    }

    cameraUpdate() {
        if (this.treasureCount === 4) {
            cam6.startFollow(this.chest5, false, 0.1, 0.1);
            cam7.startFollow(this.chest6, false, 0.1, 0.1);
        }
    }

    npcUpdate() {
        if (this.treasureCount >= 4) {
            this.merchant.destroy()
            this.merchantGone = true
        }

        if (this.treasureCount >= 6) {
            this.wizard.destroy()
            this.wizardGone = true
        }
    }

    // Checks if the game end conditions have been met and if so switches the scene to the end screem
    gameEnd() {
        console.log(this.maleficientRuneLifePoints)
        if (this.maleficientRuneLifePoints < 0) {
            this.scene.start(`EndScreen`);
        }
    }

}
