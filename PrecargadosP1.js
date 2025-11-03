class Sistema {
    constructor(){
        this.administradores = [
            new Administrador("martinperez", "123"),
            new Administrador("sofiarodriguez", "Srodriguez1"),
            new Administrador("diegolopez", "Dlopez1"),
            new Administrador("rodrigoavogadro", "Ravogadro1"),
            new Administrador("ignaciogiglio", "Igiglio1"),
        ];

        this.clientes = [
            new Cliente("Martín", "Pérez", "mperez_uruguay", "123", "4485746493384014", 123, 100, 9000),
            new Cliente("Sofía", "Rodríguez", "srodriguez_uy", "S0fiaUruguay", "4539371567070872", 456, 15000, 0),
            new Cliente("Juan", "González", "jgonzalez_uy", "Jua1nGonzalez", "4539625308478250", 789, 5552546, 2000),
            new Cliente("Carolina", "Silva", "csilva_uruguay", "Car0l1naSilva", "4916103567334187", 101, 3000, 0),
            new Cliente("Diego", "López", "dlopez_uy", "D1iegoLopez", "5223450370829605",434, 536, 0),
        ]

        this.destinos = [
            new Destino("París, Francia", 1500, "Disfruta de la ciudad del amor con su emblemática Torre Eiffel y su gastronomía gourmet.", "Imgs/Paris.jpg", 20, "activo", true),
            new Destino("Tokio, Japón", 2200, "Explora la cultura japonesa en la vibrante ciudad de Tokio, llena de tecnología y tradición.", "Imgs/Tokio.jpg", 5, "activo", false),
            new Destino("Bali, Indonesia", 1200, "Relájate en las playas paradisiacas de Bali y sumérgete en su rica cultura espiritual.", "Imgs/Bali.jpg", 35, "activo", true),
            new Destino("Nueva York, EE.UU", 1800, "Conoce la ciudad que nunca duerme, con sus rascacielos, parques y vida nocturna.", "Imgs/Nueva York.jpg", 25, "pausado", false),
            new Destino("El Cairo, Egipto", 1400, "Maravíllate con las pirámides y el misterio de la civilización egipcia.", "Imgs/El cairo.jpg", 0, "activo", true),
            new Destino("Roma, Italia", 1300, "Descubre la historia y la arquitectura de la antigua Roma, cuna de la civilización.", "Imgs/Roma.jpg", 30, "activo", false),
            new Destino("Sídney, Australia", 2500, "Experimenta las icónicas playas y la famosa Ópera de Sídney en Australia.", "Imgs/Sidney.jpg", 18, "pausado", false),
            new Destino("Ciudad del Cabo, Sudáfrica", 1600, "Aventúrate en los safaris y las costas escénicas de Ciudad del Cabo.", "Imgs/Ciudad del cabo.jpg", 12, "activo", true),
            new Destino("Machu Picchu, Perú", 1700, "Visita la legendaria ciudad inca en las alturas de los Andes peruanos.", "Imgs/Machu picchu.jpg", 8, "activo", false),
            new Destino("Bangkok, Tailandia", 1100, "Sumérgete en la vida vibrante y los mercados callejeros de Bangkok.", "Imgs/Bangkok.jpg", 40, "activo", true),
        ]

        this.reservas = [
            new Reserva("mperez_uruguay","París, Francia", 8, 12000, "aprobada", "Millas"),
            new Reserva("mperez_uruguay","Tokio, Japón", 5, 11000, "pendiente", "Millas"),
            new Reserva("srodriguez_uy","Bali, Indonesia", 12, 14400, "pendiente", "Dinero"),
            new Reserva("jgonzalez_uy","Nueva York, EE.UU.", 3, 5400, "cancelada", "Millas"),
            new Reserva("srodriguez_uy","El Cairo, Egipto", 6, 8400, "aprobada", "Dinero"),
            new Reserva("mperez_uruguay","El Cairo, Egipto", 6, 8400, "aprobada", "Dinero"),
            new Reserva("mperez_uruguay","Bali, Indonesia", 4, 4800, "aprobada", "Dinero"),
        ]
    }

//FUNCION QUE VALIDA QUE LA CLAVE INGRESADA CUMPLA CON LOS REQUISITOS, REGULAR EXPRESSION
claveEsValida(pClave) {
    let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/;
    return regex.test(pClave);
  }
  
formatoTarjeta(input) {
    // Elimina cualquier carácter que no sea un dígito
    const value = input.value.replace(/\D/g, '');
  
    // Agrega un guion después de cada grupo de 4 dígitos
    const agregarGuion = value
      .match(/.{1,4}/g)
      .join('-');
  
    // Actualiza el valor del campo de entrada con el formato deseado
    input.value = agregarGuion;
  
  }
  
ValidacionTarjeta(numeroTarjetaSinGuiones) {
    let tarjetaValida = true;
    if (numeroTarjetaSinGuiones.trim().length > 0 && !isNaN(numeroTarjetaSinGuiones)) {
      let valido = sistema.algoritmoLuhn(numeroTarjetaSinGuiones);
      if (valido) {
      } else {
        tarjetaValida = false;
      }
    } else {
      tarjetaValida = false;
    }
    return tarjetaValida;
  }
  
algoritmoLuhn(numeroTarjetaSinGuiones) {
    let suma = 0;
    let digitoVerificadorX = Number(numeroTarjetaSinGuiones.charAt(numeroTarjetaSinGuiones.length - 1));
    let contador = 0;
    let haynro = true;
    let i = numeroTarjetaSinGuiones.length - 2;
  
    while (i >= 0 && haynro) {
      let caracter = numeroTarjetaSinGuiones.charAt(i);
      if (!isNaN(caracter)) {
        let num = Number(caracter);
        if (contador % 2 == 0) {
          num = sistema.duplicarPar(num);
        }
        suma += num;
      } else {
        haynro = false;
        return haynro;
      }
      i--;
      contador++;
    }
    let digitoVerificadorValido = sistema.checkDigito(suma, digitoVerificadorX);
    let modulodelasumaValido = sistema.checkModulo(suma, digitoVerificadorX);
    return digitoVerificadorValido && modulodelasumaValido;
  
  }
  
duplicarPar(num) {
    num = num * 2;
    if (num > 9) {
      num = 1 + (num % 10);
    }
    return num;
  }
  
checkDigito(suma, digitoVerificadorX) {
    let total = 9 * suma;
    let ultimoNro = total % 10
    return ultimoNro === digitoVerificadorX;
  }
  
checkModulo(suma, digitoVerificadorX) {
    let total = suma + digitoVerificadorX;
    let validacionFinal = false;
    if (total % 10 === 0 && total !== 0) {
      validacionFinal = true;
    }
    return validacionFinal;
  }
  
existeUsuario(usuarioIngresoMinuscula, usuarioRegistroMinuscula) {
    for (let i = 0; i < sistema.administradores.length; i++) {
      if ((sistema.administradores[i].nombreDeUsuario).toLowerCase() == usuarioIngresoMinuscula || (sistema.administradores[i].nombreDeUsuario).toLowerCase() == usuarioRegistroMinuscula) {
        return true;
      }
  
    }
    for (let i = 0; i < sistema.clientes.length; i++) {
      if ((sistema.clientes[i].nombreDeUsuario).toLowerCase() == usuarioIngresoMinuscula || (sistema.clientes[i].nombreDeUsuario).toLowerCase() == usuarioRegistroMinuscula) {
        return true;
      }
    }
    return false;
  }
  
  
esAdministrador(usuarioIngresoMinuscula) {
    let esAdministrador = false;
    for (let i = 0; i < sistema.administradores.length; i++) {
      if (sistema.administradores[i].nombreDeUsuario == usuarioIngresoMinuscula) {
        esAdministrador = true;
        return esAdministrador;
      }
    }
  
    return esAdministrador;
  
  }
  
eliminarGuiones(tarjetaRegistro) {
    let resultado = "";
    for (let i = 0; i < tarjetaRegistro.length; i++) {
      if (tarjetaRegistro[i] !== '-') {
        resultado += tarjetaRegistro[i];
      }
    }
    return resultado;
  }
  
  
irAlMenuPrincipalAdministrador() {
    document.querySelector("#pantallaInicio").style.display = "none";
    document.querySelector("#pantallaPrincipalAdministradores").style.display = "block";
  }
  
irAlMenuPrincipalComprador() {
    document.querySelector("#pantallaInicio").style.display = "none";
    document.querySelector("#pantallaPrincipalClientes").style.display = "block";
  }
  



    
}






