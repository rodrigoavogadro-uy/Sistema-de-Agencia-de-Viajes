
let usuarioIngreso
let sistema = new Sistema();

//FUNCION QUE INICIA SESIÓN EN EL SISTEMA
function iniciarSesion() {
  usuarioIngreso = document.querySelector("#usuarioIngreso").value
  let contraseñaIngreso = document.querySelector("#contraseñaIngreso").value
  let hayCoincidencia = false;
  let usuarioIngresoMinuscula = usuarioIngreso.toLowerCase();
  console.log(usuarioIngresoMinuscula)

  if (usuarioIngreso != "" && contraseñaIngreso != "") {
    if (sistema.existeUsuario(usuarioIngresoMinuscula)) {
      if (sistema.esAdministrador(usuarioIngresoMinuscula, contraseñaIngreso)) {
        for (let i = 0; i < sistema.administradores.length; i++) {
          if (usuarioIngresoMinuscula == sistema.administradores[i].nombreDeUsuario && contraseñaIngreso == sistema.administradores[i].contraseña) {
            hayCoincidencia = true;
          }
        }
        if (hayCoincidencia) {
          sistema.irAlMenuPrincipalAdministrador() //pasar a pantalla principal de administradores
        } else {
          document.querySelector("#mensajeInicio").innerHTML = "Los datos ingresados son incorrectos."
        }
      } else {
        for (let i = 0; i < sistema.clientes.length; i++) {
          if (usuarioIngresoMinuscula == sistema.clientes[i].nombreDeUsuario && contraseñaIngreso == sistema.clientes[i].contraseña) {
            hayCoincidencia = true;
          }
        }
        if (hayCoincidencia) {
          sistema.irAlMenuPrincipalComprador() //pasar a pantalla principal de compradores
        } else {
          document.querySelector("#mensajeInicio").innerHTML = "Los datos ingresados son incorrectos."
        }
      }
    } else {
      document.querySelector("#mensajeInicio").innerHTML = "Nombre de usuario inexistente. Intente de nuevo."
    }
  } else {
    document.querySelector("#mensajeInicio").innerHTML = "Debe completar todos los campos."
  }

}

function registrarCliente() { //4970100000000055
  document.querySelector("#mensajeRegistro").innerHTML = "";
  let nombreRegistro = document.querySelector("#nombreRegistro").value
  let apellidoRegistro = document.querySelector("#apellidoRegistro").value
  let usuarioRegistro = document.querySelector("#usuarioRegistro").value
  let contraseñaRegistro = document.querySelector("#contraseñaRegistro").value
  let tarjetaRegistro = document.querySelector("#tarjetaRegistro").value
  let cvcRegistro = document.querySelector("#cvcRegistro").value
  let usuarioRegistroMinuscula = usuarioRegistro.toLowerCase()




  //Verifica que no haya campos vacíos, de lo contrario muestra un mensaje de error.
  if (nombreRegistro != "" && apellidoRegistro != "" && usuarioRegistro != "" && contraseñaRegistro != "" && tarjetaRegistro != "" && cvcRegistro != "") {
    //Verifica que la contraseña cumpla con todos los parámetros, de lo contrario muestra un mensaje de error.
    if (sistema.claveEsValida(contraseñaRegistro)) {
      //Elimina los guiones de la tarjeta para mayor facilidad.
      let numeroTarjetaSinGuiones = sistema.eliminarGuiones(tarjetaRegistro);
      //Verifica si la tarjeta ingresada es válida o no, de lo contrario muestra un mensaje de error.
      if (sistema.ValidacionTarjeta(numeroTarjetaSinGuiones)) {
        if (!sistema.existeUsuario(usuarioRegistroMinuscula)) {
          //ACA REGISTRA AL USUARIO
          sistema.clientes.push(new Cliente(nombreRegistro, apellidoRegistro, usuarioRegistro, contraseñaRegistro, numeroTarjetaSinGuiones, cvcRegistro, 15000, 0));
          console.log(sistema.clientes)
          document.querySelector("#mensajeRegistro").innerHTML = "Usuario registrado con exito"
        } else {
          document.querySelector("#mensajeRegistro").innerHTML = "Nombre de usuario no disponible."
        }

      } else {
        document.querySelector("#mensajeRegistro").innerHTML = `El número de tarjeta: <span><i>${numeroTarjetaSinGuiones}</i></span> <b>NO es válido<b/>.`;
      }
    } else {
      document.querySelector("#mensajeRegistro").innerHTML = `Clave invalida, debe tener un minimo de 5 caracteres, contando con al menos una mayuscula, una minuscula y un numero.`
    }
  } else {
    document.querySelector("#mensajeRegistro").innerHTML = "Debe completar todos los campos.";
  }
}

