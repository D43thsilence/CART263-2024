class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `TitleScreen`
        });
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

        let style2 = {
            // Use font-family in the same way you use it in CSS
            fontFamily: `sans-serif`,
            // And font size too!
            fontSize: `20px`,
            // Set a fill color for the text (white)
            fill: `#ffffff`,
        };

        let style3 = {
            // Use font-family in the same way you use it in CSS
            fontFamily: `sans-serif`,
            // And font size too!
            fontSize: `10px`,
            // Set a fill color for the text (white)
            fill: `#ffffff`,
        };

        // Create a string that describes an amazing game experience!
        let gameDescription = `Camera Heroes!`;
        let gameInstructions = `Use the arrow keys and movement keys to move both characters.`;
        let gameInstructions2 = `Pick up the weapons in the dungeon (P1 = F to swing, P2: k to swing)`;
        let gameInstructions3 = `Your objective is to destroy the maleficient rune!`;
        let startInstruction = `Click to start!`;
        // Create the text object that will actually add the text into our
        // scene and display it. The parameters here are:
        // - x position
        // - y position
        // - string to display
        // - style configuration
        this.gameText = this.add.text(width / 1.8, height / 2, gameDescription, style);
        this.gameText = this.add.text(width / 1.9, height / 0.7, gameInstructions, style3);
        this.gameText = this.add.text(width / 2.2, height / 0.6, gameInstructions2, style3);
        this.gameText = this.add.text(width / 1.1, height / 0.5, gameInstructions3, style3);
        this.gameText = this.add.text(width / 0.7, height / 0.4, startInstruction, style2);
        // Note that it's often a good idea to assign the resulting text object
        // into a property of the scene if you might want to manipulate it
        // at some later point in your program!

        // this.titleScreenImage = this.add.image(400, 300, 'taikodrummaster');

        // Switches the scene to the Play scene
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }

    update() {

    }
}
