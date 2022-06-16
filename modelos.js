/***Modelo de datos */
class modCliente{
    codigo;
    nombre;
    direccion;
    telefono;
}

class modBanco{
    banco_id; 
    nombre;
    observacion;
}

class modCuenta{
    cuenta_id;
    banco_id;
    numero;
}

class modChequeta{
    chequera_id; 
    cheques; //numero de queches en la chequera
    usados; //Numero de cheques utilizados
    banco_id;
    cuenta_id;
}

class modLugar{
    lugar_id;
    nombre;
}

class modCheque{
    cheque_id;
    chequera_id;
    numero;
    fecha;
    lugar_id;
    monto;
    nombre;
    concepto;
    estado;
}

export {modCliente, modBanco, modCuenta, modChequeta, modLugar, modCheque}