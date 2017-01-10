(function(window, google) {

    var Mapster = (function() {

        var Mapster = function(element, options) {
            this.gMap = new google.maps.Map(element, options);
        }

        var markers = [{
            title: "Museum of Art of São Paulo Assis Chateaubriand",
            lat: -23.561518,
            lng: -46.656009,
            streetAddress: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200, Brazil"
        }, {
            title: "Aquário de São Paulo",
            lat: -23.593378,
            lng: -46.613979,
            streetAddress: "R. Huet Bacelar, 407 - Vila Dom Pedro I, São Paulo - SP, 04275-000, Brazil"
        }, {
            title: "Paulista Museum",
            lat: -23.585578,
            lng: -46.609679,
            streetAddress: "Parque da Independência, Ipiranga - Ipiranga, São Paulo - SP, 04263-000, Brazil"
        }, {
            title: "Municipal Theatre of São Paulo",
            lat: -23.545235,
            lng: -46.638615,
            streetAddress: "Praça Ramos de Azevedo, s/n - República, São Paulo - SP, 01037-010, Brazil"
        }, {
            title: "Pinacoteca do Estado de São Paulo",
            lat: -23.534267,
            lng: -46.63395,
            streetAddress: "Praça da Luz, 2 - Luz, São Paulo - SP, 01120-010, Brazil"
        }, {
            title: "Parque Ibirapuera",
            lat: -23.584843,
            lng: -46.655913,
            streetAddress: "Parque Ibirapuera, São Paulo - State of São Paulo, Brazil"
        }];

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
                marker.setMap(this.gMap);
            }
          }
        };

        return Mapster;
    }());

    Mapster.markers = [{
        title: "Museum of Art of São Paulo Assis Chateaubriand",
        lat: -23.561518,
        lng: -46.656009,
        streetAddress: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200, Brazil"
    }, {
        title: "Aquário de São Paulo",
        lat: -23.593378,
        lng: -46.613979,
        streetAddress: "R. Huet Bacelar, 407 - Vila Dom Pedro I, São Paulo - SP, 04275-000, Brazil"
    }, {
        title: "Paulista Museum",
        lat: -23.585578,
        lng: -46.609679,
        streetAddress: "Parque da Independência, Ipiranga - Ipiranga, São Paulo - SP, 04263-000, Brazil"
    }, {
        title: "Municipal Theatre of São Paulo",
        lat: -23.545235,
        lng: -46.638615,
        streetAddress: "Praça Ramos de Azevedo, s/n - República, São Paulo - SP, 01037-010, Brazil"
    }, {
        title: "Pinacoteca do Estado de São Paulo",
        lat: -23.534267,
        lng: -46.63395,
        streetAddress: "Praça da Luz, 2 - Luz, São Paulo - SP, 01120-010, Brazil"
    }, {
        title: "Parque Ibirapuera",
        lat: -23.584843,
        lng: -46.655913,
        streetAddress: "Parque Ibirapuera, São Paulo - State of São Paulo, Brazil"
    }];

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
