class EndScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `EndScreen`
        });
    }

    create() {

        // Creates the style object to define what the text will look like
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `16px`,
            fill: `#ffffff`,
        };

        // Creates text strings used in the End Screen
        let winText = `You have destroyed the Maleficient Rune!`;

        // Draws the text on the Title Screen
        this.gameText = this.add.text(width / 1.8, height / 0.7, winText, style);

        // this.titleScreenImage = this.add.image(400, 300, 'taikodrummaster');

        // Switches the scene to the Play scene
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }

    update() {

    }
}
