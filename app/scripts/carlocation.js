
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


function initialize() {

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


  //var returnedRoutes = gJSON.parse(etRoutes());

  var marker = new google.maps.Marker({
    position: johannesburg,
    map: map,
    icon: markerImage,
    draggable: false,
    animation: google.maps.Animation.DROP,
    title: "5 Simmons Street",

    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32),
    scaledSize: new google.maps.Size(25, 25)
  });


  var carMarker = new google.maps.Marker({
    position: new google.maps.LatLng(-26.1215, 28.201),
    map: map,
    icon: carMarkerImage,
    draggable: false,
    animation: google.maps.Animation.DROP,
    title: "5 Simmons Street",

    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32),
    scaledSize: new google.maps.Size(25, 25)
  });

  marker.setMap(map);
  carMarker.setMap(map);
  google.maps.event.addListener(marker, 'click', toggleBounce);

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

function carLocationDetails(position, description) {
  this.position = position;
  this.icon = 'app/images/icons/limo-icon.png';
  this.draggable = false;
  this.animation = google.maps.Animation.DROP;
  this.title = description;

  this.size = new google.maps.Size(20, 32);
  this.origin = new google.maps.Point(0, 0);
  this.anchor = new google.maps.Point(0, 32);
  this.scaledSize = new google.maps.Size(25, 25);
}

function routeLocationDetails(position, description) {
  this.position = position;
  this.icon = markerImage;
  this.draggable = false;
  this.animation = google.maps.Animation.DROP;
  this.title = description;

  this.size = new google.maps.Size(20, 32);
  this.origin = new google.maps.Point(0, 0);
  this.anchor = new google.maps.Point(0, 32);
  this.scaledSize = new google.maps.Size(25, 25);
}

google.maps.event.addDomListener(window, 'load', initialize);
