import { modBanco } from "../modelos.js";
import {dataMotor} from "../dataMotor.js"


const nameBank = document.getElementById('nameBank');
const nameDrive = document.getElementById('nameDrive');
const btnAnadir = document.getElementById('btnAnadir');


const db = new dataMotor({base:global.base, driver: global.baseDriver});


function btnBoton(){   
    if(nameBank.value.trim() == '' || nameDrive.value.trim() == ''){
        alert('Los campos estan vacion llenelos perro :v');
        return;
    }
    /*
        1. almacenar datos 
        2. mostrarlos en la tabla
            2.1 construir una fila
            2.2 agregar logica  
    */

//    1. almacenando datos
const existe = db.existeContenedor('banco');
    const myBanco = new modBanco();
    myBanco.nombre=nameBank.value;
    myBanco.observacion = nameDrive.value;

    if(!existe){
        db.createContenedor('banco',( data ) => {
            console.log(data)
            // llamar a paso: 1.1 (continuacion) 
            addLinea(myBanco);  
        })
    }else{
        // llamar a paso: 1.1 (continuacion)
         addLinea(myBanco)
    }


}

    // agrega un registro a dataMotor
function addLinea(myBanco){
    if(global.debug >= 1)console.log('llamando a crear lineas en dataMotor');
    db.createRegistro({ contenedor: 'banco', reg: myBanco}, data =>{
        if(global.debug >= 2)console.log('regresando de crear lineas en dataMotor');
        console.log(data);

        if(data.error != '') alert(data.error);
        else{

            mostrarEnTabla(data.lastInsert,myBanco.nombre, myBanco.observacion);
        }
    })
}

    function mostrarEnTabla(id, nombre, observacion) {
        const tablaMostrar = document.getElementById('tablaMostrar');
        const row = tablaMostrar.insertRow();
        
           let tbody = document.createElement('tbody');

            tablaMostrar.appendChild(tbody);

            // document.getElementById('body').appendChild(table);
        
        row.innerHTML = `

        <td>${id}</td>
        <td>${nombre}</td>
        <td>${observacion}</td>
        
        
        `
    }


btnAnadir.onclick = () => {
    btnBoton();
}


const cargarLocal = () =>{

    db.readRegistro({contenedor:'banco'}, data => {
        console.log(data)
        if(data.error != '') alert(data.error);
        else{
            for(var i=0; i<data.res.length; i++){
                let item = data.res[i];
                mostrarEnTabla(item.banco_id, item.nombre, item.observacion)
            }
        } 
    }) 


}

export function init(){
    cargarLocal();
}

console.log('ya cargue')