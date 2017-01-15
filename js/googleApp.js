(function(window, mapster, google) {
    var options = mapster.MAP_OPTIONS;    
    element = $('#map-canvas');

    map = mapster.create(element[0], options);
    map.createMarker();

}(window, window.Mapster, google));
