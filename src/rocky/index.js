// Rocky.js
var rocky = require('rocky');

// Global object to store home assistant data
var homeassistantData;

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});

rocky.on('minutechange', function(event) {
  // Tick every minute
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message) {
    // Save the home assistant data
    homeassistantData = message;

    // Request a redraw so we see the information
    rocky.requestDraw();
  
  }
  
});

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (homeassistantData) {
    drawHomeassistantData(ctx, homeassistantData);
  }

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var d = new Date();

  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'center';

  // Display the time, in the middle of the screen
  ctx.font = '42px bold numbers Leco-numbers';
  //ctx.fillText(d.toLocaleTimeString(), w / 2, h / 1.4, w);
  var hours = d.toLocaleTimeString().split(':')[0];
  var minutes = d.toLocaleTimeString().split(':')[1];
  ctx.fillText(hours + ':' + minutes, w / 2, h / 1.4, w);
  
});

rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});


function drawHomeassistantData(ctx, homeassistantData) {
  // Create a string describing the homeassistantData
  var thermostate_state = homeassistantData.thermostate;
  var set_temperature = homeassistantData.set_temperature;
  var current_temperature = homeassistantData.current_temperature;
  var humidity = homeassistantData.humidity;
  var upstairs_lights = homeassistantData.upstairs_lights;
  var living_room_lights = homeassistantData.living_room_lights;
  // Draw the text, top center
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'left';
  ctx.font = '18px Gothic';
  //  ctx.fillText(temperature, ctx.canvas.unobstructedWidth / 2, 2);
  ctx.fillText('Temp:            ' + current_temperature, 0, 2);
  ctx.fillText('Set Temp:      ' + set_temperature, 0, 20);
  ctx.fillText('Thermostate: ' + thermostate_state, 0, 40);
  ctx.fillText('Humidity:       ' + humidity, 0, 60);
  ctx.fillText('Upstairs:        ' + upstairs_lights, 0, 80);
  ctx.fillText('Downstairs:   ' + living_room_lights, 0, 100);
}

