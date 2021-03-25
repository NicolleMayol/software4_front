let lat = 0
let long = 0
let idLugar = localStorage.getItem('idLugar')
let token = localStorage.getItem('info')
let map;

let guardarCoordenadas = () => {
  axios.get(`http://localhost:3000/api/v1/coordenadas/${idLugar}`,{headers:{"token":token}}).then(respuesta => {
      lat = respuesta.data[0].lat
      long = respuesta.data[0].long
      console.log(respuesta.data)
  }).catch(error => {
      console.log(error)
  })
}

function initMap() {
  const myLatLng = { lat: lat, lng: long },
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 20,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
  });

}

guardarCoordenadas();

