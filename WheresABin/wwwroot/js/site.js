

var map;
var markers = [];

function initMap() {

   // const locationButton = document.createElement("button");
    const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

    //Create map start location
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.376289, lng: -4.143841},
        zoom: 10,
    });

    infowindow = new google.maps.InfoWindow();

    marker_clicked = function () {
        infowindow.close();
        infowindow.setContent(this.NAME);
        infowindow.open(map, this);
    }

    //set markers from bin.js
    for (i = 0; i < bin.length; i++)
    {
        //set the icon based on the category
        if (bin[i].CATEGORY == "Green Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
         //   new_icon = iconBase + 'beachflag.png';
        else if (bin[i].CATEGORY == "Dog Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
        else if (bin[i].CATEGORY == "Waste Bin")
            new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";

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

        //info window open when marker is clicked
        new_marker.addListener('click', marker_clicked);

        markers.push(new_marker);
    }
}
