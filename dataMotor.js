/**
 * DATAMOTOR
 * 
 * Motor de control de almacenamiento de datos
 */

import {dbLocal} from './dbLocal.js';
import {dbWebSQL} from './dbWebSQL.js';


export class dataMotor{
    base;
    contenedores;
    drive;
    drivers=['dbLocal', 'dbWebSQL'];
    controlador;
    autoContenedor = false; //indica si se creara automaticamente un contenedor o no

    /**
     * 
     * @param {base, driver} params 
     */

    constructor( params ){
        if ( typeof params == 'undefined' ) params = {};
        if ( typeof params.base == 'undefined' ) params.base = 'dataMotor';
        if ( typeof params.driver == 'undefined' ) params.driver = 'dbLocal';

        this.base = params.base;

        if ( this.drivers.indexOf( params.driver ) != -1 ){
            this.driver = params.driver;

            try{
                eval ( 'this.controlador = new '+ params.driver +'();' );
            }catch(e){
                console.log(e);
                alert('dataMotor, encontro un error al construir el driver [ '+ params.driver + ' ]');
            }

            const me = this;
            this.loadContenedores(data=>{
                me.contenedores = data.res;
            });
        }else{
            alert('dataMotor, no reconoce el driver [ '+  params.driver +' ] ');
        }

    }


    /**Buscar y cargar contenedores segun el driver de this */
    loadContenedores(ret){
        this.controlador.loadContenedores(this.base, data=>{
            ret(data);
        });
    }

    /*
    *
    * @param {contenedor:string, reg: { ... }} param
    * @param {*} ret
    * 
    */

     create(param,ret){
        var retorno = {error: ''};

        if(typeof param == 'undefined') param = {};
        if(typeof param.contenedor == 'undefined') retorno.error = 'Es necesario definir un contenedor.';
        if(typeof param.reg == 'undefined') retorno.error = 'Se espera un registro.';

        if ( retorno.error == ''){
            //aqui debemos llamar a validar contenedor
            if( !this.validarContenedor ( param.contenedor ) )
                retorno.error = 'El contenedor que desea utilizar NO existe en esta base de datos [' + param.contenedor + ']';

            if( retorno.error == ''){
                param.base = this.base;
                this.controlador.create(param, data=>{
                    ret(data);
                })
            }else{
                ret(retorno);
            }
        }
     }

     //valida si un contenedor puede o no autocrearse
     validarContenedor(contenedor){
        let valido = true;

        if(this.autoContenedor == false){
            if(this.contenedores.indexOf( contenedor ) == -1){ //si NO existe en contenedores 
                valido = false;
            }
        }
        return valido;
     }

     //valida si un contenedor existe o no 

     existeContenedor(contenedor){
        let existe = false;
        if(this.contenedores.indexOf(contenedor) != -1) existe = true;
        return existe
     }

     createContenedor(contenedor, ret){
        let retorno = {error: ''};
        if( this.existeContenedor(contenedor)){
            retorno.error = 'Este contenedor existe, no puede volver a ser creado.';
            ret(retorno);
        }else{
            const me = this;
            this.controlador.createContenedor({contenedor:contenedor, base:this.base}, data =>{
                if(data.error == '') me.contenedores.push(contenedor);
                ret(data)
            })
        }

     }

}

