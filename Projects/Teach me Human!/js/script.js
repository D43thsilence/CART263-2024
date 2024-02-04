/**
Teach me Human!
Malcolm Siné Tadonki

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Sets up the variables used for the speech recording and synthesis
let voice = new p5.Speech();
var playerVoiceRec = new p5.SpeechRec(); // new P5.SpeechRec object
playerVoiceRec.continuous = true;

// Sets up the initial state of the program
let state = `Introduction`

// Sets up the variables used to store answers from the questions
let answers = []

// Sets up the variables used to store questions
let questions = []

// Sets up the variable used by the robot to answer the question
let knowledgeCheckAnswer

// Sets up the variables used for sounds
let bgMusic
let gameStartSFX
let gameWinSFX

// Sets up commands that can be used anytime
const commands = [
    {
        "command": "Reset the program",
        "callback": resetProgram
    }

]


/**
Description of preload
*/
function preload() {

}


/**
Creates the canvas and sets up the initial instructions relative to the speech recognition
*/
function setup() {
    createCanvas(800, 800);

    voice.setVoice(`Kyoko`);
}


/**
Description of draw()
*/
function draw() {
    console.log(state)
    console.log(answers[0])
    console.log(answers[1])
    console.log(answers[2])
    console.log(questions[0])
    console.log(questions[1])
    console.log(questions[2])

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

    // backgroundImage()

}

function mousePressed() {
    if (state === `Introduction`) {
        state = `Question1`;
        // playBgMusic()
        // gameStartSFX.play();
    }
    playerVoiceRec.start();
}

function playBgMusic() {
    if (!bgMusic.isPlaying()) {
        bgMusic.loop();
    }
}

function backgroundImage() {
    background(210, 210, 240);
}

function titleScreen() {
    background(210, 210, 240);
    // fill(0, 0, 0, 255);

    textSize(32);
    textAlign(CENTER);
    text("say something", width / 2, height / 2);
    // bgMusic.stop();
}

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
    console.log(`learn`)
}

function playerSpeech() {

    if (state === `Question1` || state === `Question2` || state === `Question3`) {
        playerVoiceRec.onResult = answerRecord;

    }

    if (state == `knowledgeTest1` || state == `knowledgeTest2` || state == `knowledgeTest3`) {
        playerVoiceRec.onResult = knowledgeChecks;

    }
    console.log(`hello`)
}


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


function knowledgeChecks() {

    if (state === `knowledgeTest1`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[0] = playerVoiceRec.resultString;
            text(questions[0], width / 2.5, height / 2.5);
            knowledgeCheckAnswer = random(answers);
            textSize(64);
            text(knowledgeCheckAnswer, width / 2, height / 2);
            nextQuestion();
        }
    }

    if (state === `knowledgeTest2`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[1] = playerVoiceRec.resultString;
            text(questions[1], width / 2.5, height / 2.5);
            textSize(64);
            knowledgeCheckAnswer = random(answers);
            text(knowledgeCheckAnswer, width / 2, height / 2);
            nextQuestion();
        }
    }

    if (state === `knowledgeTest3`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            textSize(64);
            textAlign(CENTER);
            questions[2] = playerVoiceRec.resultString;
            text(questions[2], width / 2.5, height / 2.5);
            textSize(64);
            knowledgeCheckAnswer = random(answers);
            text(knowledgeCheckAnswer, width / 2, height / 2);
            nextQuestion();
        }
    }

}

// This function makes the robot automatically progress to its next question.
function nextQuestion() {
    if (playerVoiceRec.resultValue === true) {

        if (state === `Question1`) {
            setTimeout(() => { state = `Question2` }, 1000);
        }

        if (state === `Question2`) {
            setTimeout(() => { state = `Question3` }, 1000);
        }

        if (state === `Question3`) {
            setTimeout(() => { state = `KnowledgeTest1` }, 1000);
        }

        if (state === `knowledgeTest1`) {
            setTimeout(() => { state = `KnowledgeTest2` }, 1000);
        }

        if (state === `knowledgeTest2`) {
            setTimeout(() => { state = `KnowledgeTest3` }, 1000);
        }
        if (state === `knowledgeTest3`) {
            setTimeout(() => { state = `endScreen` }, 1000);
        }
    }
}

// This function allows the player to return to any question the robot asked or to skip ahead questions even.
function keyPressed() {

    if (keyCode === 49) {
        state = `Question1`
    }

    if (keyCode === 50) {
        state = `Question2`
    }

    if (keyCode === 51) {
        state = `Question3`
    }

    if (keyCode === 52) {
        state = `KnowledgeTest1`
    }

    if (keyCode === 53) {
        state = `KnowledgeTest2`
    }

    if (keyCode === 54) {
        state = `KnowledgeTest3`
    }

    if (keyCode === 55) {
        state = `endScreen`
    }

}


function resetProgram() {

    if (!playerVoiceRec.resultValue) {
        return;
    }

    for (let command of commands) {
        if (playerVoiceRec.resultString.toLowerCase() === command.command) {
            // We have a match, execute the corresponding callback
            command.callback();
            break;
        }
    }


    if (state === `introduction`) {
        voice.speak(`Why would I reset ? We are already at the beginning.`);
    }

    else {
        voice.speak(`Resetting.`);
        setTimeout(() => { state = `introduction` }, 2000);
    }

}

function endScreen() {
    // Draws the end screen
    textAlign(CENTER);
    textSize(65);
    background(100, 100, 100);
    text(`You've taught the robot how to speak like a human!`, width / 2, height / 2);
    // gameWinSFX.play();
    // bgMusic.stop();
    // noLoop();
}

