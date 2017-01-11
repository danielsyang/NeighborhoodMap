(function(window) {

    'use strict';
    var ENTER_KEY = 13;

    function keyhandlerBindingFactory(keyCode) {
        return {
            init: function(element, valueAccessor, allBindingsAccessor, data, bindingContext) {
                var wrappedHandler, newValueAccessor;

                // wrap the handler with a check for the enter key
                wrappedHandler = function(data, event) {
                    if (event.keyCode === keyCode) {
                        valueAccessor().call(this, data, event);
                    }
                };

                // create a valueAccessor with the options that we would want to pass to the event binding
                newValueAccessor = function() {
                    return {
                        keyup: wrappedHandler
                    };
                };

                // call the real event binding's init function
                ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
            }
        };
    };

    // a custom binding to handle the enter key
    ko.bindingHandlers.enterKey = keyhandlerBindingFactory(ENTER_KEY);

    var google_markers = window.Mapster.markers;

    var ViewModel = function() {
        var self = this;
        this.location = ko.observable();

        this.markers = ko.computed(function() {
          var input_result = self.location().trim();
          console.log(input_result);
          return ko.utils.arrayFilter(google_markers, function(mark) {
            if (mark.title.toLowerCase().indexOf()) {

            }
          });
        });

        this.searchLocation = function() {
            var location = self.location().trim();
            console.log(location);
            return ko.utils.arrayFilter(google_markers, function(marker) {
              console.log(location);

              if (marker.title.search(location)) {
                console.log(marker);
              }
                // console.log(marker.title.toLowerCase());
            })
        }.bind(this);
    };

    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);


})(window);
