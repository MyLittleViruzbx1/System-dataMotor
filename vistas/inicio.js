import {cargarVista} from '../vista.js';

const navMenu = document.querySelector('#menuPrincipal');
//BANCOS
const mnBanco = document.createElement('button');
mnBanco.innerHTML = 'Bancos';
mnBanco.onclick = () => {
    cargarVista('banco', '#pantalla')
}
//CLIENTES
const mnCliente = document.createElement('button');
mnCliente.innerHTML = 'Cliente';
mnCliente.onclick = () => {
    cargarVista('cliente', '#pantalla')
}
//CHEQUES
const mnCheque = document.createElement('button');
mnCheque.innerHTML = 'Cheque';
mnCheque.onclick = () => {
    cargarVista('cheque', '#pantalla');
}

navMenu.append(mnBanco, mnCliente, mnCheque);