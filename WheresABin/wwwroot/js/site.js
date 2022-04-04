
var map;
var markers = [];

function initMap() {

    const locationButton = document.createElement("button");
    var inputOrigin = document.getElementById("origin");
  //  var inputDestination = document.getElementById("destination");
    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
    };
    const autocomplete = new google.maps.places.Autocomplete(inputOrigin, options);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    //Create map start location
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.376289, lng: -4.143841 },
        zoom: 10,
    });

    infoWindow = new google.maps.InfoWindow();
    //Pan to current location button set on google maps 
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        zoom: 450
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    marker_clicked = function () {
        infoWindow.close();
        //What is shown in the info window
        infoWindow.setContent(this.NAME + "</br></br>" + this.CATEGORY + "</br></br>" +
            this.ADDRESS + "</br></br>" + this.COMMENTS + "</br></br>");
        infoWindow.open(map, this);
    }

    //set markers from bin.js
    for (i = 0; i < bin.length; i++) {
        //set the icon based on the category
        if (bin[i].CATEGORY == "Green Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
        //   new_icon = iconBase + 'beachflag.png';
        else if (bin[i].CATEGORY == "Dog Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";
        else if (bin[i].CATEGORY == "Black Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";


        // Create a marker based on the array in bin.js
        new_marker = new google.maps.Marker({
            position: {
                lat: bin[i].LATITUDE,
                lng: bin[i].LONGITUDE
            },
            title: bin[i].NAME,
            icon: new_icon
        });

        //put markers onto the map
        new_marker.setMap(map);

        //store the name of the bin as a property of the marker object
        new_marker.NAME = bin[i].NAME;
        new_marker.CATEGORY = bin[i].CATEGORY;
        new_marker.ADDRESS = bin[i].ADDRESS;
        new_marker.COMMENTS = bin[i].COMMENTS;

        //info window open when marker is clicked
        new_marker.addListener('click', marker_clicked);

        markers.push(new_marker);
    }

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(450);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
    place.formatted_address;
    infowindow.open(map, marker);

};

$(document).ready(function () {

    $("#submitBinFilterBtn").click(function (event) {
        event.preventDefault();
        var checkedBoxes = $("input:checkbox[name=bins]:checked").map(function () {
            return $(this).val();
        }).get();
        filterBins(checkedBoxes)
    });

    function filterBins(checkedBoxes) {
        //loop through the elements of the marker array and only show selected category
        for (i = 0; i < markers.length; i++) {
            if (checkedBoxes.includes(markers[i].CATEGORY))
                markers[i].setMap(map);
            else
                //hide other markers
                markers[i].setMap(null);
        }
    }

    //Reset filter button, shows all bin types 
    document.getElementById('showAllBinFilterBtn').onclick = showAllMarkers;

});

//Reset the marker filter selection 
function showAllMarkers() {
    for (i = 0; i < markers.length; i++) markers[i].setMap(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}