function explorarDestinos(){
  let tablaExplorarDestinos = `<table>
    <thead>
      <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>¿En oferta?</th>
          <th>Imagen</th>
      </tr>
    </thead>`;
  for(let i = 0; i < sistema.destinos.length; i++){
    let enOferta = ""
    if(sistema.destinos[i].cuposDestino > 0 && sistema.destinos[i].estadoDestino === "activo"){
      if(sistema.destinos[i].ofertaDestino === true){
        enOferta = "SI"
      }else{
        enOferta = "NO"
      }
      tablaExplorarDestinos += `<tr>
                    <td>${sistema.destinos[i].nombreDestino}</td>
                    <td>${sistema.destinos[i].descripcionDestino}</td>
                    <td>${sistema.destinos[i].precioDestino}</td>
                    <td>${enOferta}</td>
                    <td><img src="${sistema.destinos[i].imagenDestino}"></td>
                </tr>`;
    }
  }
  tablaExplorarDestinos += `</table> <button id="botonVolverExplorarDestinos" class="boton">Volver</button>`
  document.querySelector("#mostrarTablaExplorarDestinos").innerHTML = tablaExplorarDestinos;
}

function irAReservarDestino(){
  let selectReservarDestinos = `<select id="selectReservarDestinos">`
  let selectFormaDePago = `<select id="selectFormaDePago">
  <option value="Dinero">Dinero</option>
  <option value="Millas">Millas</option> </select> <input type="text" id="inputCantidadPersonas" placeholder="Cantidad de personas"> <button id="botonConfirmarReservaDestino" class="boton">Reservar</button> <button id="botonVolverReservarDestinos" class="boton">Volver</button> <p id="mensajeReservarDestino"></p>`

  let tablaVerMillas = `<table class="table">
            <thead>
                <th>Millas</th>
            </thead>
            <tbody>
                <tr>
                    <td>5000</td>
                </tr>
            </tbody>
        </table>`
  
  for(let i = 0; i < sistema.destinos.length; i++){
    selectReservarDestinos+= `<option value="${sistema.destinos[i].nombreDestino}">${sistema.destinos[i].nombreDestino}</option>`
  }
  selectReservarDestinos +=  '</select>'
  document.querySelector("#mostrarSelectReservarDestinos").innerHTML = selectReservarDestinos;
  document.querySelector("#mostrarSelectFormaDePago").innerHTML = selectFormaDePago;
}

function reservarDestino() {
 let destinoSeleccionado = document.querySelector('#selectReservarDestinos').value;
 let metodoDePagoSeleccionado = document.querySelector('#selectFormaDePago').value;
 let personasSeleccionadas = Number(document.querySelector('#inputCantidadPersonas').value);
 let destinoYaReservado = false;
 let precioParaDestinoSeleccionado = 0;
  if(personasSeleccionadas > 0 && !isNaN(personasSeleccionadas)){
    for(let i= 0; i < sistema.reservas.length; i++){
      if(usuarioIngreso.toLowerCase() === sistema.reservas[i].nombreCliente.toLowerCase() && destinoSeleccionado === sistema.reservas[i].nombreDestino){
        destinoYaReservado = true;
      }
    }
    if(destinoYaReservado === false){
      for(let j = 0; j < sistema.destinos.length; j++){
        if(destinoSeleccionado === sistema.destinos[j].nombreDestino){
          precioParaDestinoSeleccionado = sistema.destinos[j].precioDestino
        }
      }
      sistema.reservas.push(new Reserva(usuarioIngreso.toLowerCase(), destinoSeleccionado, personasSeleccionadas, personasSeleccionadas * precioParaDestinoSeleccionado, "pendiente", metodoDePagoSeleccionado))
      document.querySelector('#mensajeReservarDestino').innerHTML = "Destino reservado con éxito";
      console.log(sistema.reservas)
    }else{
      document.querySelector('#mensajeReservarDestino').innerHTML = "Ya ha reservado este destino anteriormente.";
      console.log(sistema.reservas)
    }
  }else{
    document.querySelector('#mensajeReservarDestino').innerHTML = "Por favor ingrese la cantidad de personas a reservar";
  }
}


