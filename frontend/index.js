let map, infoWindow;
let clickLat, clickLng;
const elModal = document.querySelector(".modal");
const elBtnCancel = document.querySelector(".btn-cancel");
const elBtnSubmit = document.querySelector(".btn-submit");
const elIptTitle = document.querySelector(".ipt-title");
const elIptType = document.querySelector(".ipt-type");
const elIptDateTime = document.querySelector(".ipt-datetime");

initMap();

async function postOcurrence() {
  const datetimeValue = elIptDateTime.value + ":00Z";

  const ocurrenceData = {
    titulo: elIptTitle.value,
    tipo: elIptType.value,
    data: datetimeValue,
    localizacaoGeografica: {
      type: "Point",
      coordinates: [clickLat, clickLng]
    },
  };

  console.log(ocurrenceData);

  const options = {
    method: "POST",
    headers: { // Deve ser "headers", não "Headers"
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ocurrenceData),
    cache: "default", // Deve ser "cache", não "Cache"
  };
  
  try {
    const response = await fetch("http://localhost:3000/ocorrencias/save", options);
    if (response.ok) {
      console.log(response);
      Swal.fire({
        title: "Ocorrência cadastrada com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      await getAndShowOcurrences();
    } else {
      throw new Error("Não foi possível salvar a ocorrência.");
    }
  } catch (err) {
    Swal.fire({
      title: "Erro!",
      text: "Ops! Ocorreu um erro ao tentar cadastrar a ocorrência. Tente novamente mais tarde.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error(err);
  }
  
}

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -6.889844787676005, lng: -38.55889240586281 },
    zoom: 14,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });

  google.maps.event.addListener(map, "click", (event) => {
    elModal.style.display = "flex";
    (clickLat = event.latLng.lat()), (clickLng = event.latLng.lng());
    resetFields();
    // addMarker(event.latLng.lat(), event.latLng.lng());

    function resetFields() {
      elIptTitle.value = "";
      elIptType.value = "";
      elIptDateTime.value = "";
    }
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

  await getAndShowOcurrences();
}

async function getAndShowOcurrences() {
  const res = await fetch("http://localhost:3000/ocorrencias").then((res) =>
    res.json()
  );
  res.map((ocurrence) => {
    addMarker(ocurrence);
  });
}

async function addMarker(ocurrence) {
  const { coordinates } = ocurrence.localizacaoGeografica;
  new google.maps.Marker({
    position: { lat: coordinates[0], lng: coordinates[1] },
    map,
    title: ocurrence.titulo,
    animation: google.maps.Animation.DROP,
    icon: "./icons8-marcador-48.png",
  }).addListener("dblclick", () => {
    const data = new Date(ocurrence.data);
    Swal.fire({
      html: `
        <h3>Título: ${ocurrence.titulo}</h3>
        <h3>Tipo: ${ocurrence.tipo}</h3>
        <h3>Data: ${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</h3>
        <h3>Hora: ${data.getHours()}:${data.getMinutes()}</h3>
      `,
      confirmButtonText: "Fechar",
    });
  });
}

elBtnCancel.addEventListener("click", () => {
  elModal.style.display = "none";
});

elBtnSubmit.addEventListener("click", () => {
  postOcurrence();
});
