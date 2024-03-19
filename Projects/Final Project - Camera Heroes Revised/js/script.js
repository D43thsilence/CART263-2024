/**
Camera Heroes
Malcolm Siné Tadonki

Move around a maze to obtain the weapons needed to destroy the Maleficient Rune!
*/

"use strict";

// These are the configuration parameters for the game
let config = {
    // Automatically sets the game's display
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

// Sets up the proximity and attackRange variable to measure how far the players are from the Maleficient Rune and at what range they can hit it.
let proximity = {
    distance1: 0,
    distance2: 0
}

let attackRange = 80

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