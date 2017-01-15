(function(window) {

    var google_markers = window.map.listMarkers();

    var ViewModel = function() {
        var self = this;

        resetMap = function() {
            window.map.reset();
        };

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
            if (renderMarkers.length !== google_markers.length) {
                window.map.deleteMarkers();
            }
            window.map.createMarkerList(renderMarkers);
            return renderMarkers;
        }, viewModel);
    };

    var viewModel = new ViewModel();

    ko.applyBindings(viewModel);


})(window);
