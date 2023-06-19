import fs from 'fs';
import path from 'path';

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
    if (ruta.startsWith('/') || ruta.startsWith('\\') || path.isAbsolute(ruta)) {
      return ruta;
    } else {
      return path.resolve(ruta);
    }
  };

// Función para leer el contenido de un archivo //ASÍNCRONA PARA OBTENER VALOR DE RETORNO
export const leerArchivo = (ruta) => {
    return new Promise((resolve, reject) => {
      fs.readFile(ruta, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
  

// Función principal para extraer los enlaces de un archivo Markdown
export const mdLinks = (ruta) => {
    return new Promise((resolve, reject) => {
      determinarExistencia(ruta)
        .then((existeRuta) => {
          if (existeRuta) {
            let nuevaRuta = esAbsoluta(ruta);
            leerArchivo(nuevaRuta)
              .catch((err) => {
                console.log(err);
              })
              .then((contenido) => {
                // Procesa el contenido del archivo Markdown y extrae los enlaces
                const enlaces = extraerEnlaces(contenido);
  
                // Crea un array de objetos con la información de cada enlace
                const arrayDeEnlaces = enlaces.map((enlace) => {
                  return {
                    href: enlace.href,
                    text: enlace.text
                  };
                });
  
                // Devuelve el array de objetos de enlaces utilizando resolve
                resolve(arrayDeEnlaces);
              });
          }
        });
    });
  };

  const extraerEnlaces = (contenido) => {
    const enlaces = [];
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    let match;
  
    while ((match = regex.exec(contenido))) {
      const textoEnlace = match[1];
      const hrefEnlace = match[2];
  
      enlaces.push({ text: textoEnlace, href: hrefEnlace });
    }
  
    return enlaces;
  };
  
  export { extraerEnlaces };
  