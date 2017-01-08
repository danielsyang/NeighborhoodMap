(function(window, google) {
    var Mapster = (function() {
        function Mapster(element, options) {

            var outer = this;
            this.gMap = new google.maps.Map(element, options);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    outer.gMap.setCenter(pos);
                    outer.gMap.setZoom(15);
                    // console.log(outer.gMap);
                    // console.log(pos.lat);

                    // var initial_markers = new google.maps.Latlng(pos.lat, pos.lng);

                    var markes_request = {
                        location: outer.gMap.center,
                        radius: '500',
                        types: ['restaurant']
                    };

                    var service = new google.maps.places.PlacesService(outer.gMap);
                    service.nearbySearch(markes_request, function(results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            for (var i = 0; i < results.length; i++) {
                                var place = results[i];
                                // If the request succeeds, draw the place location on
                                // the map as a marker, and register an event to handle a
                                // click on the marker.
                                var marker = new google.maps.Marker({
                                    map: outer.gMap,
                                    position: place.geometry.location
                                });
                            }
                        }
                    });

                });
            }
        }

        Mapster.prototype = {};

        return Mapster;
    }());

    Mapster.create = function(element, options) {
        return new Mapster(element, options);
    };

    window.Mapster = Mapster;
}(window, google));
