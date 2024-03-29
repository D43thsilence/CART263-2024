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
        this.load.image(`heroSword`, `Hero Sword.png`);
        this.load.image(`heroStaff`, `Hero Staff.png`);
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
        this.load.tilemapTiledJSON(`dungeon`, `Dungeon-01.tmj`)

        // NOTE: now that we're loading an actual file, we need to wait until everything
        // loads before switching to the next scene. We use the "complete" event listener
        // of the loader to do this.
        // Note the use of an ARROW FUNCTION so that we can still use "this" correctly
        // inside the event handler!
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/loader-events/load-progress
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
    }



    update() {

    }
}
