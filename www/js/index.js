var controller = null;
var activity_log = null;
var mymarker = null;
var markers = {};
var map = null;
var map_style = {
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    }
  ]
};

var names = ['Bob', 'Fred', 'John', 'Jane', 'Bill', 'Paul', 'Ian', 'Barry', 'Tom', 'Dave', 'Sue', 'Terry']; 
var playerId = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);


var app = {
  // Application Constructor
  initialize: function() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      document.addEventListener("deviceready", this.onDeviceReady, false);
    } else {
      this.onDeviceReady();
    }
  },

  onDeviceReady: function() {
    // We will init / bootstrap our application here
    controller = new Controller();
    var watchID = navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, {
        timeout: 30000,
        enableHighAccuracy: false
        }
    );
  }
};

var onLocationSuccess = function(position) {
    var data = {};
    data["action"] = "updateLocation";
    data["playerId"] = playerId;
    data["lat"] = position.coords.latitude;
    data["lng"] = position.coords.longitude;
    ws.send(JSON.stringify(data));
    log_it("Sent new location to server");
    my_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    if ( mymarker == null) {
        mymarker = map.addMarker({
        icon: "img/dot_blue.gif",
        title: playerId,
        position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        });
        map.setCameraTarget(my_location);
        map.animateCamera({
        target: my_location,
        zoom: 13,
        duration: 5000
        });
    } else {
        mymarker.setPosition(my_location);
    }
};

function onLocationError(error) {
  log_it("Geolocator error " + error.code + " (" + error.message + ")");
}

function log_it(log_text) {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("logOutput").innerHTML = time + ' ' + log_text + '<br>' + document.getElementById("logOutput").innerHTML ;
}

app.initialize();
