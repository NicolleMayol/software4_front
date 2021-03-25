let token = localStorage.getItem('info')
let documento = parseInt(localStorage.getItem('documento'))
let lugares = []

let guardarLugares = () => {
    axios.get("http://localhost:3000/api/v1/lugares",{headers:{"token":token}}).then(respuesta => {
        lugares = respuesta.data
        console.log(lugares)
        console.log(documento)
    }).catch(error => {
        console.log(error)
    })
}

let mostrarBusqueda = () => {
     let data = ""
     let texto = document.getElementById('txtBusqueda').value.toLowerCase()
     let lista = document.getElementById("resultadoBusqueda")
     for(let lugar of lugares){
          let nombre = lugar.nombre.toLowerCase()
          if(nombre.indexOf(texto) !== -1){
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
                                <a href="recorridos.html" onClick = "subirDatosLugar(${lugar.id},${documento})"><span>VER MÁS</span></a>
                           </div>
                      </div>
                 </div>
            </div>
       </div>`
          }
     }
     if(data.length !== 0){
          lista.innerHTML = data;
     }else{
          data = `<div class="alert alert-danger" role="alert"> No hay resultados <a href="#" class="alert-link"></a></div>`
          lista.innerHTML = data
     }
     
}

let subirDatosLugar = (idLugar,documento) => {
     localStorage.setItem('idLugar',JSON.stringify(idLugar))
     let body = {documento:documento, idLugar:idLugar}
     axios.post("http://localhost:3000/api/v1/recorridos", body,{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
    })
 
 }



guardarLugares()