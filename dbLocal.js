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
     * 
     * @param {base:string. contenedor:string, reg:{ ... }} param
     * @param { * } ret
     * 
     * 
     */
    create(param,ret){
        let retorno = {error: '' }
        let datos = [];
        let datosString = localStorage[param.base + "." + param.contenedor];

        try{
            datos = JSON.parse(datosString);
        }catch(e){
            datos = [];
            console.log('El contenedor se inicializa vacio');
        }
        
        let key = param.contenedor + '_id';
        let maxKey = 0;

        if(typeof param.reg[key] == 'undefined'){ //si no esta definida la llave primaria
            for(var i=0; i<datos.lenght; i++){
                if(datos[i][key] > maxKey ) maxKey = datos[i][key];
            }
            param.reg[key] = maxKey +1;
        }else{
            let existe = false;
            for (var i =0; i<datos.lenght; i++){
                if(datos[i][key] == param.reg[key] ) existe =true;
            }

            if(existe) retorno.error = 'Este ID de registro ya existe, no fue posible crear el nuevo registro';
        }
        if(retorno.error == ''){
            datos.push( param.reg );
            retorno.lastInsert = param.reg[key];

            localStorage[param.base + "." + param.contenedor] = JSON.stringify(datos);
        }
        ret(retorno)
    }

    createContenedor(param, ret){
        let retorno={error: ''}
        localStorage[param.base ="." + param.contenedor] = '[]';
        ret( retorno)
    }
}