function verHistorialDeReservas(){
  let tablaVerHistorialDeReservas =
    `<table>
  <thead>
    <tr>
        <th>Nombre del destino</th>
        <th>Personas reservadas</th>
        <th>Monto total</th>
        <th>Estado</th>
        <th>Acciones</th>
    </tr>
  </thead>`;
  for(let i = 0; i < sistema.reservas.length; i++){
    if(usuarioIngreso.toLowerCase() === sistema.reservas[i].nombreCliente){
      if(sistema.reservas[i].estadoReserva === "pendiente"){
        tablaVerHistorialDeReservas += `<tr>
            <td>${sistema.reservas[i].nombreDestino}</td>
            <td>${sistema.reservas[i].personasReservadas}</td>
            <td>$${sistema.reservas[i].montoTotalReserva}</td>
            <td>${sistema.reservas[i].estadoReserva}</td>
            <td><button onclick="cambiarEstadoReserva(${i})">Cancelar</button></td>
        </tr>`;
      }else{
        tablaVerHistorialDeReservas += `<tr>
            <td>${sistema.reservas[i].nombreDestino}</td>
            <td>${sistema.reservas[i].personasReservadas}</td>
            <td>$${sistema.reservas[i].montoTotalReserva}</td>
            <td>${sistema.reservas[i].estadoReserva}</td>
            <td>Ninguna</td>
        </tr>`;
      }
    }
  }
  tablaVerHistorialDeReservas += `</table>`
  document.querySelector("#mostrarTablaVerHistorialDeReservas").innerHTML = tablaVerHistorialDeReservas;
}


function cambiarEstadoReserva(i){
  sistema.reservas[i].estadoReserva = "cancelada"
  verHistorialDeReservas();
}//en sistema


function irAReservarDestinoEnOferta(){
  let tablaExplorarDestinosEnOferta = `<table>
    <thead>
      <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Imagen</th>
      </tr>
    </thead>`;
  let selectReservarDestinosEnOferta = `<select id="selectReservarDestinosEnOferta">`
  let selectFormaDePagoEnOferta = `<select id="selectFormaDePagoEnOferta">
  <option value="Dinero">Dinero</option>
  <option value="Millas">Millas</option> </select> <input type="text" id="inputCantidadPersonasEnOferta" placeholder="Cantidad de personas"> <button id="botonConfirmarReservaDestinoEnOferta" class="boton">Reservar</button> <button id="botonVolverReservarDestinosEnOferta" class="boton">Volver</button> <p id="mensajeReservarDestinoEnOferta"></p>`

  
  for(let i = 0; i < sistema.destinos.length; i++){
    if(sistema.destinos[i].ofertaDestino === true){
      tablaExplorarDestinosEnOferta += `<tr>
                    <td>${sistema.destinos[i].nombreDestino}</td>
                    <td>${sistema.destinos[i].descripcionDestino}</td>
                    <td>${sistema.destinos[i].precioDestino}</td>
                    <td><img src="${sistema.destinos[i].imagenDestino}"></td>
                </tr>`;
      selectReservarDestinosEnOferta+= `<option value="${sistema.destinos[i].nombreDestino}">${sistema.destinos[i].nombreDestino}</option>`
    }
  }
  selectReservarDestinosEnOferta +=  '</select>'
  tablaExplorarDestinosEnOferta += '</table>'
  document.querySelector("#mostrarTablaDestinosEnOferta").innerHTML = tablaExplorarDestinosEnOferta;
  document.querySelector("#mostrarSelectReservarDestinosEnOferta").innerHTML = selectReservarDestinosEnOferta;
  document.querySelector("#mostrarSelectFormaDePagoEnOferta").innerHTML = selectFormaDePagoEnOferta;
}


