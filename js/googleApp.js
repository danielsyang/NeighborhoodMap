(function(window, mapster, google) {
    var options = mapster.MAP_OPTIONS;
    element = document.getElementById('map-canvas');

    map = mapster.create(element, options);
    map.createMarker();

}(window, window.Mapster, google));
