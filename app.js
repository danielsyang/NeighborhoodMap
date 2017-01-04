(function() {
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

    var ViewModel = function() {
        this.currentLocation = ko.observable();

        this.searchLocation = function() {
            var location = this.currentLocation().trim();
            console.log(location);
        }.bind(this);
    };

    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);


})();
