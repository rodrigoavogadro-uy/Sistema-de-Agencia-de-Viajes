window.addEventListener('load', inicio);

function inicio() {

//EVENTOS DE LA PANTALLA INICIO (ASIGNACION DE EVENTOS CLICK Y PANTALLAS OCULTAS)
    document.querySelector("#pantallaRegistro").style.display = "none";
    document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
    document.querySelector("#pantallaPrincipalClientes").style.display = "none";
    document.querySelector("#pantallaExplorarDestinos").style.display = "none";
    document.querySelector("#pantallaReservarDestinos").style.display = "none";
    document.querySelector("#pantallaReservarDestinosEnOferta").style.display = "none";
    document.querySelector("#pantallaHistorialReservas").style.display = "none";
    document.querySelector("#pantallaAdministrarDestinos").style.display = "none";
    document.querySelector("#pantallaAgregarDestinos").style.display = "none";
    document.querySelector("#pantallaInformeGanancias").style.display = "none";
    document.querySelector("#pantallaListadoYAprobacionDeReservas").style.display = "none";
    

    document.querySelector("#botonIngresar").addEventListener("click", iniciarSesion);
    document.querySelector("#botonIrARegistrar").addEventListener("click", function(){
        document.querySelector("#pantallaRegistro").style.display = "block";
        document.querySelector("#pantallaInicio").style.display = "none";
        document.querySelector("#nombreRegistro").value = "";
        document.querySelector("#apellidoRegistro").value = "";
        document.querySelector("#usuarioRegistro").value = "";
        document.querySelector("#contraseñaRegistro").value = "";
        document.querySelector("#tarjetaRegistro").value = "";
        document.querySelector("#cvcRegistro").value = "";
    });

//EVENTOS DE LA PANTALLA REGISTRO
document.querySelector("#botonRegistrar").addEventListener("click", registrarCliente);
document.querySelector("#botonVolverRegistro").addEventListener("click", function() {
    document.querySelector("#mensajeInicio").innerHTML = ""
    document.querySelector("#mensajeRegistro").innerHTML = "";
    document.querySelector("#pantallaRegistro").style.display = "none";
    document.querySelector("#pantallaInicio").style.display = "block";
    document.querySelector("#usuarioIngreso").value = "";
    document.querySelector("#contraseñaIngreso").value = "";
  })






    //EVENTOS DE LA PANTALLA PRINCIPAL ADMINISTRADOR:
    document.querySelector("#botonListadoAprobacionReservas").addEventListener("click", function(){
        document.querySelector("#botonVerListado").addEventListener("click", function(){
            document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = ""
            listadoYAprobacionDeReservas()
        });
        
        
        document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
        document.querySelector("#pantallaListadoYAprobacionDeReservas").style.display = "block";
        document.querySelector("#botonVolverListadoYAprobacionDeReservas").addEventListener("click", function(){
            document.querySelector("#mensajeListadoYAprobacionDeReservas").innerHTML = "";
            document.querySelector("#pantallaPrincipalAdministradores").style.display = "block";
            document.querySelector("#pantallaListadoYAprobacionDeReservas").style.display = "none";
            
        });
        
    });





    document.querySelector("#botonAgregarDestinos").addEventListener("click", function(){
        document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
        document.querySelector("#pantallaAgregarDestinos").style.display = "block";
        document.querySelector("#botonVolverAgregarDestinos").addEventListener("click", function(){
            document.querySelector("#mensajeAgregarDestino").innerHTML = ""
            document.querySelector("#pantallaPrincipalAdministradores").style.display = "block";
            document.querySelector("#pantallaAgregarDestinos").style.display = "none";
            
        });
        document.querySelector("#botonAgregarDestino").addEventListener("click", agregarDestinos);
    });





    document.querySelector("#botonAdministrarDestinos").addEventListener("click", function(){
        administrarDestinos()
        document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
        document.querySelector("#pantallaAdministrarDestinos").style.display = "block";
        document.querySelector("#botonVolverAdministrarDestinos").addEventListener("click", function(){
            document.querySelector("#pantallaPrincipalAdministradores").style.display = "block";
            document.querySelector("#pantallaAdministrarDestinos").style.display = "none";
            document.querySelector("#mensajeAdministrarDestinos").innerHTML = ""
            
            
        });
        
    });







    document.querySelector("#botonInformeGanancias").addEventListener("click", function(){
        informeDeGanancias()
        document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
        document.querySelector("#pantallaInformeGanancias").style.display = "block";
        document.querySelector("#botonVolverInformeGanancias").addEventListener("click", function(){
            document.querySelector("#pInformeGanancias").innerHTML = ""
            document.querySelector("#pantallaPrincipalAdministradores").style.display = "block";
            document.querySelector("#pantallaInformeGanancias").style.display = "none";
            
        });
        
    });





    
    document.querySelector("#botonCerrarSesionAdministrador").addEventListener("click", function(){
        document.querySelector("#pantallaPrincipalAdministradores").style.display = "none";
        document.querySelector("#pantallaInicio").style.display = "block";
        document.querySelector("#usuarioIngreso").value = "";
        document.querySelector("#contraseñaIngreso").value = "";
        document.querySelector("#mensajeInicio").innerHTML = "";
    });













    
    //EVENTOS DE LA PANTALLA PRINCIPAL CLIENTES:
    document.querySelector("#botonExplorarDestinos").addEventListener("click", function(){
        explorarDestinos()
        document.querySelector("#pantallaPrincipalClientes").style.display = "none";
        document.querySelector("#pantallaExplorarDestinos").style.display = "block";
        document.querySelector("#botonVolverExplorarDestinos").addEventListener("click", function(){
            document.querySelector("#pantallaPrincipalClientes").style.display = "block";
            document.querySelector("#pantallaExplorarDestinos").style.display = "none";
            
        });
        
    });

    document.querySelector("#botonReservarDestinos").addEventListener("click", function(){
        irAReservarDestino()
        document.querySelector("#pantallaPrincipalClientes").style.display = "none";
        document.querySelector("#pantallaReservarDestinos").style.display = "block";
        document.querySelector("#botonVolverReservarDestinos").addEventListener("click", function(){
            document.querySelector("#pantallaPrincipalClientes").style.display = "block";
            document.querySelector("#pantallaReservarDestinos").style.display = "none";
            
        });
        document.querySelector("#botonConfirmarReservaDestino").addEventListener("click", reservarDestino)
        
    });

    document.querySelector("#botonHistorialDeReservas").addEventListener("click", function(){
        verHistorialDeReservas()
        document.querySelector("#pantallaPrincipalClientes").style.display = "none";
        document.querySelector("#pantallaHistorialReservas").style.display = "block";
        document.querySelector("#botonVolverHistorialReservas").addEventListener("click", function(){
            document.querySelector("#pantallaPrincipalClientes").style.display = "block";
            document.querySelector("#pantallaHistorialReservas").style.display = "none";
            
        });
        
    });

    document.querySelector("#botonDestinosEnOferta").addEventListener("click", function(){
        irAReservarDestinoEnOferta()
        document.querySelector("#pantallaPrincipalClientes").style.display = "none";
        document.querySelector("#pantallaReservarDestinosEnOferta").style.display = "block";
        document.querySelector("#botonVolverReservarDestinosEnOferta").addEventListener("click", function(){
            document.querySelector("#pantallaPrincipalClientes").style.display = "block";
            document.querySelector("#pantallaReservarDestinosEnOferta").style.display = "none";
            
        });
        document.querySelector("#botonConfirmarReservaDestinoEnOferta").addEventListener("click", reservarDestinoEnOferta)
    });





    document.querySelector("#botonCerrarSesionCliente").addEventListener("click", function(){
        document.querySelector("#pantallaPrincipalClientes").style.display = "none";
        document.querySelector("#pantallaInicio").style.display = "block";
        document.querySelector("#usuarioIngreso").value = "";
        document.querySelector("#contraseñaIngreso").value = "";
        document.querySelector("#mensajeInicio").innerHTML = "";
        
    });















}
















