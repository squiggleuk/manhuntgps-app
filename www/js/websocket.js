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
       //var received_msg = evt.data;
       //alert("Message is received...\n" + evt.data);
       // https://stackoverflow.com/questions/40538786/googlemaps-api-how-to-remove-multiple-markers
    };

    ws.onclose = function() { 
       alert("ERROR: Connection to server was lost!"); 
    };

 }

 else {
    alert("ERROR: WebSocket not supported by your device!");
 }


