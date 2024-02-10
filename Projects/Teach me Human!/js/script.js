/**
Teach me Human!
Malcolm Siné Tadonki

This project's code makes the robot ask you questions and write them and the answers on the screen 
*/

"use strict";

// Sets up the variables used for the speech recording and synthesis
let voice = new p5.Speech();
var playerVoiceRec = new p5.SpeechRec(); // new P5.SpeechRec object
playerVoiceRec.continuous = true;

// Stes the framerate and the ID's for the animations
const FRAME_RATE = 30
let rectangles = []

// Sets up the initial state of the program
let state = `Introduction`

// Sets up the variables used to store answers from the questions
let answers = []

// Sets up the variables used to store questions
let questions = []

// Sets up the variable used by the robot to answer the question
let knowledgeCheckAnswer

// Sets up the variables used for the background image
let bgImage


/**
Description of preload
Preloads the background image used for the title screen and the end screen
*/
function preload() {
    bgImage = loadImage('assets/images/Program Background.png')

}


/**
Description of Setup

Creates the canvas and sets up the voce and the speech rate relative to the robot's speech. 
*/
function setup() {
    createCanvas(800, 800);
    voice.setVoice(`Kyoko`);
    voice.setRate(0.9);
}


/**
Description of draw()

Runs the majority of the program by managing the states and the functions that run in each one respectively
*/
function draw() {

    if (state === `Introduction`) {
        titleScreen()

    }


    if (state === `Question1`) {
        robotLearning()
        playerSpeech()
    }

    if (state === `Question2`) {
        robotLearning()
        playerSpeech()
    }

    if (state === `Question3`) {
        robotLearning()
        playerSpeech()
    }


    if (state === `knowledgeTest1`) {
        robotLearning()
        playerSpeech()
    }

    if (state === `knowledgeTest2`) {
        robotLearning()
        playerSpeech()
    }

    if (state === `knowledgeTest3`) {
        robotLearning()
        playerSpeech()
    }

    if (state === `endscreen`) {
        endScreen()
    }



}

// Begins the program by swapping to the Question1 state and initiating voice recognition by clicking with the mouse
function mousePressed() {
    if (state === `Introduction`) {
        state = `Question1`;

    }
    playerVoiceRec.start();
}

// Draws the background image
function backgroundImage() {
    imageMode(CENTER)
    image(bgImage, width / 2, height / 2, 800, 800)
}

// Draws the title Screen
function titleScreen() {
    image(bgImage, width / 2, height / 2, 800, 800)
    animS.quad(rectangles[0], FRAME_RATE * 6, 10, 250, 790, 250, 790, 450, 10, 450);
    imageMode(CENTER)
    textSize(36);
    textAlign(CENTER);
    text("Teach me how to speak like you! Human!", width / 2, height / 2.5);
    textSize(16);
    text("Click to start! press the numbers 1 to 7 to swap between the different questions and states of the program.", width / 2, height / 2);
    text("Use the numbers 8 and 9 to pause and resume the robot's speech", width / 2, height / 1.8);
    // bgMusic.stop();
}

// Lets the robot speak different sentences depending on the state
function robotLearning() {
    if (state === `Question1`) {
        voice.speak(`How do humans answer positively to a question?`)
    }

    if (state === `Question2`) {
        voice.speak(`How do humans answer negatively to a question?`)
    }

    if (state === `Question3`) {
        voice.speak(`How do humans answer ambiguously to a question?`)
    }

    if (state === `knowledgeTest1`) {
        voice.speak(`I wish to test what you taught me. Ask me a question that I could answer with what I learned.`)
    }

    if (state === `knowledgeTest2`) {
        voice.speak(`I wish to keep testing. Ask me another one.`)
    }

    if (state === `knowledgeTest3`) {
        voice.speak(`Just a little more. Ask me another one last question.`)
    }

}

// Calls various functions depending on the state when the player's voice gives a result
function playerSpeech() {

    if (state === `Question1` || state === `Question2` || state === `Question3`) {
        playerVoiceRec.onResult = answerRecord;
    }

    if (state == `knowledgeTest1` || state == `knowledgeTest2` || state == `knowledgeTest3`) {
        playerVoiceRec.onResult = knowledgeChecks;
    }

}

