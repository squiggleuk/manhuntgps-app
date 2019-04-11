function log_it(log_text){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("logOutput").innerHTML = time + ' ' + log_text + '<br>' + document.getElementById("logOutput").innerHTML ;
}
