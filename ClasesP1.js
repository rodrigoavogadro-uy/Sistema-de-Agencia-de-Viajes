class Cliente {
   static idCliente = 1;
    constructor(nombre, apellido, nombreDeUsuario, contraseña, tarjeta, cvc, dinero, millas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreDeUsuario = nombreDeUsuario;
        this.contraseña = contraseña
        this.tarjeta = tarjeta
        this.cvc = cvc
        this.dinero = dinero
        this.millas = millas
        this.id = Cliente.idCliente
        Cliente.idCliente++;
    }
}

class Administrador {
    constructor(nombreDeUsuario, contraseña) {
        this.nombreDeUsuario = nombreDeUsuario;
        this.contraseña = contraseña
    }
}


class Destino {
    static idDestino = 1;
    constructor(nombreDestino, precioDestino, descripcionDestino, imagenDestino, cuposDestino, estadoDestino, ofertaDestino) {
        this.nombreDestino = nombreDestino;
        this.precioDestino = precioDestino
        this.descripcionDestino = descripcionDestino;
        this.imagenDestino = imagenDestino
        this.cuposDestino = cuposDestino;
        this.estadoDestino = estadoDestino
        this.ofertaDestino = ofertaDestino;
        this.id = `DEST_ID_${Destino.idDestino}`
        Destino.idDestino++;
    }
}



class Reserva {
    constructor(nombreCliente, nombreDestino, personasReservadas, montoTotalReserva, estadoReserva, formaDePago){
        this.nombreCliente = nombreCliente;
        this.nombreDestino = nombreDestino;
        this.personasReservadas = personasReservadas;
        this.montoTotalReserva = montoTotalReserva;
        this.estadoReserva = estadoReserva
        this.formaDePago = formaDePago;
    }
}
