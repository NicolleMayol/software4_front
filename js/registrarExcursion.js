let idLugarExcusion = parseInt(localStorage.getItem('idLugarExcursion'))
let documentoExcursion = parseInt(localStorage.getItem('documento'))

let capturarDatosExcursion = () => {
    let nombre = document.getElementById('txtNombreExcursion').value
    let descripcion = document.getElementById('txtDescripcion').value
    let url = document.getElementById('txtUrl').value
    var f = new Date();
    let fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear()

    return {documento:documentoExcursion,idLugar:idLugarExcusion,nombre:nombre,fecha:fecha,descripcion:descripcion,url:url}

}

let registrarExcursion = () => {
    let body = capturarDatosExcursion();
    let mensaje = document.getElementById("mensaje")
    let data = ""
    axios.post("http://localhost:3000/api/v1/excursiones", body).then(respuesta => {
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