import fs from 'fs'; // Importa el módulo fs para trabajar con el sistema de archivos
import path from 'path'; // Importa el módulo path para manipular rutas de archivos

// Función para determinar si una ruta existe
export const determinarExistencia = (ruta) => { // Define una función llamada determinarExistencia que toma una ruta como parámetro
    return new Promise((resolve) => { // Retorna una nueva promesa
        fs.access(ruta, fs.constants.F_OK, (error) => { // Verifica si la ruta existe utilizando fs.access
            resolve(!error); // Resuelve la promesa con un valor booleano que indica si la ruta existe o no
        });
    });
};

// Función para verificar si una ruta es absoluta
export const esAbsoluta = (ruta) => { // Define una función llamada esAbsoluta que toma una ruta como parámetro
    if (ruta.startsWith('/') || ruta.startsWith('\\') || path.isAbsolute(ruta)) { // Verifica si la ruta es absoluta
        return ruta; // Si es absoluta, devuelve la misma ruta
    } else {
        return path.resolve(ruta); // Si no es absoluta, resuelve la ruta relativa y la devuelve
    }
};

// Función para leer el contenido de un archivo // ASÍNCRONA PARA OBTENER VALOR DE RETORNO
export const leerArchivo = (ruta) => { // Define una función llamada leerArchivo que toma una ruta como parámetro
    return new Promise((resolve, reject) => { // Retorna una nueva promesa
        fs.readFile(ruta, 'utf8', (err, data) => { // Lee el contenido del archivo utilizando fs.readFile
            if (err) { // Si ocurre un error, rechaza la promesa con el error
                reject(err);
            } else { // Si no hay errores, resuelve la promesa con el contenido del archivo
                resolve(data);
            }
        });
    });
};

// Función para extraer enlaces de un contenido de archivo Markdown
export const extraerEnlaces = (contenido) => { // Define una función llamada extraerEnlaces que toma el contenido como parámetro
    const enlaces = []; // Crea un array para almacenar los enlaces encontrados
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g; // Define una expresión regular para buscar el patrón de enlaces en el contenido
    let match; // Variable para almacenar los resultados de las coincidencias de la expresión regular

    while ((match = regex.exec(contenido))) { // Busca todas las coincidencias de enlaces en el contenido utilizando un bucle while
        const textoEnlace = match[1]; // Obtiene el texto del enlace de la coincidencia
        const hrefEnlace = match[2]; // Obtiene la URL del enlace de la coincidencia

        enlaces.push({ text: textoEnlace, href: hrefEnlace }); // Agrega el enlace al array de enlaces
    }

    return enlaces; // Retorna el array de enlaces
};

export const mdLinks = async (ruta) => { // Declaración de la función mdLinks que recibe una ruta
    try { // Inicio del bloque try-catch para manejar errores
        const existeRuta = await determinarExistencia(ruta); // Verifica si la ruta existe
        // console.log('existeRuta:', existeRuta); // Imprime en la consola el resultado de la verificación de existencia de la ruta

        if (existeRuta) { // Si la ruta existe
            const nuevaRuta = esAbsoluta(ruta); // Convierte la ruta en absoluta
            //  console.log('nuevaRuta:', nuevaRuta); // Imprime en la consola la ruta absoluta

            const contenido = await leerArchivo(nuevaRuta); // Lee el contenido del archivo en la nueva ruta
            //  console.log('contenido:', contenido); // Imprime en la consola el contenido del archivo

            const enlaces = extraerEnlaces(contenido); // Extrae los enlaces del contenido del archivo
            //  console.log('enlaces:', enlaces); // Imprime en la consola los enlaces encontrados

            const arrayDeEnlaces = enlaces.map((enlace) => ({ // Crea un nuevo array de enlaces
                href: enlace.href, // Propiedad href del enlace
                text: enlace.text, // Propiedad text del enlace
                file: nuevaRuta // Agrega la propiedad file con el valor de la nuevaRuta
            }));
            //   console.log('arrayDeEnlaces:', arrayDeEnlaces); // Imprime en la consola el array de enlaces

            return arrayDeEnlaces; // Devuelve el array de enlaces
        } else {
            return []; // Si la ruta no existe, devuelve un array vacío
        }
    } catch (error) { // Captura y manejo de errores
        throw error; // Lanza el error para ser manejado externamente
    }
};
