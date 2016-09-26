/*
  An API for subscribing and receiving image data from
  a telescope.

  EventSource:
  'image1.png|image2.png|0|currentTime'
  We split the values @ '|' to produce the following array
  [ image1.png, image2.png, 0, currentTime  ]

  @params
  imageSize: String - 'THUMBNAIL' | 'LARGE' ( default is large )
  telescopeId: String - Example: teide2highmag
*/
// image size



// Set a flag upon the very first load into the browser (also applies to browser refresh).
let initialImg = true;

// Set up the SSE source based on the system to be monitored, as selected in the switch statement above.
const source = new EventSource('http://altair.slooh.com:3001/sse/teide2highmag');

// Add listener with callback function.  This function is executed whenever new data arrives from the source.
source.addEventListener('message', function(e) { processMsg(e.data); }, false);

// The callback function that is executed upon reciept of a new event.
function processMsg(msg) {
  // Event data is sent as a | separated string.  This breaks it into an array.
  // Full data is: currentImgURL | previousImgURL | schedMissionId | msnStartTime | lastImgTime | serverTime
  // System status is also stored in DynamoDB, but not part of event data yet.
  var msgArray = msg.split("|");

  // Get the element that will hold the bottom image in the stack.
  var bottomimg = document.getElementById("bottomimg");

  // It may take a few milliseconds to load the image from S3.  Therefore, we split the processing into two
  // parts and only execute the second part once the bottom image has been loaded.  This prevents visual
  // flicker that results when a new new top image with 0% opacity is loaded, but the visible bottom image
  // is still blank.
  bottomimg.onload = processMsg2(msgArray);

  // Load the previous image URL into the bottom of the stack.
  bottomimg.src = msgArray[1];
}

// Second half of processing takes place after bottom image is loaded.  Original event data (after array parsing) is passed alon
function processMsg2(msgArray) {
  // Calculate how many seconds we are into an image fade-in at the moment of page load or event arrival.
  // This is obtained by subtracting the last image time in seconds from the current time in seconds.
  // For new image arrival, this will generally be less than 10 seconds.
  var progress = Math.floor(Date.now() / 1000) - msgArray[4];

  // If this is the initial page load or a refresh (flag set above), then we need to determine if we are part way
  // into an image fade-in and do two things: 1) set the starting opacity to an in-progress value, and 2) adjust
  // the fade-in to be just the remaining portion of the original fade-in period.
  if (initialImg) {
    // We are into a new image by a value greater than the fade-in, so there is no fade in progress - just
    // display an image with no fade-in.
    if (progress >= 70) {
      var adjustedFade = "0s";
      var startingOpacity = "1";
    } else {
      // Otherwise, we have a fade-in in pregress. Set the adjusted fade to the portion remaining, and set the opacity
      // to whatever percentage has already faded in.
      var adjustedFade = (70 - progress) + "s";
      var startingOpacity = Math.round((progress / 70) * 100) / 100;
    }
    // Once this code has been executed, all subsequent events are NOT new page loads or refreshes, so clear the flag.
    initialImg = false;
  } else {
    // This is not a new page load or refresh, so fade in the new image with the full fade time and a starting opacity of null.
    var adjustedFade = "70s";
    var startingOpacity = "0";
  }

  // Debug statement - remove for production
  document.getElementById("curr").innerHTML = "top image: " + msgArray[0];

  // Get the element that will hold the top image in the stack.
  var topimg = document.getElementById("topimg");

  // Set the transition type to opacity, and set the initial value (computed above).
  topimg.style.transition = "opacity";
  topimg.style.opacity = startingOpacity;

  // Load the current image URL into the top of the stack.
  topimg.src = msgArray[0];

  // "GetComputedStyle" retrieves all of the CSS currently applied to the image.  We do not need that data, but calling it
  // causes the image to actually refresh in the browser.
  window.getComputedStyle(topimg, null).opacity;

  // Set the transition time and set the opacity to 1 (fully opaque).  This launches the actual fade-in from whatever
  // the starting opacity was set to above.
  topimg.style.transition = "opacity " + adjustedFade;
  topimg.style.opacity = "1";
}
