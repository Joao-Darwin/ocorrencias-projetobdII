let map, infoWindow;

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -6.889844787676005, lng: -38.55889240586281 },
        zoom: 14
    });

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
    });

    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
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
    }
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

async function addMarker(location, map) {
    marker = new google.maps.Marker({
        position: { lat: location.lat(), lng: location.lng() },
        map: map,
        title: "Novo marcador",
        animation: google.maps.Animation.DROP,
        icon: "https://img.icons8.com/color/32/chess-com.png"
    }).addListener('dblclick', () => {
        alert(`Lat: ${location.lat()} \nLng: ${location.lng()}`)
    });
}


initMap();