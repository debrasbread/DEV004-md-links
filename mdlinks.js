import fs from 'fs';
import path from 'path';
import marked from 'marked';

// Función para determinar si una ruta existe
export const determinarExistencia = (ruta) => {
  return fs.existsSync(ruta);
};

// Función para verificar si una ruta es absoluta
export const esAbsoluta = (ruta) => {
  return path.isAbsolute(ruta);
};

// Función para convertir una ruta relativa en absoluta
export const convertirAbsoluta = (rutaRelativa) => {
  return path.resolve(rutaRelativa);
};


// Función para leer el contenido de un archivo
export const leerArchivo = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (error, contenido) => {
      if (error) {
        reject(error);
      } else {
        resolve(contenido);
      }
    });
  });
};

/*
// Función principal para extraer los enlaces de un archivo Markdown
export const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    const existeRuta = determinarExistencia(ruta);
    if (existeRuta) {
      const esAbsolutaRuta = esAbsoluta(ruta);
      let nuevaRuta = ruta;
      if (!esAbsolutaRuta) {
        nuevaRuta = convertirAbsoluta(ruta);
      }
      leerArchivo(nuevaRuta)
        .then((contenido) => {
          const links = [];
          const renderer = new marked.Renderer();

          renderer.link = (href, title, text) => {
            links.push({
              href,
              title: title || '',
              text,
              file: nuevaRuta,
            });
          };

          marked(contenido, { renderer });

          resolve(links);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error(`La ruta "${ruta}" no existe.`));
    }
  });
};

*/