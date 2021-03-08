let documentoRecorrido = parseInt(localStorage.getItem('documento'))
let idLugarRecorrido = parseInt(localStorage.getItem('idLugar'))

let capturarDatosRecorrido = () => {
    let nombreRecorrido = document.getElementById('txtNombreRecorrido').value
    let fecha = document.getElementById('txtFecha').value
    let hora = document.getElementById('txtHora').value

    return {documento:documentoRecorrido,idLugar:idLugarRecorrido,nombre:nombreRecorrido,fecha:fecha,hora:hora,precio:75000}

}

let registrarRecorrido = () => {
    let body = capturarDatosRecorrido();
    let mensaje = document.getElementById("mensaje")
    let data = ""
    axios.post("http://localhost:3000/api/v1/recorridos", body).then(respuesta => {
        data = `<div class="alert alert-success" role="alert">
            ${respuesta.data.mensaje} <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
    }).catch(error => {
        console.log(error)
        data = `<div class="alert alert-danger" role="alert">
            hubo un error <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
    })
}