export class dbWebSQL{

    loadContenedores(base, ret){
        let retorno ={
            error:'', 
            info:'hola soy websql usando ' + base
        };
        ret ( retorno );
    }
}