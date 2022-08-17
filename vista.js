export function cargarVista(vista, destino='#cuerpo'){
    fetch(`vistas/${vista}.html`)
    .then(res=>{
        res.text()
        .then(data=>{
            // document.querySelector(destino).insertAdjacentHTML("afterend", data);
            let destinos = document.querySelectorAll(destino)
            for (var i=0; i<destinos.length; i++)
                destinos[i].innerHTML= data;

            let js = document.head.querySelectorAll('script') ;

            // let existe=false;
            for (var i=0; i<js.length; i++){
                let diagonal = js[i].src.lastIndexOf('/');
                let nombre = js[i].src.substring(diagonal+1);
                if (nombre == vista + '.js') js[i].remove();
            }

            // if (!existe) {
                const miScript = document.createElement('SCRIPT');
                miScript.src = `vistas/${vista}.js`;
                miScript.type = 'module';
                document.head.append(miScript);
                miScript.onload = () => {
                    console.log(miScript.init)

                    if(typeof miScript.init != 'undefined') miScript.init();
                }
            // }

          
            let sass = document.head.querySelectorAll('link');

            for(var s = 0; s<sass.length; s++){
                let diagonal = sass[s].href.lastIndexOf('/');
                let nombre = sass[s].href.substring(diagonal+1);
                if (nombre == vista + '.css') sass[s].remove();
            }

            const miCss = document.createElement('LINK');
            miCss.href = `vistas/${vista}.css`;
            miCss.rel = 'stylesheet';
            document.head.append(miCss);
            //fin
        })
    })
}