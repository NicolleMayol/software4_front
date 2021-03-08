let documento = parseInt(localStorage.getItem('documento'))
let nombreLogin = localStorage.getItem('nombreLogin')
let apellidoLogin = localStorage.getItem('apellidoLogin')

let cargarDatosLogin = () => {
    let nombre = document.getElementById("nombreUsuarioLogin")
    let data = `<li><i class="fa fa-user"></i>${nombreLogin} ${apellidoLogin}</li>`
    nombre.innerHTML = data
}

let listarExcursionesLogin = () => {
    let lista = document.getElementById("listaExcursionesLogin")
    let data = ""
    axios.get("http://localhost:3000/api/v1/excursiones").then(respuesta => {
        for (let i = 0; i < respuesta.data.length; i++) {
            let excursion = respuesta.data[i]
            data += `
        <div class="col-md-4 col-sm-4">
            <div class="item">
                 <div class="courses-thumb">
                      <div class="courses-top">
                           <div class="courses-image">
                                <div class="video-responsive">
                                     <iframe src="${excursion.url}" frameborder="0" allowfullscreen></iframe>
                                     </div>
                           </div>
                           <div class="courses-date">
                                <span><i class="fa fa-calendar"></i> ${excursion.fecha}</span>
                                <span><i class="fa fa-map"></i> ${excursion.nombre}</span>
                           </div>
                      </div>

                      <div class="courses-detail">
                           <p>${excursion.descripcion}</p>
                      </div>

                      <div class="courses-info">
                           <div class="courses-author">
                                <i class="fa fa-users" alt="" style="padding:1em"></i>
                                <span>${excursion.nombres} ${excursion.apellidos}</span>
                           </div>
                      </div>
                 </div>
            </div>
       </div>
`

        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let listarLugaresLogin = () => {
    let data = ""
    axios.get("http://localhost:3000/api/v1/lugares").then(respuesta => {
        let lista = document.getElementById("listaLugaresLogin")
        for (let i = 0; i < respuesta.data.length; i++) {
            let lugar = respuesta.data[i]
            data += `<div class="col-md-4 col-sm-4">
            <div class="item">
                 <div class="courses-thumb">
                      <div class="courses-top">
                           <div class="courses-image">
                                <img src="${lugar.imagen}" class="img-responsive" alt="">
                           </div>
                      </div>

                      <div class="courses-detail">
                           <h3><a href="#">${lugar.nombre}</a></h3>
                      </div>

                      <div class="courses-info">
                           <div class="courses-price">
                                <a href="recorridos.html" onClick = "subirDatosLugar(${lugar.id},${lugar.lat},${lugar.long})"><span>VER MÁS</span></a>
                           </div>
                      </div>
                 </div>
            </div>
       </div>`
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let listarLugaresInscritos = () => {
    let data = ""
    axios.get(`http://localhost:3000/api/v1/recorridos/${documento}`).then(respuesta => {
        console.log(respuesta.data)
        let lista = document.getElementById("listaLugaresInscritos")
        for (let i = 0; i < respuesta.data.length; i++) {
            let lugar = respuesta.data[i]
            data += `<div class="col-md-3 col-sm-6">
            <div class="team-thumb">
                 <div class="team-image">
                      <img src="${lugar.imagen}" class="img-responsive" alt="">
                 </div>
                 <div class="team-info">
                      <h3>${lugar.nombre}</h3>
                 </div>
                 <ul class="social-icon">
                      <span><i class="fa fa-calendar"></i>${lugar.fecha}</span>
                      <br>
                      <span><i class="fa fa-clock-o"></i> ${lugar.hora}</span>
                 </ul>
                 <div class="courses-info">
                      <div class="courses-price free">
                           <a href="registrarExcursion.html" onClick = "subirDatosExcursion(${lugar.idlugar})"><span>PUBLICAR</span></a>
                      </div>
                 </div>
            </div>
       </div>`
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let subirDatosExcursion = (idlugar,fecha) => {
    console.log('el pepe')
    localStorage.setItem('idLugarExcursion',JSON.stringify(idlugar))
}


let subirDatosLugar = (idLugar,lat,long) => {
    console.log('pepe')
    localStorage.setItem('idLugar',JSON.stringify(idLugar))
    localStorage.setItem('lat',JSON.stringify(lat))
    localStorage.setItem('long',JSON.stringify(long))

}

listarLugaresInscritos()

listarLugaresLogin()

listarExcursionesLogin()

cargarDatosLogin()