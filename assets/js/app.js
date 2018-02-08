
var map;
var infowindow;
var positionMap;
var d_map = 'map';

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.472, lng: -70.647},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  document.getElementById('btn-findMe').addEventListener('click', findMe);
  // Try HTML5 geolocation.
  function findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var marker = new google.maps.Marker({
          position: pos,
          map: map
        });
      //infoWindow.setPosition(pos);
      infoWindow.setContent(marker);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  }
  
  new Autocomplete(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function Autocomplete(map) {

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');

  var originAutocomplete = new google.maps.places.Autocomplete(
      originInput);
  var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput);
  document.getElementById('btn-rute').addEventListener('click', rute);

}

function createMarker(positionMap, map) {
  let marker = new google.maps.Marker({
    map: map,
    position: positionMap,
  });
}

function rute () {

  var request = {
   origin: $('#origin-input').val(),
   destination: $('#destination-input').val(),
   travelMode: google.maps.DirectionsTravelMode['DRIVING'],
   provideRouteAlternatives: false
   };

  map = new google.maps.Map($('#'+d_map).get(0));

  map.setCenter(positionMap);
  createMarker(positionMap, map);

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  console.log(); 

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections(response);
    } else {
            alert("No existen rutas entre ambos puntos");
    }
});
}



