(function(window, google, mapster){

  mapster.MAP_OPTIONS = {
    center: {
      lat: 37.8,
      lng: -122.4
    },
    zoom: 10,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  };



})(window, google, window.Mapster || (window.Mapster = {}));
