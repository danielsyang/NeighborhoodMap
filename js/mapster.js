(function(window, google) {
  var Mapster = (function() {
    function Mapster(element, options){

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

          // var marker = new google.maps.Marker({
          //   position: pos,
          //   map: outer.gMap
          // });

        });
      }
    }

    Mapster.prototype = {
    };

    return Mapster;
  }());

  Mapster.create = function(element, options) {
    return new Mapster(element, options);
  };

  window.Mapster = Mapster;
}(window, google));
