let lat = 0
let long = 0
let idLugar = localStorage.getItem('idLugar')
let token = localStorage.getItem('info')
let map;


let etiquetaNombre = () => {
  axios.get(`http://localhost:3000/api/v1/lugares/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    let nombre = document.getElementById('nombreRecorrido')
    nombre.innerHTML = respuesta.data[0].nombre
  }).catch(error => {
    console.log(error)
  })
}

let asignarDescripcion = () => {
  axios.get(`http://localhost:3000/api/v1/descripcion/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    let descripcion = document.getElementById('txtDescripcion')
    descripcion.innerHTML = respuesta.data[0].descripcion
  }).catch(error => {
    console.log(error)
  })
}

let asignarVideo = () => {
  axios.get(`http://localhost:3000/api/v1/videos/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    let data = `<iframe width="560" height="315" src="${respuesta.data[0].url}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`
    let descripcion = document.getElementById('idVideo')
    descripcion.innerHTML = data
  }).catch(error => {
    console.log(error)
  })
}

let asignarFotos = () => {
  let data = ""
  axios.get(`http://localhost:3000/api/v1/fotos/${idLugar}`, { headers: { "token": token } }).then(respuesta => {
    let listaFotos = document.getElementById("idFotos")
    for (let i = 0; i < respuesta.data.length; i++) {
      let foto = respuesta.data[i]
      data +=
        `<div class="col-md-4 col-sm-4">
            <div class="item">
                <div class="courses-thumb">
                    <div class="courses-top">
                        <div class="courses-image">
                            <img src="${foto.url}" class="img-responsive col-xs-12" style="width: 100%;" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    listaFotos.innerHTML = data;
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

    etiquetaNombre();
    asignarDescripcion();
    asignarVideo();
    asignarFotos();

    const myLatLng = { lat: lat, lng: long },
      map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 20,
        mapId: "6cd337914d17672b"
      });

    addMarker(myLatLng, map, "Udem");
    console.log(myLatLng)

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

