/**
Camera Heroes
Malcolm Siné Tadonki

Move around a maze to obtain the weapons needed to destroy the Maleficient Rune!
*/

"use strict";

// These are the configuration parameters for the game
let config = {
    // The type refers to the kind of display we'll be using
    // which is either Canvas or WebGL. The Phaser.AUTO setting
    // will choose the best option for us.
    type: Phaser.AUTO,
    // Defines game dimensions
    width: 400,
    height: 320,
    // Creates basic physics
    physics: {
        default: 'arcade',
    },
    // Lists array of scenes and scales them appropriately
    scene: [Boot, TitleScreen, Play, EndScreen],
    scale: {
        zoom: 2
    }
};

// Creates the variables used to keep track of if the items are collected or not
let swordPickup = false
let staffPickup = false

// Assigns the amount of life points the maleficient rune has
let maleficientRuneLifePoints = 100000

// Creates the game using the configuration
let game = new Phaser.Game(config);

/**
Unused
*/
function preload() {

}


/**
Unused
*/
function setup() {

}


/**
Unused
*/
function draw() {

}