function reservarDestinoEnOferta() {
  let destinoSeleccionadoEnOferta = document.querySelector('#selectReservarDestinosEnOferta').value;
  let metodoDePagoSeleccionadoEnOferta = document.querySelector('#selectFormaDePagoEnOferta').value;
  let personasSeleccionadasEnOferta = Number(document.querySelector('#inputCantidadPersonasEnOferta').value);
  let destinoYaReservado = false;
  let precioParaDestinoSeleccionado = 0;
   if(personasSeleccionadasEnOferta > 0 && !isNaN(personasSeleccionadasEnOferta)){
     for(let i= 0; i < sistema.reservas.length; i++){
       if(usuarioIngreso.toLowerCase() === sistema.reservas[i].nombreCliente.toLowerCase() && destinoSeleccionadoEnOferta === sistema.reservas[i].nombreDestino){
         destinoYaReservado = true;
       }
     }
     if(destinoYaReservado === false){
       for(let j = 0; j < sistema.destinos.length; j++){
         if(destinoSeleccionadoEnOferta === sistema.destinos[j].nombreDestino){
           precioParaDestinoSeleccionado = sistema.destinos[j].precioDestino
         }
       }
       sistema.reservas.push(new Reserva(usuarioIngreso.toLowerCase(), destinoSeleccionadoEnOferta, personasSeleccionadasEnOferta, personasSeleccionadasEnOferta * precioParaDestinoSeleccionado, "pendiente", metodoDePagoSeleccionadoEnOferta))
       document.querySelector('#mensajeReservarDestinoEnOferta').innerHTML = "Destino reservado con éxito";
       console.log(sistema.reservas)
     }else{
       document.querySelector('#mensajeReservarDestinoEnOferta').innerHTML = "Ya ha reservado este destino anteriormente.";
       console.log(sistema.reservas)
     }
   }else{
     document.querySelector('#mensajeReservarDestinoEnOferta').innerHTML = "Por favor ingrese la cantidad de personas a reservar";
   }
 }


function agregarDestinos(){
  let agregarNombreDestino = document.querySelector("#agregarNombreDestino").value;
  let agregarPrecio = Number(document.querySelector("#agregarPrecio").value);
  let agregarDescripcion = document.querySelector("#agregarDescripcion").value;
  let agregarImagen = document.querySelector("#agregarImagen").value;
  let agregarCuposDisponibles = document.querySelector("#agregarCuposDisponibles").value;

  if (agregarNombreDestino != "" && agregarPrecio != "" && agregarDescripcion != "" && agregarImagen != "" && agregarCuposDisponibles != "") {
    if (agregarPrecio > 0 && !isNaN(agregarPrecio) && agregarCuposDisponibles > 0 && !isNaN(agregarCuposDisponibles)){
      sistema.destinos.push(new Destino(agregarNombreDestino, agregarPrecio, agregarDescripcion, agregarImagen, agregarCuposDisponibles, "activo", false))
      document.querySelector("#mensajeAgregarDestino").innerHTML = "Destino agregado con exito";
      console.log(sistema.destinos)
    } else {
      document.querySelector("#mensajeAgregarDestino").innerHTML = "El precio y los cupos disponibles deben de ser valores numéricos y mayores que 0.";

    }

  } else {
    document.querySelector("#mensajeAgregarDestino").innerHTML = "Complete todos los campos.";
  }
}


