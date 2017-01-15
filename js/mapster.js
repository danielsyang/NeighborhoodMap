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
                "is an art museum located on Paulista Avenue in the city of São Paulo, Brazil. It is well known for its headquarters, " +
                "a 1968 concrete and glass structure designed by Lina Bo Bardi, whose main body is supported by two lateral beams over a " +
                "74 metres (243 ft) freestanding space, considered a landmark of the city and a main symbol of modern Brazilian architecture."
        }, {
            title: "Aquário de São Paulo",
            lat: -23.593378,
            lng: -46.613979,
            streetAddress: "R. Huet Bacelar, 407, São Paulo",
            info: "Considered a reference in the treatment and exhibition of animals, " +
                "São Paulo Aquarium is the largest aquarium in Latin America. It was opened in 2006, featuring 9 thousand m² and 2 million gallons of water." +
                "The only thematic aquarium in Brazil, this complex induces visitors to feel immersed in the environments,  " +
                "which have approximately 3000 specimens of 300 species of animals. Brazilian forests are portrayed in the first sector, " +
                " dedicated to fresh water, and which addresses issues such as pollution of rivers and endangered species."
        }, {
            title: "Paulista Museum",
            lat: -23.585578,
            lng: -46.609679,
            streetAddress: "Parque da Independência, São Paulo",
            info: "The Museu Paulista of the University of São Paulo (commonly known in São Paulo and all Brazil as Museu do Ipiranga) " +
                "is a Brazilian history museum located near where Emperor Pedro I proclaimed the Brazilian independence on the banks of Ipiranga " +
                "brook in the Southeast region of the city of São Paulo, then the 'Caminho do Mar,' or road to the seashore. " +
                "It contains a huge collection of furniture, documents and historically relevant artwork, especially relating to the Brazilian Empire era."
        }, {
            title: "Municipal Theatre of São Paulo",
            lat: -23.545235,
            lng: -46.638615,
            streetAddress: "Praça Ramos de Azevedo, São Paulo",
            info: "Municipal Theatre of São Paulo is a theatre in São Paulo, Brazil. It is regarded as one of the landmarks of the city, " +
                "significant both for its architectural value as well as for its historical importance, having been the venue for the " +
                "Week of Modern Art in 1922, which revolutionised the arts in Brazil. The building now houses the São Paulo Municipal Symphonic Orchestra, " +
                "the Coral Lírico (Lyric Choir) and the City Ballet of São Paulo."
        }, {
            title: "Pinacoteca do Estado de São Paulo",
            lat: -23.534267,
            lng: -46.63395,
            streetAddress: "Praça da Luz, São Paulo",
            info: "The Pinacoteca do Estado de São Paulo is one of the most important art museums in Brazil. It is housed in a 1900 building in " +
                "Jardim da Luz, Downtown São Paulo, designed by Ramos de Azevedo and Domiziano Rossi to be the headquarters of the Lyceum of Arts and Crafts. " +
                "It is the oldest art museum in São Paulo, founded on December 24, 1905, and established as a state museum since 1911."
        }, {
            title: "Ibirapuera Park",
            lat: -23.584843,
            lng: -46.655913,
            streetAddress: "Parque Ibirapuera, São Paulo",
            info: "Ibirapuera Park is a major urban park in São Paulo, Brazil. It has a large area for leisure, jogging and walking, " +
                "as well a vivid cultural scene with museums and a music hall. Its importance to São Paulo is often comparable to that of " +
                "Central Park to New York City, Golden Gate Park to San Francisco, or Ueno Park to Tokyo. Ibirapuera is one of Latin America's " +
                "largest city parks, together with Chapultepec Park in Mexico City and Simón Bolívar Park in Bogota."
        }];

        var listObjMarkers = new Map();

        Mapster.prototype = {
            createMarker: function() {
                this.gMap.infoWindow = new google.maps.InfoWindow();
                for (var i = 0; i < markers.length; i++) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: markers[i].lat,
                            lng: markers[i].lng
                        },
                        map: this.gMap,
                        title: markers[i].title,
                        info: markers[i].info
                    });
                    var _self = this;
                    marker.setMap(this.gMap);

                    marker.addListener('click', function(center) {

                        if (_self.gMap.infoWindow.content !== undefined) {
                            _self.gMap.infoWindow.close();
                        }
                        _self.gMap.infoWindow = new google.maps.InfoWindow({
                            content: "<div class='infoView' id='inf'><strong class='infoTitle'>" + this.title +
                                "</strong><hr><p class='infoInfo'>" + this.info + "</p></div>"
                        });

                        _self.gMap.setZoom(17);
                        _self.gMap.setCenter(center.latLng);
                        _self.gMap.infoWindow.open(_self.gMap, this);

                    });

                    listObjMarkers.set(marker.title, marker);

                }
            },
            deleteMarkers: function() {
                for (var val of listObjMarkers.values()) {
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
            },
            reset: function() {
                var center = {
                    lat: -23.564005,
                    lng: -46.627078
                };
                this.gMap.setZoom(13);
                this.gMap.setCenter(center);                
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
