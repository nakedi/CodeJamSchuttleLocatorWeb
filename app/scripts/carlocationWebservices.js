/**
 * Created by nakedimabusela on 2014/12/05.
 */

var serviceLocation = "http://192.168.1.104:8080";
var SHURTLE_ON_ROUTE_SERVICE = "/locations";
var SHURTLE_ROUTE_SERVICE = "/getRoutes";

var SHUTTLE_LOCATION_UPDATE_SERVICE = "/locationUpdate";

var serviceResponse;


function hello(){
  alert("HELLO");
}

/*
  Service : getShutlesOnRoute
 */
function getShutlesOnRoute(routeId){
  var params = routeId;
  var result = callService(serviceLocation,SHURTLE_ON_ROUTE_SERVICE,params);
  return serviceResponse;
}

/*
 Service : getRoutes
 */
function getRoutes(){
  var result = callService(serviceLocation,SHURTLE_ROUTE_SERVICE,null);
  return serviceResponse;
}


function getLocationUpdate(){
  var result = callService(serviceLocation,SHUTTLE_LOCATION_UPDATE_SERVICE,null);
  return serviceResponse;
}


function callService(serviceUrl,service,parameters) {
  var client = getPrepareRequest(service);
  var parameterConcat = "";
  if(parameters != null){
    parameterConcat = "/"+parameters;
  }
  client.open("PUT", serviceUrl+service+parameterConcat, false);
  client.send(null);
  if (client.status == 200) {
    //alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
  }else {
    alert("The request did not succeed!\n\nThe response status was: " + client.status + " " + client.statusText + ".");
  }
}


function createRequest() {
  var result = new XMLHttpRequest();
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
    result.overrideMimeType('text/plain'); // Or anything else
  }
  else if (window.ActiveXObject) {
    // MSIE
    result = new ActiveXObject("Microsoft.XMLHTTP");
  }
  else {
    // No known mechanism -- consider aborting the application
  }
  return result;
}

function getPrepareRequest(service){
  var req = createRequest(); // defined above
// Create the callback:
  req.onreadystatechange = function() {
    if (req.readyState != 4) return; // Not there yet
    if (req.status == 200) {
      //alert("The request succeeded!\n\nThe response representation was:\n\n" + req.responseText);
    }else {
      alert("The request did not succeed!\n\nThe response status was: " + req.status + " " + req.statusText + ".");
    }
    // Request successful, read the response
    var resp = req.responseText;
    // ... and use it as needed by your app.
    serviceResponse = new ServiceResponse(service,resp);
    //alert("callback method response : " + resp);
  }

  return req;

}

function ServiceResponse(service,responseData){
  this.service = service;
  this.responseData = responseData;
}
