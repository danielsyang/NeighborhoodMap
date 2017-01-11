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
    var google_markers = window.map.listMarkers();

    var ViewModel = function() {
        var self = this;
        this.location = ko.observable('');

        this.markers = ko.dependentObservable(function() {
            var renderMarkers = [];
            var input_result = self.location().toLowerCase();

            if (input_result !== '') {
                for (var i = 0; i < google_markers.length; i++) {
                    if (google_markers[i].title.toLowerCase().indexOf(input_result) >= 0) {
                        renderMarkers.push(google_markers[i]);
                    }
                }
            } else {
                renderMarkers = google_markers;
            }
            return renderMarkers;
        }, viewModel);
    };

    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);


})(window);
