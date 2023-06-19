import { determinarExistencia, esAbsoluta, leerArchivo, mdLinks } from './mdlinks.js';
import path from 'path';

describe('determinarExistencia', () => {
    it('debería retornar true si la ruta existe', () => {
        return determinarExistencia('./ejemplo.md')
            .then((result) => {
                expect(result).toBe(true);
            });
    });

    it('debería retornar false si la ruta no existe', () => {
        return determinarExistencia('./ruta/inexistente')
            .then((result) => {
                expect(result).toBe(false);
            });
    });
});

describe('esAbsoluta', () => {
    it('debería retornar la misma ruta si ya es absoluta', () => {
        const ruta = '/ejemplo.md';
        const resultado = esAbsoluta(ruta);
        expect(resultado).toBe(ruta);
      }); 

    it('debería retornar la ruta absoluta si es relativa', () => {
        const ruta = './ruta/relativa';
        const resultado = esAbsoluta(ruta);
        const rutaAbsolutaEsperada = path.resolve(ruta);
        expect(resultado).toBe(rutaAbsolutaEsperada);
    });
});

describe('leerArchivo', () => {
    it('debería leer el contenido de un archivo', () => {
        const ruta = './ejemplo.md';
        return leerArchivo(ruta)
            .then((contenido) => {
                expect(contenido).toBeDefined();
            });
    });

    it('debería rechazar la promesa si ocurre un error al leer el archivo', () => {
        const ruta = './ruta/archivoInexistente.md';
        return leerArchivo(ruta)
            .catch((error) => {
                expect(error).toBeDefined();
            });
    });
});

describe('mdLinks', () => {
    it('debería retornar un array de objetos con los enlaces encontrados en el archivo Markdown', () => {
        const ruta = './ejemplo.md';
        return mdLinks(ruta)
            .then((enlaces) => {
                expect(enlaces).toBeDefined();
                expect(Array.isArray(enlaces)).toBe(true);
            });
    });
});

it('should resolve with response', async () => {
    const response = await mdLinks('mdlinks.js');
    console.log(response, 'response');
    // Resto de las aserciones
  });
  
  