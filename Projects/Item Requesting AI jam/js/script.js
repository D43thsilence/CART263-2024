/**
Bring me what I need!
Malcolm Sine Tadonki

In this program, you must show to the camera the objects that the program asks you to show. To complete the request, all items must be visible at the same time.
*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

// Creates an array to store the items that the program requests
let itemsList = [``];
let itemListSize = 4;

// Sets the framerate and the ID used for the animation
const FRAME_RATE = 30
let listNote

// The current top result as predicted by the classifier
let topResult = undefined;

/**
Starts the webcam and the ObjectDetector
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the CocoSsd model and when it's ready start detection
  // and switch to the running state
  cocossd = ml5.objectDetector('cocossd', {}, function() {
    // Ask CocoSsd to start detecting objects, calls gotResults
    // if it finds something
    cocossd.detect(video, gotResults);
    // Switch to the running state
    state = `running`;
  });

  // Selects the items to acquire to complete the request
  itemSelection()
  console.log(itemsList[0])
console.log(itemsList[1])
console.log(itemsList[2])
console.log(itemsList[3])

}

/**
Called when CocoSsd has detected at least one object in the video feed
*/
function gotResults(err, results) {
  // If there's an error, report it
  if (err) {
    console.error(err);
  }
  // Otherwise, save the results into our predictions array
  else {
    predictions = results;
  }

  // Otherwise, if there are results, get the first result in the array!
  // if (results.length > 0) {
  //   topResult = results[0];
  // }

  // Ask CocoSsd to detect objects again so it's continuous
  cocossd.detect(video, gotResults);
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
function running() {
  // Display the webcam
  image(video, 0, 0, width, height);

  // Check if there currently predictions to display
  if (predictions) {
    // If so run through the array of predictions
    for (let i = 0; i < predictions.length; i++) {
      // Get the object predicted
      let object = predictions[i];
      // Highlight it on the canvas
      highlightObject(object);
    }
  }

  // Displays the list of items to gather to complete the request
  displayItemList()
  itemsList[0] = 'cell phone'
  console.log(itemsList[0])
  console.log(itemsList[1])
  console.log(itemsList[2])
  console.log(itemsList[3])
  itemRecognition()

}

/**
Provided with a detected object it draws a box around it and includes its
label and confidence value
*/
function highlightObject(object) {
  // Display a box around it
  push();
  noFill();
  stroke(255, 255, 0);
  rect(object.x, object.y, object.width, object.height);
  pop();
  // Display the label and confidence in the center of the box
  push();
  textSize(18);
  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
  pop();
}

function itemSelection() {

  for (let i = 0; i < itemListSize; i++) {
    itemsList[i] = random(cocossdObjects);
};
  
}

function displayItemList() {

  animS.quad(listNote, FRAME_RATE * 6, 10, 20, 200, 20, 200, 150, 10, 150);

//   for (let i = 0; i < itemListSize; i++) {
//     textSize(64);
//     textAlign(CENTER);
//     text(itemslist[i], width / 2 + i * 20, height / 2 * 20 );
// };

}

function itemRecognition() {

  // for (let i = 0; i < itemListSize; i++) {
    
  //   if (object.label === itemList[i]) {
  //   textSize(64);
  //   textAlign(CENTER);
  //   text(itemslist[i], width / 2 + i * 20, height / 2 * 20 );
  //   }

  //   };

for (let i = 0; i < itemListSize; i++) {
      // Check if there is currently a result to compare with the desire
      if (topResult) {
        // Store the true/false value of whether the label of the top results is the
        // same as the stated desire (e.g. they're showing us something that matches
        // the stated desire)
        let success = (topResult.label === itemsList[i]);
        // Display a rectangle around the currently identified object
        push();
        noFill();
        // Give it a green outline if it's a successful object and red otherwise
        if (success) {
          stroke(0, 255, 0);
        }
        else {
          stroke(255, 0, 0);
        }
        strokeWeight(10);
        rect(topResult.x, topResult.y, topResult.width, topResult.height);
        pop();
    
        // Store a word indicated success/failure to display
        let result = ``;
        if (success) {
          result = `Yes.`;
        }
        else {
          result = `No.`;
        }
    
        // Display the text in the centre of the rectangle identifying the object
        push();
        // Make the text green if successful and red otherwise
        if (success) {
          fill(0, 255, 0);
        }
        else {
          fill(255, 0, 0);
        }
        textAlign(CENTER, CENTER);
        textSize(32);
        textStyle(BOLD);
        text(result, topResult.x + topResult.width / 2, topResult.y + topResult.height / 2);
        pop();
    
        // If this was a successful object, then stop the program so they can enjoy their victory
        if (success) {
          noLoop();
        }
      }
    }

}