function administrarDestinos(){
  let selectAdministrarDestinos = '<select id="selectAdministrarDestinos">'
  for (let i = 0; i < sistema.destinos.length; i++) {
    selectAdministrarDestinos += `<option value="${sistema.destinos[i].nombreDestino}">${sistema.destinos[i].nombreDestino}</option>`
  }
  selectAdministrarDestinos += '</select> <input type="text" id="cantidadCuposAModificar" placeholder="Cupos a modificar"> <button class="boton" onclick="aumentarCupos()">Aumentar Cupos</button> <button class="boton" onclick="disminuirCupos()">Disminuir Cupos</button> <button class="boton" onclick="modificarEstadoDestinos()">Activar/Pausar</button> <button class="boton" onclick="modificarOfertaDestino()">Oferta/Sin Oferta</button>'
  document.querySelector("#mostrarAdministrarDestinos").innerHTML = selectAdministrarDestinos;
}


function aumentarCupos(){
  let selectAdministrarDestinos = document.querySelector("#selectAdministrarDestinos").value;
  let cantidadCuposAModificar = Number(document.querySelector("#cantidadCuposAModificar").value);
  if (!isNaN(cantidadCuposAModificar) && cantidadCuposAModificar !== 0 && cantidadCuposAModificar > 0) {

    for (let i = 0; i < sistema.destinos.length; i++) {
      if (sistema.destinos[i].nombreDestino === selectAdministrarDestinos) {
        sistema.destinos[i].cuposDestino = sistema.destinos[i].cuposDestino + cantidadCuposAModificar
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El stock ha sido aumentado con éxito";
        console.log(sistema.destinos[i].cuposDestino)
      }
    }

  } else {
    document.querySelector("#mensajeAdministrarDestinos").innerHTML = "Error. Debe ingresar un número y que sea mayor que 0";
  }
}

function disminuirCupos(){
  let selectAdministrarDestinos = document.querySelector("#selectAdministrarDestinos").value;
  let cantidadCuposAModificar = Number(document.querySelector("#cantidadCuposAModificar").value);
  if (!isNaN(cantidadCuposAModificar) && cantidadCuposAModificar !== 0 && cantidadCuposAModificar > 0) {

    for (let i = 0; i < sistema.destinos.length; i++) {
      if (sistema.destinos[i].nombreDestino === selectAdministrarDestinos) {
        if(cantidadCuposAModificar <= sistema.destinos[i].cuposDestino){
        sistema.destinos[i].cuposDestino = sistema.destinos[i].cuposDestino - cantidadCuposAModificar
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El stock ha sido disminuido con éxito";
        console.log(sistema.destinos[i].cuposDestino)
        }else{
          document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El numero de cupos a disminuir excede los ya existentes.";
        }
      }
    }

  } else {
    document.querySelector("#mensajeAdministrarDestinos").innerHTML = "Error. Debe ingresar un número y que sea mayor que 0";
  }
}

function modificarEstadoDestinos(){
  
  let selectAdministrarDestinos = document.querySelector("#selectAdministrarDestinos").value;

  for (let i = 0; i < sistema.destinos.length; i++) {
    if (sistema.destinos[i].nombreDestino === selectAdministrarDestinos) {
      if (sistema.destinos[i].estadoDestino === "activo") {
        sistema.destinos[i].estadoDestino = "pausado"
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El articulo ha sido pausado";
        console.log(sistema.destinos[i].estadoDestino)
      } else {
        sistema.destinos[i].estadoDestino = "activo"
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El articulo ha sido activado";
        console.log(sistema.destinos[i].estadoDestino)
      }


    }
  }
}


function modificarOfertaDestino(){
  let selectAdministrarDestinos = document.querySelector("#selectAdministrarDestinos").value;

  for (let i = 0; i < sistema.destinos.length; i++) {
    if (sistema.destinos[i].nombreDestino === selectAdministrarDestinos) {
      if (sistema.destinos[i].ofertaDestino === true) {
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El articulo ya no se encuentra en oferta";
        sistema.destinos[i].ofertaDestino = false
        console.log(sistema.destinos[i].ofertaDestino)
      } else {
        sistema.destinos[i].ofertaDestino = true
        document.querySelector("#mensajeAdministrarDestinos").innerHTML = "El articulo ha sido colocado en oferta";
        console.log(sistema.destinos[i].ofertaDestino)
      }


    }
  }
}

