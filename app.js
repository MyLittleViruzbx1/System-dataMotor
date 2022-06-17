/** Chequetor 
 * 
 * Crear y asignar cheques a clientes registrados y clientes eventatuales
 * Llevar el control de cheques por estados
 *      - Por emitir
 *      - Emitido
 *      - Anulado
 *      - Cobrado
 */

import { modCliente }  from './modelos.js';
import './modelos.js'
import {dataMotor} from './dataMotor.js';
//import { dataMotor } from './dataMotor.js'; //importa el motor de almacenamiento
// Base    ----> identificador de la app
//   contenedores  ----> equivalente a tabla y almacen, agrupa registros del  mismo tipo
//       registros  ---> campos de informacion

const motor = new dataMotor({base:'chk', driver:'dbLocal'});
global.motor = motor;
// console.log(motor);

motor.autoContenedor = false;

console.log( motor.contenedores );
