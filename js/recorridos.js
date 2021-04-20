

let lat = 0
let long = 0
let idLugar = localStorage.getItem('idLugar')
let token = localStorage.getItem('info')
let map;


let etiquetaNombre = () => {
  axios.get(`http://localhost:3000/api/v1/lugares/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    let nombre = document.getElementById('nonbreRecorrido')
    nombre.innerHTML = respuesta.data[0].nombre
  }).catch(error => {
    console.log(error)
  })
}

function initMap() {
  axios.get(`http://localhost:3000/api/v1/coordenadas/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    lat = respuesta.data[0].lat
    long = respuesta.data[0].long
    console.log(lat)
    console.log(long)

    const myLatLng = { lat: lat, lng: long },
      map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 20,
        mapId: "6cd337914d17672b"
      });

      addMarker(myLatLng, map, "Udem");
    console.log(myLatLng)

    etiquetaNombre();

  }).catch(error => {
    console.log(error)
  })

}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: label,
    map: map,
  });
}

google.maps.event.addDomListener(window, 'resize', initialize);
google.maps.event.addDomListener(window, 'load', initialize)

