class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    // Preloads all assets
    preload() {

        const progress = this.add.graphics();

        this.load.on('progress', value => {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });

        // Loads the images
        this.load.setPath('assets/images/');
        this.load.image(`tiles`, `Game Sprite Sheet.png`);
        this.load.image(`tiles02`, `Level 2 Tilemap.png`);
        this.load.image(`tiles03`, `Level 3 Tilemap.png`);
        this.load.image(`heroSword`, `Hero Sword.png`);
        this.load.image(`heroStaff`, `Hero Staff.png`);
        this.load.spritesheet(`maleficientRune`, `Maleficient Rune-sheet.png`, {
            frameWidth: 128,
            frameHeight: 128,
            endFrame: 6
        })
        this.load.spritesheet(`heroSwing`, `Hero Sword Swing.png`, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 10
        });
        this.load.spritesheet(`playerCharacter`, `Neutral Character Sprite Sheet.png`, {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 0
        });
        this.load.spritesheet(`merchantIdle`, `Merchant Idle.png`, {
            frameWidth: 16,
            frameHeight: 23,
            endFrame: 3
        })
        this.load.spritesheet(`wizardIdle`, `Wizard Idle.png`, {
            frameWidth: 16,
            frameHeight: 28,
            endFrame: 3
        })
        this.load.spritesheet(`lizardIdle`, `lizard idle anim.png`, {
            frameWidth: 16,
            frameHeight: 28,
            endFrame: 3
        })
        this.load.spritesheet(`chestOpening`, `Chest opening.png`, {
            frameWidth: 16,
            frameHeight: 16,
            endFrame: 2
        })
        this.load.tilemapTiledJSON(`dungeon`, `Dungeon-01.tmj`)
        this.load.tilemapTiledJSON(`dungeon02`, `Dungeon-02.tmj`)
        this.load.tilemapTiledJSON(`dungeon03`, `Dungeon-03.tmj`)

        // Switches to the next scene
        this.load.on(`complete`, () => {
            // Switch to the Play scene
            this.scene.start(`TitleScreen`);
        });
    }

    create() {
        const keys = this.textures.getTextureKeys();

        for (let i = 0; i < keys.length; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 600);

            this.add.image(x, y, keys[i]);
        }

        this.createAnimations();
    }

    // Creates the animations
    createAnimations() {
        this.anims.create({
            key: 'idle animation',
            frames: this.anims.generateFrameNumbers(`playerCharacter`, { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: 'avatar attack',
            frames: this.anims.generateFrameNumbers(`heroSwing`, { start: 0, end: 9, first: 0 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idle Rune',
            frames: this.anims.generateFrameNumbers(`maleficientRune`, { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: 'damaged Rune',
            frames: this.anims.generateFrameNumbers(`maleficientRune`, { start: 0, end: 5, first: 0 }),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'lizard idle',
            frames: this.anims.generateFrameNumbers(`lizardIdle`, { start: 0, end: 3, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'wizard idle',
            frames: this.anims.generateFrameNumbers(`wizardIdle`, { start: 0, end: 3, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'merchant idle',
            frames: this.anims.generateFrameNumbers(`merchantIdle`, { start: 0, end: 3, first: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'closed chest',
            frames: this.anims.generateFrameNumbers(`chestOpening`, { start: 0, end: 0, first: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'chest opening',
            frames: this.anims.generateFrameNumbers(`chestOpening`, { start: 0, end: 2, first: 0 }),
            frameRate: 10,
            repeat: 0
        });
    }



    update() {

    }
}
