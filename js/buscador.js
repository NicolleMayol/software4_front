let token = localStorage.getItem('info')
let lugares = []

let guardarLugares = () => {
    axios.get("http://localhost:3000/api/v1/lugares",{headers:{"token":token}}).then(respuesta => {
        lugares = respuesta.data
        console.log(lugares)
    }).catch(error => {
        console.log(error)
    })
}

let mostrarBusqueda = () => {
     console.log(document.getElementById('txtPruebaBuscar').value)
}

let listarLugaresBusqueda = () => {
    let data = ""
    axios.get("http://localhost:3000/api/v1/lugares",{headers:{"token":token}}).then(respuesta => {
        let lista = document.getElementById("resultadoBusqueda")
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
                                <a href="recorridos.html" ><span>VER MÁS</span></a>
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

//listarLugaresBusqueda()

guardarLugares()