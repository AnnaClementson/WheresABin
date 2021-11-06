


function initMap() {
    //Map options
    var options = {
        zoom: 8,
        center: {lat:50.2195,lng:-4.8910}
    }
    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);
    //Add marker
    var marker = new google.maps.Marker({
        position: { lat: 50.2632, lng: -5.0510 },
        map: map
    });
}