function informeDeGanancias() {
  let totalGenerado = 0;
  let arrayGeneradoPorDestino = []; // Usamos un array desde el principio
  let tablaTotalGeneradoPorDestino = `<table>
    <thead>
      <tr>
          <th>Destino</th>
          <th>Personas reservadas</th>
          <th>Ganancias</th>
      </tr>
    </thead>
    <tbody>`;

  // Recorremos las reservas
  for (let i = 0; i < sistema.reservas.length; i++) {
    let reserva = sistema.reservas[i];

    // Sumar el total generado por todas las reservas aprobadas
    if (reserva.estadoReserva === "aprobada") {
      totalGenerado += reserva.montoTotalReserva;
    }

    // Solo contabilizar reservas aprobadas pagadas en efectivo
    if (reserva.estadoReserva === "aprobada" && reserva.formaDePago === "Dinero") {
      let destinoEncontrado = false; // Variable booleana para indicar si el destino fue encontrado

      // Buscamos si ya existe el destino en el array
      for (let j = 0; j < arrayGeneradoPorDestino.length; j++) {
        if (arrayGeneradoPorDestino[j].nombreDestino === reserva.nombreDestino) {
          // Si existe, sumamos las personas y las ganancias
          arrayGeneradoPorDestino[j].personasReservadas += reserva.personasReservadas;
          arrayGeneradoPorDestino[j].ganancias += reserva.montoTotalReserva;
          destinoEncontrado = true; // Marcamos que el destino fue encontrado
          break; // Salimos del bucle una vez encontrado
        }
      }

      if (!destinoEncontrado) {
        // Si no existe, creamos una nueva entrada
        arrayGeneradoPorDestino.push({nombreDestino: reserva.nombreDestino, personasReservadas: reserva.personasReservadas, ganancias: reserva.montoTotalReserva});
      }
    }
  }

  // Generar las filas de la tabla con los datos acumulados
  for (let j = 0; j < arrayGeneradoPorDestino.length; j++) {
    let destino = arrayGeneradoPorDestino[j];
    tablaTotalGeneradoPorDestino += `<tr>
                    <td>${destino.nombreDestino}</td>
                    <td>${destino.personasReservadas}</td>
                    <td>$${destino.ganancias}</td>
                </tr>`;
  }

  // Cerrar la tabla
  tablaTotalGeneradoPorDestino += `</tbody></table>`;

  // Mostrar resultados en el DOM
  console.log(arrayGeneradoPorDestino);
  document.querySelector("#pInformeGanancias").innerHTML = "El total confirmado por todas las reservas aprobadas es de: $" + totalGenerado;
  document.querySelector("#mostrarTablaTotalGeneradoPorDestino").innerHTML = tablaTotalGeneradoPorDestino;
}

