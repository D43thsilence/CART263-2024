class TitleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `TitleScreen`
        });
    }

    create() {

        // Creates style objects to define what the text will look like
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            fill: `#ffffff`,
        };

        let style2 = {
            fontFamily: `sans-serif`,
            fontSize: `20px`,
            fill: `#ffffff`,
        };

        let style3 = {
            fontFamily: `sans-serif`,
            fontSize: `10px`,
            fill: `#ffffff`,
        };

        let style4 = {
            fontFamily: `sans-serif`,
            fontSize: `8px`,
            fill: `#ffffff`,
        };

        // Adds the background of the title screen
        this.add.sprite(200, 160, `titleScreen`)

        // Creates text strings used in the title screen
        let gameDescription = `Camera Heroes!`;
        let gameInstructions = `Use the WASD keys and the arrow keys to move both characters.`;
        let gameInstructions4 = `Use the E and R keys to shrink and return to your original size as P1. Player 2 uses the I and O keys`
        let gameInstructions2 = `Pick up the weapons in the dungeon (P1 = F to swing, P2 = k to swing)`;
        let gameInstructions3 = `Your objective is to destroy the Maleficent Rune with the help of both weapons!`;
        let gameInstructions5 = `Use the G key as player 1 and the L key as player 2 to interact with objects.`
        let startInstruction = `Click to start!`;

        // Draws the text on the Title Screen
        this.gameText = this.add.text(width / 1.8, height / 2.6, gameDescription, style);
        this.gameText = this.add.text(width / 1.9, height / 0.7, gameInstructions, style3);
        this.gameText = this.add.text(width / 4, height / 0.59, gameInstructions4, style4);
        this.gameText = this.add.text(width / 2.2, height / 0.52, gameInstructions2, style3);
        this.gameText = this.add.text(width / 2.6, height / 0.47, gameInstructions5, style3);
        this.gameText = this.add.text(width / 3.4, height / 0.42, gameInstructions3, style3);
        this.gameText = this.add.text(width / 0.7, height / 0.38, startInstruction, style2);

        // Switches the scene to the Play scene
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }

    update() {

    }
}
