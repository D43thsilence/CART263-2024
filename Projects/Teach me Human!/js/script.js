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

// Sets up the initial state of the program
let state = `Introduction`

// Sets up the variables used to store answers from the questions
let answers = [
    firstAnswer,
    secondAnswer,
    thirdAnswer
]
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

}


/**
Description of draw()
*/
function draw() {

    if (state === `introduction`) {
        introduction()

    }


    if (state === `Question1`) {

        questions()
        setTimeout(playerAnswer, 3000)


        nextQuestion()
    }

    if (state === `Question2`) {
        questions()
        setTimeout(playerAnswer, 3000)

        nextQuestion()
    }

    if (state === `Question3`) {
        questions()
        setTimeout(playerAnswer, 3000)

        nextQuestion()
    }


    if (state === `knowledgeTest1`) {
        robotTestingQuestions()
        setTimeout(playerAsking, 3000)

        nextQuestion()
    }

    if (state === `knowledgeTest2`) {
        robotTestingQuestions()
        setTimeout(playerAsking, 3000)

        nextQuestion()
    }

    if (state === `knowledgeTest3`) {
        robotTestingQuestions()
        setTimeout(playerAsking, 3000)

        nextQuestion()
    }

    backgroundImage()

    if (state === `endscreen`) {
        endScreen()

    }


}

function mousePressed() {
    voice.speak(firstAnswer);
    if (state === `Introduction`) {
        state = `playerTurn`;
        // playBgMusic()
        // gameStartSFX.play();
    }
}

function playBgMusic() {
    if (!bgMusic.isPlaying()) {
        bgMusic.loop();
    }
}

function backgroundImage() {
    background(255, 0, 255);
}

function introduction() {
    background(255, 255, 255);
    fill(0, 0, 0, 255);

    textSize(32);
    textAlign(CENTER);
    text("say something", width / 2, height / 2);
    // bgMusic.stop();
}

function playerAnswer() {

    if (state === `Question1` || state === `Question2` || state === `Question3`) {
        playerVoiceRec.onResult = answerRecord;
        playerVoiceRec.start();
    }


}

function playerAsking() {

    if (state === `KnowledgeTest1` || state === `KnowledgeTest2` || state === `KnowledgeTest3`) {
        playerVoiceRec.onResult = knowledgeChecks;
        playerVoiceRec.start();
    }
}

function questions() {
    if (state === `Question1`) {

    }

    if (state === `Question2`) {

    }

    if (state === `Question3`) {

    }
}

function answerRecord() {

    if (state === `Question1`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            answers[0] = playerVoiceRec.resultString
            text(answers[0], width / 2, height / 2);
            console.log(firstAnswer);
        }
    }

    if (state === `Question2`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            answers[1] = playerVoiceRec.resultString
            text(answers[1], width / 2, height / 2);
            console.log(secondAnswer);
        }
    }

    if (state === `Question3`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            answers[2] = playerVoiceRec.resultString
            text(answers[2], width / 2, height / 2);
            console.log(thirdAnswer);
        }
    }

}

function robotTestingQuestions() {

    if (state === `knowledgeTest1`) {

    }

    if (state === `knowledgeTest2`) {

    }

    if (state === `knowledgeTest3`) {

    }
}

function knowledgeChecks() {

    if (state === `knowledgeTest1`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            knowledgeCheckAnswer = random(answers)
            text(knowledgeCheckAnswer, width / 2, height / 2);
        }
    }

    if (state === `knowledgeTest2`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            knowledgeCheckAnswer = random(answers)
            text(knowledgeCheckAnswer, width / 2, height / 2);
        }
    }

    if (state === `knowledgeTest3`) {
        if (playerVoiceRec.resultValue == true) {
            background(192, 255, 192);
            knowledgeCheckAnswer = random(answers)
            text(knowledgeCheckAnswer, width / 2, height / 2);
        }
    }

}

function nextQuestion() {
    if (playerVoiceRec.resultValue === true) {

        if (state === `Question1`) {
            setTimeout(() => { state = `Question2` }, 2000);
        }

        if (state === `Question2`) {
            setTimeout(() => { state = `Question3` }, 2000);
        }

        if (state === `Question3`) {
            setTimeout(() => { state = `KnowledgeTest1` }, 2000);
        }

        if (state === `knowledgeTest1`) {
            setTimeout(() => { state = `KnowledgeTest2` }, 2000);
        }

        if (state === `knowledgeTest2`) {
            setTimeout(() => { state = `KnowledgeTest3` }, 2000);
        }
        if (state === `knowledgeTest3`) {
            setTimeout(() => { state = `endScreen` }, 2000);
        }
    }
}

function resetProgram() {

    if (!playerVoiceRec.resultValue) {
        return;
    }
    console.log(playerVoiceRec.resultString);

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
    fill(255, 255, 255);
    text(`You've taught the robot how to speak like a human!`, width / 2, height / 2);
    // gameWinSFX.play();
    // bgMusic.stop();
    // noLoop();
}

