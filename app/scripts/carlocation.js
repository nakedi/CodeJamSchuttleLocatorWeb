
function CoordMapType() {
}

CoordMapType.prototype.tileSize = new google.maps.Size(256, 256);
CoordMapType.prototype.maxZoom = 19;

CoordMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('div');
  div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  div.style.fontSize = '10';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px';
  div.style.borderColor = '#AAAAAA';
  return div;
};

CoordMapType.prototype.name = "Tile #s";
CoordMapType.prototype.alt = "Tile Coordinate Map Type";

var map;
var johannesburg = new google.maps.LatLng(-26.1215, 28.20);
var coordinateMapType = new CoordMapType();
var chosenRoute = "2";
var markerIconMap;


function initialize() {
  $.ajaxPrefilter( "json script", function( options ) { options.crossDomain = true; });

  getShutlesOnRoute("2");
  var mapOptions = {
    center: johannesburg,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  map.setTilt(45);
  map.setHeading(90);

  var markerImage = 'app/images/icons/picture-18.png';
  var carMarkerImage = 'app/images/icons/limo-icon.png';


  var returnedRoutes = JSON.parse(getRoutes().responseData);
  var routeLocationDetails;
  var marker;

  for(var index = 0 ; index < returnedRoutes.length ; index ++  ){
    routeLocationDetails = new RouteLocationDetails(null,returnedRoutes[index].startPosition,returnedRoutes[index].routeName);
    marker = location(routeLocationDetails);
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', toggleBounce);

    routeLocationDetails = new RouteLocationDetails(null,returnedRoutes[index].endPosition,returnedRoutes[index].routeName);
    marker = location(routeLocationDetails);
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', toggleBounce);

  }

  var shutlesOnRoute = JSON.parse(getShutlesOnRoute(chosenRoute).responseData);
  var shutlesOnRouterouteDetails;
  var marker;
  markerIconMap = [];
  for(var index = 0 ; index < shutlesOnRoute.length ; index ++  ){
    shutlesOnRouterouteDetails = new CarLocationDetails(shutlesOnRoute[index].id,shutlesOnRoute[index].latestLocation.location,shutlesOnRoute[index].shuttleName);
    marker = location(shutlesOnRouterouteDetails);
    marker.setMap(map);
    markerIconMap.push(new MarkerIconMap(shutlesOnRoute[index].id,marker));

    google.maps.event.addListener(marker, 'click', toggleBounce);

  }

  setInterval(function() {
      var shutlesOnRoute = JSON.parse(getShutlesOnRoute(chosenRoute).responseData);
      for(var index = 0 ; index < shutlesOnRoute.length ; index ++  ){
        var newPosition = new google.maps.LatLng(shutlesOnRoute[index].latestLocation.location.longitude,shutlesOnRoute[index].latestLocation.location.latitude);
        for(var markerIndex = 0; markerIndex < markerIconMap.length; markerIndex++) {
          if(markerIconMap[markerIndex].id == shutlesOnRoute[index].id) {
            markerIconMap[markerIndex].marker.setPosition(newPosition);
            continue;
          }
        }
      }

    }, 3000);

  //detectBrowser();
}

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map-canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function CarLocationDetails(id,position, description) {
  this.id = id;
  this.position = new google.maps.LatLng(position.longitude,position.latitude);
  this.icon = 'app/images/icons/limo-icon.png';
  this.draggable = false;
  this.animation = google.maps.Animation.DROP;
  this.title = description;

  this.size = new google.maps.Size(20, 32);
  this.origin = new google.maps.Point(0, 0);
  this.anchor = new google.maps.Point(0, 32);
  this.scaledSize = new google.maps.Size(25, 25);
}

function RouteLocationDetails(id,position, description) {
  this.id = id;
  this.position = new google.maps.LatLng(position.longitude,position.latitude);;
  this.icon = 'app/images/icons/picture-18.png';
  this.draggable = false;
  this.animation = google.maps.Animation.DROP;
  this.title = description;

  this.size = new google.maps.Size(20, 32);
  this.origin = new google.maps.Point(0, 0);
  this.anchor = new google.maps.Point(0, 32);
  this.scaledSize = new google.maps.Size(25, 25);
}

function location(routeLocationDetails ){
  var marker = new google.maps.Marker({
    position: routeLocationDetails.position,
    map: map,
    icon: routeLocationDetails.icon,
    draggable: routeLocationDetails.draggable,
    animation: routeLocationDetails.animation,
    title: routeLocationDetails.title,

    // This marker is 20 pixels wide by 32 pixels tall.
    size: routeLocationDetails.size,
    // The origin for this image is 0,0.
    origin: routeLocationDetails.origin,
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: routeLocationDetails.anchor,
    scaledSize: routeLocationDetails.scaledSize
  });

  return marker;
}

function MarkerIconMap(id,marker){
  this.id = id;
  this.marker = marker;

}

google.maps.event.addDomListener(window, 'load', initialize);
