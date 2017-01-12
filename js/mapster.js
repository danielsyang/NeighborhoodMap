(function(window, google) {

    var Mapster = (function() {

        var self = this;

        var Mapster = function(element, options) {
            this.gMap = new google.maps.Map(element, options);
        };

        var markers = [{
            title: "Museum of Art of São Paulo Assis Chateaubriand",
            lat: -23.561518,
            lng: -46.656009,
            streetAddress: "Av. Paulista, 1578, São Paulo",
            info: "The São Paulo Museum of Art (Portuguese: Museu de Arte de São Paulo, or MASP) " +
            "is an art museum located on Paulista Avenue in the city of São Paulo, Brazil. It is well known for its headquarters, "+
            "a 1968 concrete and glass structure designed by Lina Bo Bardi, whose main body is supported by two lateral beams over a "+
            "74 metres (243 ft) freestanding space, considered a landmark of the city and a main symbol of modern Brazilian architecture."
        }, {
            title: "Aquário de São Paulo",
            lat: -23.593378,
            lng: -46.613979,
            streetAddress: "R. Huet Bacelar, 407, São Paulo",
            info: "Considered a reference in the treatment and exhibition of animals, "+
            "São Paulo Aquarium is the largest aquarium in Latin America. It was opened in 2006, featuring 9 thousand m² and 2 million gallons of water." +
              "The only thematic aquarium in Brazil, this complex induces visitors to feel immersed in the environments,  " +
              "which have approximately 3000 specimens of 300 species of animals. Brazilian forests are portrayed in the first sector, " +
              " dedicated to fresh water, and which addresses issues such as pollution of rivers and endangered species."
        }, {
            title: "Paulista Museum",
            lat: -23.585578,
            lng: -46.609679,
            streetAddress: "Parque da Independência, São Paulo",
            info: ''
        }, {
            title: "Municipal Theatre of São Paulo",
            lat: -23.545235,
            lng: -46.638615,
            streetAddress: "Praça Ramos de Azevedo, São Paulo",
            info: ""
        }, {
            title: "Pinacoteca do Estado de São Paulo",
            lat: -23.534267,
            lng: -46.63395,
            streetAddress: "Praça da Luz, São Paulo",
            info: ""
        }, {
            title: "Parque Ibirapuera",
            lat: -23.584843,
            lng: -46.655913,
            streetAddress: "Parque Ibirapuera, São Paulo",
            info: ""
        }];

        var listObjMarkers = new Map();

        Mapster.prototype = {
            createMarker: function() {
              for (var i = 0; i < markers.length; i++) {
                  var marker = new google.maps.Marker({
                      position: {
                          lat: markers[i].lat,
                          lng: markers[i].lng
                      },
                      map: this.gMap,
                      title: markers[i].title
                  });
                  var _self = this;
                  marker.setMap(this.gMap);
                  // console.log(marker.getPosition().lng());
                  marker.addListener('click', function() {
                    _self.gMap.setZoom(17);
                    _self.gMap.setCenter({lat: marker.getPosition().lat(), lng:marker.getPosition().lng()});
                  });
                  console.log(marker);
                  listObjMarkers.set(marker.title, marker);
                  //criar infowindow

              }
            },
            deleteMarkers: function() {
              for (var val of listObjMarkers.values()){
                val.setMap(null);
              }
            },
            createMarkerList: function(lMarkers) {
                for (var i = 0; i < lMarkers.length; i++) {
                  var m = listObjMarkers.get(lMarkers[i].title);
                  m.setMap(this.gMap);
                }
            },
            listMarkers: function() {
                return markers
            }
        };

        return Mapster;
    }());

    Mapster.create = function(element, options) {
        return new Mapster(element, options);
    };

    Mapster.MAP_OPTIONS = {
        center: {
            lat: -23.564005,
            lng: -46.627078
        },
        zoom: 13,
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

    window.Mapster = Mapster;
}(window, google));
