
$(document).ready(function () {

})

function initMap() {

    const iconBase =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    var icons = {
        dog: {
            icon: iconBase + 'beachflag.png'
        },
        refuse: {
            icon: iconBase + 'library_maps.png'
        },
        recycle: {
            icon: iconBase + 'info-i_maps.png'
        }
    };

    //Map options
    var options = {
        zoom: 8,
        center: { lat: 50.2195, lng: -4.8910 }
    }
    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    //Listen for click on the map 
    google.maps.event.addListener(map, 'click', function (event) {
        //Add marker
        addMarker({ coords: event.latLng });
    });

    //Array of markers
    var markers = [
        {
            coords: { lat: 50.2632, lng: -5.0510 },
            iconImage: icons.dog.icon,
            content: '<div id="content">' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
                '<div id="bodyContent">' +
                "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
                "sandstone rock formation in the southern part of the " +
                "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
                "south west of the nearest large town, Alice Springs; 450&#160;km " +
                "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
                "features of the Uluru - Kata Tjuta National Park. Uluru is " +
                "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
                "Aboriginal people of the area. It has many springs, waterholes, " +
                "rock caves and ancient paintings. Uluru is listed as a World " +
                "Heritage Site.</p>" +
                '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
                "(last visited June 22, 2009).</p>" +
                "</div>" +
                "</div>"
        },
        {
            coords: { lat: 50.2195, lng: -4.8910 },
            iconImage: icons.refuse.icon,
            content: '<h1>Portloe</h1>'
        },
        {
            coords: { lat: 50.2330, lng: -5.2267 },
            iconImage: icons.recycle.icon
        }
    ];

    //Loop through markers
    for (var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    //Add marker function 
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon: props.iconImage
        });
        //Check for custom icon
        if (props.iconImage) {
            //Set icon image
            marker.setIcon(props.iconImage);
        }

        //Check if there is content set, if so show info window
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false
                });
            })
        }
    }

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });


    ////Add marker
    //var marker = new google.maps.Marker({
    //    position: { lat: 50.2632, lng: -5.0510 },
    //    map: map,
    //    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    //});

    //var infoWindow = new google.maps.InfoWindow({
    //    content:'<h1>Truro</h1>'
    //});

    //marker.addListener('click', function () {
    //    infoWindow.open(map, marker);
    //})

}