// Records the player's answers and writes them on the screen
function answerRecord() {

    if (state === `Question1`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            answers[0] = playerVoiceRec.resultString;
            textSize(64);
            textAlign(CENTER);
            text(answers[0], width / 2, height / 2);
            nextQuestion();
        }
    }

    if (state === `Question2`) {
        if (playerVoiceRec.resultValue == true) {
            background(255, 192, 192);
            answers[1] = playerVoiceRec.resultString;
            textSize(64);
            textAlign(CENTER);
            text(answers[1], width / 2, height / 2);
            nextQuestion();
        }
    }

    if (state === `Question3`) {
        if (playerVoiceRec.resultValue == true) {
            background(255, 255, 192);
            answers[2] = playerVoiceRec.resultString;
            textSize(64);
            textAlign(CENTER);
            text(answers[2], width / 2, height / 2);
            nextQuestion();
        }
    }

}

// Records the player's questions and writes them on the screen alongside an answer
function knowledgeChecks() {

    if (state === `knowledgeTest1`) {
        if (playerVoiceRec.resultValue == true) {
            background(255, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[0] = playerVoiceRec.resultString;
            text(questions[0], width / 2, height / 2.5);
            knowledgeCheckAnswer = random(answers);
            textSize(64);
            text(knowledgeCheckAnswer, width / 2, height / 1.8);
            nextQuestion();
        }
    }

    if (state === `knowledgeTest2`) {
        if (playerVoiceRec.resultValue == true) {
            background(255, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[1] = playerVoiceRec.resultString;
            text(questions[1], width / 2, height / 2.5);
            textSize(64);
            knowledgeCheckAnswer = random(answers);
            text(knowledgeCheckAnswer, width / 2, height / 1.8);
            nextQuestion();
        }
    }

    if (state === `knowledgeTest3`) {
        if (playerVoiceRec.resultValue == true) {
            background(255, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[2] = playerVoiceRec.resultString;
            text(questions[2], width / 2, height / 2.5);
            textSize(64);
            knowledgeCheckAnswer = random(answers);
            text(knowledgeCheckAnswer, width / 2, height / 1.8);
            nextQuestion();
        }
    }

}

// This function makes the robot automatically progress to its next question.
function nextQuestion() {
    if (playerVoiceRec.resultValue === true) {

        if (state === `Question1`) {
            setTimeout(() => { state = `Question2` }, 1000);
            animS.reset();
        }

        if (state === `Question2`) {
            setTimeout(() => { state = `Question3` }, 1000);
            animS.reset();
        }

        if (state === `Question3`) {
            setTimeout(() => { state = `knowledgeTest1` }, 1000);
            animS.reset();
        }

        if (state === `knowledgeTest1`) {
            setTimeout(() => { state = `knowledgeTest2` }, 1000);
            animS.reset();
        }

        if (state === `knowledgeTest2`) {
            setTimeout(() => { state = `knowledgeTest3` }, 1000);
            animS.reset();
        }
        if (state === `knowledgeTest3`) {
            setTimeout(() => { state = `endscreen` }, 1000);
            animS.reset();
        }
    }
}

// This function allows the player to return to any question the robot asked or to skip ahead questions even.
function keyPressed() {

    if (keyCode === 49) {
        state = `Question1`;
        animS.reset();
    }

    if (keyCode === 50) {
        state = `Question2`;
        animS.reset();
    }

    if (keyCode === 51) {
        state = `Question3`;
        animS.reset();
    }

    if (keyCode === 52) {
        state = `knowledgeTest1`;
        animS.reset();
    }

    if (keyCode === 53) {
        state = `knowledgeTest2`;
        animS.reset();
    }

    if (keyCode === 54) {
        state = `knowledgeTest3`;
        animS.reset();
    }

    if (keyCode === 55) {
        state = `endscreen`;
        animS.reset();
    }

    if (keyCode === 56) {
        voice.pause()
    }

    if (keyCode === 57) {
        voice.resume()
    }

}

// Draws the ending screen
function endScreen() {
    // Draws the end screen
    image(bgImage, width / 2, height / 2, 800, 800)
    fill(255, 255, 255)
    animS.quad(rectangles[1], FRAME_RATE * 6, 10, 350, 790, 350, 790, 420, 10, 420);
    textAlign(CENTER);
    textSize(34);
    fill(0, 0, 0);
    text(`You've taught the robot how to speak like a human!`, width / 2, height / 2);
    voice.stop()
}

