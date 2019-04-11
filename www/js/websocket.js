// Generate a username for this client
var names = ['Bob', 'Fred', 'John', 'Jane', 'Bill', 'Paul', 'Ian', 'Barry', 'Tom', 'Dave', 'Sue', 'Terry']; 
var playerId = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);
document.getElementById("playerId").innerHTML = playerId;

if ("WebSocket" in window) {

    var ws = new WebSocket("wss://6vj1exghl3.execute-api.eu-west-1.amazonaws.com/dev");

    ws.onopen = function() {
       //ws.send(JSON.stringify(data));
       //alert("Message is sent...\n" + JSON.stringify(data));
    };

    ws.onmessage = function (evt) {
       var received_msg = JSON.parse(evt.data);

       // Process location update messages from other players
       if (received_msg.action == 'updateLocation' && received_msg.playerId != playerId) {
         alert("Update from other player: " + received_msg.playerId);
         if (typeof markers[received_msg.playerId] === "undefined") { // check if first time on marker
            markers[received_msg.playerId] = map.addMarker({
               'icon': 'http://maps.gstatic.com/mapfiles/markers2/measle_blue.png',
               'position': {
                 lat: received_msg.lat,
                 lng: received_msg.lng
               }});
         }
         else {
            received_location = { "lat": received_msg.lat, "lng": received_msg.lng };
            markers[received_msg.playerId].setPosition(received_location);
         }

       }

       // https://stackoverflow.com/questions/40538786/googlemaps-api-how-to-remove-multiple-markers
       // {"action": "updateLocation", "playerId": "GEOFF", "lat": 52.322, "lng": 0.3232}
    };

    ws.onclose = function() { 
       alert("ERROR: Connection to server was lost!"); 
    };

 }

 else {
    alert("ERROR: WebSocket not supported by your device!");
 }


