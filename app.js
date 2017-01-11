(function(window) {
    // a custom binding to handle the enter key
    var google_markers = window.map.listMarkers();

    var ViewModel = function() {
        var self = this;
        this.location = ko.observable('');

        this.markers = ko.dependentObservable(function() {
            var renderMarkers = [];
            var input_result = self.location().toLowerCase();

            console.log('quantas vezes?');

            if (input_result !== '') {
                for (var i = 0; i < google_markers.length; i++) {
                    if (google_markers[i].title.toLowerCase().indexOf(input_result) >= 0) {
                        renderMarkers.push(google_markers[i]);
                    }
                }
            } else {
                renderMarkers = google_markers;
            }
            if (renderMarkers.length !== google_markers.length) {
                window.map.createMarkerList(renderMarkers);
            }
            // } else {
            //     console.log('yeueu');
            //     window.map.createMarkerList(renderMarkers);
            // }
            return renderMarkers;
        }, viewModel);
    };

    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);


})(window);
