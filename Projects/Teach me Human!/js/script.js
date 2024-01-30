/**
Teach me Human!
Malcolm Siné Tadonki

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Sets up the variables used for the speech recording and synthesis
let voice = new p5.Speech();
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object

// Sets up the initial state of the program
let state = `Introduction`

// Sets up the variables used to store answers from the questions
let firstAnswer

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
    background(255, 255, 255);
    fill(0, 0, 0, 255);

    textSize(32);
    textAlign(CENTER);
    text("say something", width / 2, height / 2);
    myRec.onResult = showResult;
    myRec.start();
}


/**
Description of draw()
*/
function draw() {

    if (state === `introduction`) {


    }

}

function showResult() {
    if (myRec.resultValue == true) {
        background(192, 255, 192);
        firstAnswer = myRec.resultString
        text(firstAnswer, width / 2, height / 2);
        console.log(firstAnswer);
    }
}

function mousePressed() {
    voice.speak(firstAnswer);
}