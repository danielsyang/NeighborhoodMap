'use strict';

var map;
var markers = [];
var infoWind;
var bounds;
var streetViewService;
var radius = 50;

var imageApi = "https://maps.googleapis.com/maps/api/streetview?size=300x150&location=";

var locations = [{
    title: "Museum of Art of São Paulo Assis Chateaubriand",
    lat: -23.5615226,
    lng: -46.6563446,
    streetAddress: "Av. Paulista, 1578, São Paulo",
    info: "The São Paulo Museum of Art (Portuguese: Museu de Arte de São Paulo, or MASP) " +
    "is an art museum located on Paulista Avenue in the city of São Paulo, Brazil. It is well known for its headquarters, " +
    "a 1968 concrete and glass structure designed by Lina Bo Bardi, whose main body is supported by two lateral beams over a " +
    "74 metres (243 ft) freestanding space, considered a landmark of the city and a main symbol of modern Brazilian architecture.",
    img_info: "&fov=120&heading=80&pitch=30"
  }, {
    title: "Aquário de São Paulo",
    lat: -23.593378,
    lng: -46.613979,
    streetAddress: "R. Huet Bacelar, 407, São Paulo",
    info: "Considered a reference in the treatment and exhibition of animals, " +
    "São Paulo Aquarium is the largest aquarium in Latin America. It was opened in 2006, featuring 9 thousand m² and 2 million gallons of water." +
    "The only thematic aquarium in Brazil, this complex induces visitors to feel immersed in the environments,  " +
    "which have approximately 3000 specimens of 300 species of animals. Brazilian forests are portrayed in the first sector, " +
    " dedicated to fresh water, and which addresses issues such as pollution of rivers and endangered species.",
    img_info: "&fov=200&heading=1&pitch=5"
  }, {
    title: "Paulista Museum",
    lat: -23.585578,
    lng: -46.609679,
    streetAddress: "Parque da Independência, São Paulo",
    info: "The Museu Paulista of the University of São Paulo (commonly known in São Paulo and all Brazil as Museu do Ipiranga) " +
    "is a Brazilian history museum located near where Emperor Pedro I proclaimed the Brazilian independence on the banks of Ipiranga " +
    "brook in the Southeast region of the city of São Paulo, then the 'Caminho do Mar,' or road to the seashore. " +
    "It contains a huge collection of furniture, documents and historically relevant artwork, especially relating to the Brazilian Empire era.",
    img_info: "&fov=200&heading=-20&pitch=15"
  }, {
    title: "Municipal Theatre of São Paulo",
    lat: -23.5456103,
    lng: -46.6390312,
    streetAddress: "Praça Ramos de Azevedo, São Paulo",
    info: "Municipal Theatre of São Paulo is a theatre in São Paulo, Brazil. It is regarded as one of the landmarks of the city, " +
    "significant both for its architectural value as well as for its historical importance, having been the venue for the " +
    "Week of Modern Art in 1922, which revolutionised the arts in Brazil. The building now houses the São Paulo Municipal Symphonic Orchestra, " +
    "the Coral Lírico (Lyric Choir) and the City Ballet of São Paulo.",
    img_info: "&fov=50-&heading=50&pitch=15"
  }, {
    title: "Pinacoteca do Estado de São Paulo",
    lat: -23.5348954,
    lng: -46.6341288,
    streetAddress: "Praça da Luz, São Paulo",
    info: "The Pinacoteca do Estado de São Paulo is one of the most important art museums in Brazil. It is housed in a 1900 building in " +
    "Jardim da Luz, Downtown São Paulo, designed by Ramos de Azevedo and Domiziano Rossi to be the headquarters of the Lyceum of Arts and Crafts. " +
    "It is the oldest art museum in São Paulo, founded on December 24, 1905, and established as a state museum since 1911.",
    img_info: "&fov=100-&heading=20&pitch=10"
  }, {
    title: "Ibirapuera Park",
    lat: -23.5860937,
    lng: -46.6558782,
    streetAddress: "Parque Ibirapuera, São Paulo",
    info: "Ibirapuera Park is a major urban park in São Paulo, Brazil. It has a large area for leisure, jogging and walking, " +
    "as well a vivid cultural scene with museums and a music hall. Its importance to São Paulo is often comparable to that of " +
    "Central Park to New York City, Golden Gate Park to San Francisco, or Ueno Park to Tokyo. Ibirapuera is one of Latin America's " +
    "largest city parks, together with Chapultepec Park in Mexico City and Simón Bolívar Park in Bogota.",
    img_info: "&fov=200-&heading=170&pitch=10"
}];

function initMap() {

  var options = {
    center: {
      lat: -23.564005,
      lng: -46.627078
    },
    zoom: 14,
    disableDefaultUI: true,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  };
  var element = $('#map-canvas');

  infoWind = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
  streetViewService = new google.maps.StreetViewService();

  map = new google.maps.Map(element[0], options);
  initMarker(locations);
}

function initMarker(locations) {
  for (var i = 0; i < locations.length; i++) {
    var title = locations[i].title;
    var coordinates = {
      lat: locations[i].lat,
      lng: locations[i].lng
    };

    var marker = new google.maps.Marker({
      map: map,
      position: coordinates,
      title: title,
      streetAddress: locations[i].streetAddress,
      animation: google.maps.Animation.DROP,
      info: locations[i].info,
      id: i
    });

    marker.addListener('click', function() {
      createInfoWindow(this, infoWind);
    });
    markers.push(marker);
    bounds.extend(marker.position);

    locations[i].googleMarker = marker;
  }

}

function createInfoWindow(marker, infoWindow) {

  if (infoWindow.marker !== marker) {

    infoWindow.marker = marker;
    infoWindow.setContent('<div>' + marker.info + '</div><div id="pano"></div>');
    infoWindow.open(map, marker);

    infoWindow.addListener('closeClick', function() {
      infoWindow.setMarker(null);
    });    

  }
}

var viewModel = {};

viewModel.query = ko.observable('');

viewModel.markers = ko.dependentObservable(function() {
  var self = this;
  var search = self.query().toLowerCase();

  return ko.utils.arrayFilter(locations, function(location) {
    if (location.title.toLowerCase().indexOf(search) >= 0) {

      if (location.googleMarker !== undefined) {
        location.googleMarker.setMap(map);
      }
      return location;

    } else {

      if (location.googleMarker !== undefined) {
        location.googleMarker.setMap(null);
      }

    }
  });

}, viewModel);

viewModel.clickLocation = function() {

  this.googleMarker.map.setCenter(this.googleMarker.position);
  this.googleMarker.map.setZoom(20);

  createInfoWindow(this.googleMarker, infoWind);
};

viewModel.resetMap = function() {  
  initMap();
};

ko.applyBindings(viewModel);
