'use strict';

var map;
var markers = [];
var infoWind;
var bounds;
var streetViewService;
var radius = 50;

var imageApi = "https://maps.googleapis.com/maps/api/streetview?size=300x150&location=";
var weatherUrl = "https://api.apixu.com/v1/current.json?key=7cf63c0a2b0e487f838164529171501&q=Sao%20Paulo";

var foursquare = "https://api.foursquare.com/v2/venues/search?ll=";
var foursquareSecret = "&client_id=N3VSCVOHUML4HPM3GH5NIHECFJ04NUS2I1D1VKH5TLONLLFE&client_secret=0OF5H4Z4M4IBWB0WSLBZ3AVFHKR3ILE3BX13WN2Y2E0CI3ZS&v=20170101";

var foursquareImg = "https://api.foursquare.com/v2/venues/";
var foursquareImgSecret = "/photos?client_id=N3VSCVOHUML4HPM3GH5NIHECFJ04NUS2I1D1VKH5TLONLLFE&client_secret=0OF5H4Z4M4IBWB0WSLBZ3AVFHKR3ILE3BX13WN2Y2E0CI3ZS&v=20170101";

var w = false;

var defaultIcon;
var highlightedIcon;

var viewModel = {};

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
    zoom: 14
  };
  var element = $('#map-canvas');

  infoWind = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
  streetViewService = new google.maps.StreetViewService();

  map = new google.maps.Map(element[0], options);
  defaultIcon = makeMarkerIcon('0091ff');
  highlightedIcon = makeMarkerIcon('FFFF24');
  initMarker(locations);

  if (w === false) {
    loadWeather();
    w = true;
  }

}

function myerrorhandler() {
  console.log('hahaha');
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
      id: i,
      icon: defaultIcon,
      img_info: locations[i].img_info
    });

    marker.addListener('click', function () {
      createInfoWindow(this, infoWind);
    });

    marker.addListener('mouseover', function () {
      this.setIcon(highlightedIcon);
    });

    marker.addListener('mouseout', function () {
      if (infoWind.map === undefined) {
        this.setIcon(defaultIcon);
      }
    });

    markers.push(marker);
    bounds.extend(marker.position);

    locations[i].googleMarker = marker;

    loadFoursquare(coordinates, marker);
  }

}

function makeMarkerIcon(color) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=0.50|0|' + color +
    '|15|_|%E2%80%A2');

  return markerImage;
}

function loadFoursquare(coordinates, marker) {

  var totalFoursquare = foursquare + coordinates.lat +
    ',' + coordinates.lng + foursquareSecret;

  $.getJSON(totalFoursquare, function (data) {
    var f_id = data.response.venues[0].id;
    var totalFoursquareImg = foursquareImg + f_id + foursquareImgSecret;
    var i = 0;
    var full = false;

    while (i < data.response.venues.length && full === false) {
      if (data.response.venues[i].url !== undefined && marker.url === undefined) {
        marker.url = data.response.venues[i].url;
      }

      if (data.response.venues[i].contact.facebook !== undefined && marker.facebook === undefined) {
        marker.facebook = data.response.venues[i].contact.facebook;
      }

      if (data.response.venues[i].contact.twitter !== undefined && marker.twitter === undefined) {
        marker.twitter = data.response.venues[i].contact.twitter;
      }

      if (marker.url !== undefined && marker.facebook !== undefined && marker.twitter !== undefined) {
        full = true;
      }

      i++;
    }

    $.getJSON(totalFoursquareImg, function (dataimg) {
      var u = dataimg.response.photos.items[0].prefix +
        '300x150' +
        dataimg.response.photos.items[0].suffix;

      marker.img = u;
    }).fail(function (error) {
      alert('FourSquare images failed to load! Error: ' + error);
    });
  }).fail(function (error) {
    alert('FourSquare failed to load! Error: ' + error);
  });
}

function createInfoWindow(marker, infoWindow) {

  console.log(marker);

  if (infoWindow.marker !== marker) {

    infoWindow.marker = marker;
    infoWindow.setContent('<img class="img_desc" src="' + marker.img + '">'
      + '<hr>'
      + '<strong><p class="center">' + marker.title + '</p></strong>'
      + '<p class="center-small">' + marker.streetAddress + '</p>'
      + '<p class="center-small">'
      + '<a href="' + marker.url + '">Website</a> | '
      + '<a href="http://www.facebook.com/' + marker.facebook + '">Facebook</a> | '
      + '<a href="http://www.twitter.com/' + marker.twitter + '">Twitter</a>'
      + '</p>'
      + '<p class="just">' + marker.info + '</p>');
    infoWindow.open(map, marker);
    marker.setIcon(highlightedIcon);

    infoWindow.addListener('closeclick', function () {
      marker.setIcon(defaultIcon);
    });

  } else {
    infoWindow.open(map, marker);
  }
}

function loadWeather() {

  $.getJSON(weatherUrl, function (data) {
    var title = '<h4 class="weatherTitle">' + data.location.name + ' Weather Forecast</h4>';
    var body = '<div class="weatherBody_text"><p>Temp: ' + data.current.feelslike_c + '°C</p>' +
      '<p>Humidity: ' + data.current.humidity + ' %</p></div>';

    var body_img = '<div class="weatherBody_img"><p> Condition: <img src="https:' + data.current.condition.icon + '" class="weather_img"/></p></div>';
    var full = title + body + body_img;
    viewModel.weather(full);
  }).fail(function (error) {
    alert('APIXU Weather failed to load! Error: ' + error);
  });

}

viewModel.query = ko.observable('');
viewModel.weather = ko.observable();
viewModel.weatherText = ko.observable('<<');

viewModel.markers = ko.dependentObservable(function () {
  var self = this;
  var search = self.query().toLowerCase();

  return ko.utils.arrayFilter(locations, function (location) {
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

viewModel.clickLocation = function () {
  this.googleMarker.map.setCenter(this.googleMarker.position);
  this.googleMarker.map.setZoom(20);

  createInfoWindow(this.googleMarker, infoWind);
};

viewModel.resetMap = function () {
  initMap();
};
viewModel.showWeatherBlock = ko.observable(false);
viewModel.showWeather = function () {

  if (viewModel.weatherText() === '<<') {
    viewModel.weatherText('>>');
    viewModel.showWeatherBlock(true);
  } else {
    viewModel.weatherText('<<');
    viewModel.showWeatherBlock(false)
  }

};

ko.applyBindings(viewModel);
