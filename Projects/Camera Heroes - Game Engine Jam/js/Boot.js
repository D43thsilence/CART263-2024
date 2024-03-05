class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    // NOTE: we add the preload() method to tell Phaser 3 we want to preload
    // asset files here
    preload() {

        const progress = this.add.graphics();

        this.load.on('progress', value => {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });

        // NOTE: we use special loading methods to load files into our program
        // Here we're using the special "load" property of the scene to load
        // a simple image. The parameters are
        // - The "key" we will use to refer to this asset later
        // - The path to the image asset
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/image/load-image
        // https://labs.phaser.io/view.html?src=src\loader\loader%20events\load%20progress.js
        // this.load.setPath('assets/images/');
        // this.load.image(`wall`, `assets/images/wall.png`);

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
