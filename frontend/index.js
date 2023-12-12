let map, infoWindow;
let clickLat, clickLng;
const elModal = document.querySelector(".modal");
const elTop3 = document.querySelector("#top3");
const elCharts = document.querySelector("#charts");
const elBtnCancel = document.querySelector(".btn-cancel");
const elBtnSubmit = document.querySelector(".btn-submit");
const elBtnSwitch = document.querySelector(".btn-switch");
const elIptTitle = document.querySelector(".ipt-title");
const elIptType = document.querySelector(".ipt-type");
const elIptDateTime = document.querySelector(".ipt-datetime");
let occurrenceId = "";
let modalAction = "";

initMap();

function toggleModal(mode) {
  modalAction = mode;
  elModal.style.display = (mode.length ? "flex" : "none");
  elBtnSubmit.textContent = (mode === "post" ? "Criar" : "Editar");
}

async function post_occurrence() {
  const datetimeValue = elIptDateTime.value + ":00Z";

  const occurrenceData = {
    title: elIptTitle.value,
    type: elIptType.value,
    date: datetimeValue,
    geographicLocation: {
      type: "Point",
      coordinates: [clickLng, clickLat],
    },
  };

  console.log(occurrenceData);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(occurrenceData),
    cache: "default",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/occurrences/save",
      options
    );
    if (response.ok) {
      console.log(response);
      Swal.fire({
        title: "Ocorrência cadastrada com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      await getAndShowOccurrences();
      toggleModal("");
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

async function delete_occurrence(id) {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "default",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/occurrences/${id}`,
      options
    );
    if (response.ok) {
      console.log(response);
      Swal.fire({
        title: "Ocorrência removida com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      await initMap();
      toggleModal("");
    } else {
      throw new Error("Não foi possível remover a ocorrência.");
    }
  } catch (err) {
    Swal.fire({
      title: "Erro!",
      text: "Ops! Ocorreu um erro ao tentar excluir a ocorrência. Tente novamente mais tarde.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error(err);
  }
}

async function update_occurrence() {
  const datetimeValue = elIptDateTime.value + ":00Z";

  const newOccurrenceData = {
    title: elIptTitle.value,
    type: elIptType.value,
    date: datetimeValue,
  };

  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOccurrenceData),
    cache: "default",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/occurrences/${occurrenceId}`,
      options
    );
    if (response.ok) {
      console.log(response);
      Swal.fire({
        title: "Ocorrência editada com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      await getAndShowOccurrences();
      toggleModal("");
    } else {
      throw new Error("Não foi possível editar a ocorrência.");
    }
  } catch (err) {
    Swal.fire({
      title: "Erro!",
      text: "Ops! Ocorreu um erro ao tentar editar a ocorrência. Tente novamente mais tarde.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error(err);
  }
}

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = await new Map(document.getElementById("map"), {
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
    toggleModal("post");
    clickLat = event.latLng.lat();
    clickLng = event.latLng.lng();
    resetFields();

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

  await getAndShowOccurrences();
}

async function getAndShowOccurrences() {
  const res = await fetch("http://localhost:3000/occurrences/findAll").then(
    (res) => res.json()
  );
  res.map((occurrence) => {
    addMarker(occurrence);
  });
}

async function addMarker(occurrence) {
  const { coordinates } = occurrence.geographicLocation;
  new google.maps.Marker({
    position: { lat: coordinates[1], lng: coordinates[0] },
    map,
    title: occurrence.title,
    animation: google.maps.Animation.DROP,
    icon: "./icons8-marcador-48.png",
  }).addListener("dblclick", () => {
    const date = new Date(occurrence.date);
    Swal.fire({
      html: `
        <h3>Título: ${occurrence.title}</h3>
        <h3>Tipo: ${occurrence.type}</h3>
        <h3>Data: ${(date.getUTCDate(-3) < 10 && "0") + date.getUTCDate(-3)}/${
        (date.getUTCMonth(-3) < 10 && "0") + date.getUTCMonth(-3) + 1
      }/${date.getUTCFullYear(-3)}</h3>
        <h3>Hora: ${(date.getUTCHours(-3) < 10 && "0") + date.getUTCHours(-3)}:${
        (date.getUTCMinutes(-3) < 10 && "0") + date.getUTCMinutes(-3)
      }</h3>
      `,
      showCancelButton: true,
      showDenyButton: true,
      cancelButtonText: "Fechar",
      confirmButtonText: "Editar",
      denyButtonText: "Excluir",
      cancelButtonColor: "#7f8c8d",
      denyButtonColor: "#e74c3c",
      confirmButtonCollor: "#2ecc71",
    }).then(async(result) => {
      if (result.isConfirmed) {
        toggleModal("edit");
        occurrenceId = occurrence._id;
        elIptDateTime.value = JSON.stringify(occurrence.date).substring(1, 20);
        elIptTitle.value = occurrence.title;
        elIptType.value = occurrence.type;
      } else if(result.isDenied) {
        // confirmando
        await Swal.fire({
          title: "Você tem certeza?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
          cancelButtonText: "Cancelar",
        }).then(async(result) => {
          if (result.isConfirmed) {
            await delete_occurrence(occurrence._id);

          }
        });
      }
    });
  });
}

async function switchTop3() {
  const top3 = await getTop3();
  top3.map((v, i) => {
    elTop3.innerHTML += `<div style="background: ${i == 0 ? "#cfa423" : i == 1 ? "#a2a2a2" : "#5b4012"}; color: ${i == 2 ? "#eee" : "#333"}">${i + 1} - ${v.type} | Qtd.: ${v.count}</div>`;
  });
  elCharts.style.display = "none";
  elTop3.style.display = "flex";
  elBtnSwitch.textContent = "Ver gráficos";

  async function getTop3() {
    const res = await fetch("http://localhost:3000/occurrences/findTop3").then(
      (res) => res.json()
    );
    return res;
  }
}

async function switchCharts() {
  elTop3.style.display = "none";
  elTop3.innerHTML = "";
  elCharts.style.display = "block";
  elBtnSwitch.textContent = "Ver top 3 tipos mais frequentes";
}

elBtnCancel.addEventListener("click", () => {
  toggleModal("");
});

elBtnSubmit.addEventListener("click", () => {
  if(modalAction === "edit") {
    update_occurrence();
  } else {
    post_occurrence();
  }
});

elBtnSwitch.addEventListener("click", () => {
  if(elTop3.style.display == "none") {
    switchTop3();
  } else {
    switchCharts();
  }
});
