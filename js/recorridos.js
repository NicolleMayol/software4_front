let lat = parseFloat(localStorage.getItem('lat'))
let long = parseFloat(localStorage.getItem('long'))

let map;

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

