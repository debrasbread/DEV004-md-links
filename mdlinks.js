import fs from 'fs';
import path from 'path';
// import marked from 'marked';

// Función para determinar si una ruta existe 
export const determinarExistencia = (ruta) => {
  return new Promise((resolve) => {
    fs.access(ruta, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
};

// Función para verificar si una ruta es absoluta 
export const esAbsoluta = (ruta) => {
    if(path.isAbsolute(ruta)){
        return ruta
    }else{
return path.resolve(ruta);
    }
    
}

// Función para leer el contenido de un archivo //ASÍNCRONA PARA OBTENER VALOR DE RETORNO
export const leerArchivo = (ruta) => {
   
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err)
         
        }
        resolve(data);
      });
      
  });
};

// Función principal para extraer los enlaces de un archivo Markdown
export const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    determinarExistencia(ruta)
    .then((existeRuta)=>{
        if (existeRuta) {
            let nuevaRuta = esAbsoluta(ruta)
            leerArchivo(nuevaRuta)
           .catch((err)=>{console.log(err);})
            .then((contenido)=>{ console.log(contenido);})
            
        }
    })
     
  });
};
