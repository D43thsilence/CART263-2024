class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `TitleScreen`
        });
    }

    preload() {
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
        // this.load.spritesheet('explosion', 'assets/images/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

        // NOTE: now that we're loading an actual file, we need to wait until everything
        // loads before switching to the next scene. We use the "complete" event listener
        // of the loader to do this.
        // Note the use of an ARROW FUNCTION so that we can still use "this" correctly
        // inside the event handler!
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/loader-events/load-progress
        this.load.on(`complete`, () => {
            // this.add.image(400, 400, `TitleScreen`);
        });

        // this.load.image('titleImage', 'assets/images/taikodrummaster.jpg');
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
        let gameDescription = `Camera Heroes`;
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

        // this.titleScreenImage = this.add.image(400, 300, 'taikodrummaster');
        // this.titleScreenImage.setTint(0xdd3333)

        // NOTE: Switch to the scene with the key of "play"
        // EXAMPLE: https://phaser.io/examples/v3/view/scenes/change-scene-from-create
        // this.scene.start(`Play`);
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