function listadoYAprobacionDeReservas(){
  let selectListadoYAprobacionDeReservas = document.querySelector("#selectListadoYAprobacionDeReservas").value;
  let tablaListadoYAprobacionDeReservas = `<table>
  <thead>
    <tr>
        <th>Nombre del cliente</th>
        <th>Nombre del destino</th>
        <th>Personas reservadas</th>
        <th>Monto total</th>
        <th>Forma de pago</th>
        <th>Estado de la reserva</th>
        <th>Acciones</th>
    </tr>
  </thead>`;

  switch(selectListadoYAprobacionDeReservas){
    case "Pendientes":
      for(let i = 0; i < sistema.reservas.length; i++){
        if(sistema.reservas[i].estadoReserva === "pendiente"){
        tablaListadoYAprobacionDeReservas += `<tr>
            <td>${sistema.reservas[i].nombreCliente}</td>
            <td>${sistema.reservas[i].nombreDestino}</td>
            <td>${sistema.reservas[i].personasReservadas}</td>
            <td>${sistema.reservas[i].montoTotalReserva}</td>
            <td>${sistema.reservas[i].formaDePago}</td>
            <td>${sistema.reservas[i].estadoReserva}</td>
            <td><button onclick="aprobarOCancelarReserva(${i})">Procesar reserva</button></td>
        </tr>`;
        }
      }
      tablaListadoYAprobacionDeReservas += `</table>`
      document.querySelector("#mostrarTablaListadoYAprobacionDeReservas").innerHTML = tablaListadoYAprobacionDeReservas
      break;

      case "Canceladas":
      for(let i = 0; i < sistema.reservas.length; i++){
        if(sistema.reservas[i].estadoReserva === "cancelada"){
        tablaListadoYAprobacionDeReservas += `<tr>
            <td>${sistema.reservas[i].nombreCliente}</td>
            <td>${sistema.reservas[i].nombreDestino}</td>
            <td>${sistema.reservas[i].personasReservadas}</td>
            <td>${sistema.reservas[i].montoTotalReserva}</td>
            <td>${sistema.reservas[i].formaDePago}</td>
            <td>${sistema.reservas[i].estadoReserva}</td>
            <td>Ninguna</td>
        </tr>`;
        }
      }
      tablaListadoYAprobacionDeReservas += `</table>`
      document.querySelector("#mostrarTablaListadoYAprobacionDeReservas").innerHTML = tablaListadoYAprobacionDeReservas
      break;

      case "Aprobadas":
      for(let i = 0; i < sistema.reservas.length; i++){
        if(sistema.reservas[i].estadoReserva === "aprobada"){
        tablaListadoYAprobacionDeReservas += `<tr>
            <td>${sistema.reservas[i].nombreCliente}</td>
            <td>${sistema.reservas[i].nombreDestino}</td>
            <td>${sistema.reservas[i].personasReservadas}</td>
            <td>${sistema.reservas[i].montoTotalReserva}</td>
            <td>${sistema.reservas[i].formaDePago}</td>
            <td>${sistema.reservas[i].estadoReserva}</td>
            <td>Ninguna</td>
        </tr>`;
        }
      }
      tablaListadoYAprobacionDeReservas += `</table>`
      document.querySelector("#mostrarTablaListadoYAprobacionDeReservas").innerHTML = tablaListadoYAprobacionDeReservas
      break;
  }
}


