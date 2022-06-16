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
}


