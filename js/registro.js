let nombres = ""
let apellidos = ""
let email = ""


let cargarDatos = () => {
    nombres = localStorage.getItem('nombreRegistro')
    apellidos = localStorage.getItem('apellidoRegistro')
    email = localStorage.getItem('emailRegistro')

    document.getElementById('txtNombre').value = nombres
    document.getElementById('txtApellido').value = apellidos
    document.getElementById('txtEmail').value = email
}

let atraparDatosRegistro2 = () => {
    let documento = document.getElementById('txtDocumento').value
    let tipoDocumento = document.getElementById('cmbTipoDocumento').value
    let nombre = document.getElementById('txtNombre').value
    let apellido = document.getElementById('txtApellido').value
    let emailRegistro = document.getElementById('txtEmail').value
    let telefono = document.getElementById('txtTelefono').value
    let fechaNacimiento = document.getElementById('txtFechaNacimiento').value
    let genero = document.getElementById('cmbGenero').value
    let contraseña = document.getElementById('txtContraseña').value
    let verificarContraseña = document.getElementById('txtConfirmarContraseña').value

    return {documento:documento,tipoDocumento:tipoDocumento,nombres:nombre,apellidos:apellido,telefono:telefono,email:emailRegistro,fechaNacimiento:fechaNacimiento,genero:genero,contraseña:contraseña,verificarContraseña:verificarContraseña}
    
}

let registrarUsuarioParte2 = () => {
    let body = atraparDatosRegistro2()
    let mensaje = document.getElementById("mensaje")
    let data = ""
    if(body.contraseña === body.verificarContraseña){
        axios.post("http://localhost:3000/api/v1/registro", body).then(respuesta => {
            data = `<div class="alert alert-success" role="alert">
            ${respuesta.data.mensaje} <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
        }).catch(error => {
            data = `<div class="alert alert-danger" role="alert">
            Hubo un error <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
            console.log(error)
        })
    }else{
        console.log('elpepe')
        data = `<div class="alert alert-danger" role="alert">
            las contraseñas deben coincidir <a href="#" class="alert-link"></a>
            </div>`
        mensaje.innerHTML = data
    }
}

cargarDatos()