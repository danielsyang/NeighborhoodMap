(function(window, mapster) {
    var options = mapster.MAP_OPTIONS;
    element = document.getElementById('map-canvas');

    map = mapster.create(element, options);

    var input = document.getElementById('search_box');
    var searchBox = new google.maps.places.SearchBox(input);
    var actual_map = map.gMap;
    var marker = [];

    actual_map.addListener('bounds_changed', function() {
        searchBox.setBounds(actual_map.getBounds());
    });

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }

        // if (actual_map)

        // Clear out the old markers.
        marker.forEach(function(mk) {
            mk.setMap(null);
        });
        marker = [];

        var bounds = new google.maps.LatLngBounds();

        places.forEach(function(place) {
            console.log(place);
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            marker.push(new google.maps.Marker({
                map: actual_map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

        });
        actual_map.fitBounds(bounds);
    });
}(window, window.Mapster));