function aprobarOCancelarReserva(i) {
  let reservaInfo;
  let clienteInfo;
  let destinoInfo;
  
  for (let j = 0; j < sistema.clientes.length; j++) { 
    if (sistema.reservas[i].nombreCliente.toLowerCase() === sistema.clientes[j].nombreDeUsuario.toLowerCase()) { //Conecta el nombre de la reserva con el nombre del cliente
      if (sistema.reservas[i].formaDePago === "Millas") { //Chequea si el metodo de pago es con millas      
        if (sistema.clientes[j].millas >= sistema.reservas[i].montoTotalReserva) {    //Si tiene millas suficientes para costear la reserva
          for (let k = 0; k < sistema.destinos.length; k++) { //Recorre los destinos
            if (sistema.reservas[i].nombreDestino === sistema.destinos[k].nombreDestino){   //Vincula el destino de la reserva con el destino de la lista de destinos
              if(sistema.reservas[i].personasReservadas <= sistema.destinos[k].cuposDestino){   //Chequea si hay cupos disponibles para la cantidad de personas reservadas       
              sistema.clientes[j].millas = sistema.clientes[j].millas - sistema.reservas[i].montoTotalReserva;
              sistema.destinos[k].cuposDestino -= sistema.reservas[i].personasReservadas;
              sistema.reservas[i].estadoReserva = "aprobada";
              document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "La reserva ha sido aprobada con éxito."
              if (sistema.destinos[k].cuposDestino === 0) {
                sistema.destinos[k].estadoDestino = "pausado";
              }

              reservaInfo = sistema.reservas[i];
              clienteInfo = sistema.clientes[j];
              destinoInfo = sistema.destinos[k];
              }else{
                sistema.reservas[i].estadoReserva = "cancelada";
                reservaInfo = sistema.reservas[i];
              clienteInfo = sistema.clientes[j];
              destinoInfo = sistema.destinos[k];
              document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "Las persona reservadas excede el limite de cupos. Su reserva queda cancelada."
              }
            }
          }
        }else if(sistema.clientes[j].millas + sistema.clientes[j].dinero >= sistema.reservas[i].montoTotalReserva){
          let dineroRestante = 0;
          for (let k = 0; k < sistema.destinos.length; k++) { //Recorre los destinos
            if (sistema.reservas[i].nombreDestino === sistema.destinos[k].nombreDestino){   //Vincula el destino de la reserva con el destino de la lista de destinos
              if(sistema.reservas[i].personasReservadas <= sistema.destinos[k].cuposDestino){   //Chequea si hay cupos disponibles para la cantidad de personas reservadas  
                dineroRestante = (sistema.clientes[j].millas + sistema.clientes[j].dinero) - sistema.reservas[i].montoTotalReserva
                sistema.clientes[j].millas = 0;
                sistema.clientes[j].dinero = dineroRestante;
                sistema.destinos[k].cuposDestino -= sistema.reservas[i].personasReservadas;
                sistema.reservas[i].estadoReserva = "aprobada";
                document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "La reserva ha sido aprobada con éxito."
              
              if (sistema.destinos[k].cuposDestino === 0) {
                sistema.destinos[k].estadoDestino = "pausado";
              }

              reservaInfo = sistema.reservas[i];
              clienteInfo = sistema.clientes[j];
              destinoInfo = sistema.destinos[k];
              }else{
                sistema.reservas[i].estadoReserva = "cancelada";
                reservaInfo = sistema.reservas[i];
                clienteInfo = sistema.clientes[j];
                document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "Las personas reservadas excede el limite de cupos. Su reserva queda cancelada."
              }
            }
          }
        }else{
          sistema.reservas[i].estadoReserva = "cancelada";
          reservaInfo = sistema.reservas[i];
          clienteInfo = sistema.clientes[j];
          document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "No tiene millas ni dinero suficiente para realizar la reserva. Su reserva queda cancelada."
        }
      }else{
        
        if (sistema.clientes[j].dinero >= sistema.reservas[i].montoTotalReserva) {    //Si tiene dinero suficiente para costear la reserva
          for (let k = 0; k < sistema.destinos.length; k++) { //Recorre los destinos
            if (sistema.reservas[i].nombreDestino === sistema.destinos[k].nombreDestino){   //Vincula el destino de la reserva con el destino de la lista de destinos
              if(sistema.reservas[i].personasReservadas <= sistema.destinos[k].cuposDestino){   //Chequea si hay cupos disponibles para la cantidad de personas reservadas       
              sistema.clientes[j].dinero = sistema.clientes[j].dinero - sistema.reservas[i].montoTotalReserva;
              sistema.destinos[k].cuposDestino -= sistema.reservas[i].personasReservadas;
              sistema.reservas[i].estadoReserva = "aprobada";
              document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "La reserva ha sido aprobada con éxito."
              if (sistema.destinos[k].cuposDestino === 0) {
                sistema.destinos[k].estadoDestino = "pausado";
              }

              reservaInfo = sistema.reservas[i];
              clienteInfo = sistema.clientes[j];
              destinoInfo = sistema.destinos[k];
              }else{
                sistema.reservas[i].estadoReserva = "cancelada";
                reservaInfo = sistema.reservas[i];
                clienteInfo = sistema.clientes[j];
                destinoInfo = sistema.destinos[k];
                document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "Las personas reservadas excede el limite de cupos. Su reserva queda cancelada."
              }
            }
          }
        }else{
          sistema.reservas[i].estadoReserva = "cancelada";
          reservaInfo = sistema.reservas[i];
          clienteInfo = sistema.clientes[j];
          document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "No tiene dinero suficiente para realizar la reserva. Su reserva queda cancelada."
        }
      }
    }
  }

  console.log("Información de la reserva:", reservaInfo);
  console.log("Información del cliente:", clienteInfo);
  console.log("Información del destino:", destinoInfo);
  
  listadoYAprobacionDeReservas();
}













