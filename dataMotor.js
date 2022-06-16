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

}

