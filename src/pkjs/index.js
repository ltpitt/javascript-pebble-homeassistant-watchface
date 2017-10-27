// PebbleKit JS (pkjs)

Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;
  if (message.fetch) {
      var url = 'YOUR_URL';
      request(url, 'GET', function(respText) {
          var homeassistantData = JSON.parse(respText);      
          Pebble.postMessage(homeassistantData);
      });
  }
});

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    // HTTP 4xx-5xx are errors:
    if (xhr.status >= 400 && xhr.status < 600) {
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}
