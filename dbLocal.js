/**
 * Controlador de datos para localStorage
 */

 export class dbLocal{
    
    constructor(){}

    loadContenedores(base, ret){
        var retorno={error:'', res:[]};

        for(var key in localStorage){
            let punto = key.indexOf('.');

            if ( punto != -1){
                let prefijo = key.substring( 0, punto );
        
                if ( prefijo == base ){
                    retorno.res.push( key.substring( punto + 1 ) );
                }
            }
        }

        ret(retorno);
    }


    /**
     * CREAR UN REGISTRO
     * @param {base:string, contenedor:string, reg:{ ... }} param 
     * @param {*} ret 
     */
     createRegistro(param, ret){
        let retorno = {error:''}
        let datos = [];
        let datosString = localStorage[param.base + "." + param.contenedor];

        try{
            datos = JSON.parse(datosString); 
        }catch(e){
            datos=[];
            console.log( 'El contenedor se inicializa vacio.' );
        }
  
        let key = param.contenedor + '_id';
        let maxKey = 0;

        if ( typeof param.reg[ key ]  == 'undefined'  || param.reg[ key ] == 0){ //si no esta definida llave primaria
            for( var i=0; i<datos.length; i++){
                if ( datos[i][key] > maxKey  ) maxKey = datos[i][key];
            }
            param.reg[key] = maxKey +1;
        }else{ //si enviaron una key en el registro
            let existe = false;
            for ( var i=0; i< datos.length; i++){
                if ( datos[i][key] == param.reg[key] ) existe = true;
            }

            if ( existe ) retorno.error = 'Este ID de registro ya existe, no fue posible crear el nuevo registro.';
        }

        if (retorno.error == ''){
            datos.push( param.reg );
            retorno.lastInsert = param.reg[key];
    
            localStorage[param.base + "." + param.contenedor] = JSON.stringify(datos);
        }

        ret(retorno)
     }

     /*Crear contenedor*/
     createContenedor(param, ret){
        let retorno={error:''}
        localStorage[param.base + "." + param.contenedor] ='[]';
        ret( retorno )
    }


    /**
     * Read o lectura de registros
     * @param {base:string, contenedor:string, evaluar: [ criterio ]} param 
     * @param {*} ret
     * 
     * un criterio:
     * {campo:'alumno_id', operador:'=', valor:'8'}  
     */
     readRegistro(param, ret){
        ret( this.find(param, 0) );
    }

    deleteRegistro(param, ret){
        let nDatos = this.find(param, 1);
        if (nDatos.error == '')
            localStorage[ param.base + '.' + param.contenedor ] = JSON.stringify(nDatos.res);
        ret ({error:nDatos.error});
    }

    updateRegistro(param, ret){
        let nDatos = this.find(param, 2);
        if (nDatos.error == '')
            localStorage[ param.base + '.' + param.contenedor ] = JSON.stringify(nDatos.res);
        ret ({error:nDatos.error});
    }


    //Tipo 0=leer, 1=borrar, 2= atcualizar
    find(param, tipo){
        let retorno ={error:''};
        if ( typeof param.evaluar == 'undefined') param.evaluar = [];
            
        let datos = JSON.parse( localStorage[param.base + "." + param.contenedor] );
    
        //Recorremos todos los criterios del parametro evaluar
        for (var e=0; e<param.evaluar.length; e++){
            let valido = true;
            let criterio = param.evaluar[e];
            if ( typeof criterio.campo == 'undefined') valido =false;
            if ( typeof criterio.operador == 'undefined') valido =false;
            if ( typeof criterio.valor == 'undefined') valido =false;
    
            if (valido){
                //revisar la data
                for (var i=datos.length-1; i>-1; i--){
                    if ( criterio.operador == '=' ) criterio.operador = '==';
                    if ( criterio.operador == '<>' ) criterio.operador = '!=';
                    
                    let cadena = datos[i][ criterio.campo ] +criterio.operador +criterio.valor;
                    let resultado;
                    eval ('resultado = ' + cadena  + ';');
                    if ( tipo == 0 ) if (!resultado ) datos.splice(i, 1); //borra todos los registros que NO cumplen con el criterio
                    if ( tipo == 1 ) if ( resultado ) datos.splice(i, 1); // Borra todos los reg. que SI cumplen con el criterio
                    if ( tipo == 2 ) if ( resultado ) { //modifica todos los registros que SI complan con el criterio
                        for (var k in param.reg){ //recorriendo cada propiedad del reg que viene en param
                            if (typeof datos[i][k] != 'undefined')
                                datos[i][k] = param.reg[k]; //en datos, en el dato que corresponde sobre escribo el nuevo dato que viene en reg
                            else
                                retorno.error = 'No se realizo ninguna actualizacion porque el campo no existe.';
                        }
                    }
                }
            }
        }

        retorno.res = datos;
        return retorno;
    }


}
