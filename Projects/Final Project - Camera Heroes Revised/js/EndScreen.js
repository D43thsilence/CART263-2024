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
            fontSize: `20px`,
            fill: `#ffffff`,
        };

        let style2 = {
            fontFamily: `sans-serif`,
            fontSize: `30px`,
            fill: `#ffffff`,
        };

        // Adds the background of the end screen
        this.add.sprite(200, 160, `endScreen`)

        // Creates text strings used in the End Screen
        let winText = `You have destroyed the Maleficient Rune!`;
        let startAgain = `Click to restart the game!`;

        // Draws the text on the Title Screen
        this.gameText = this.add.text(width / 6, height / 1, winText, style);
        this.gameText2 = this.add.text(width / 2.8, height / 0.5, startAgain, style2);


        // Switches the scene to the Play scene
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }

    update() {

    }
}
