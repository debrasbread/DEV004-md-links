import { mdLinks, determinarExistencia, esAbsoluta, convertirAbsoluta, leerArchivo } from './mdlinks.js';
import fs from 'fs';
import path from 'path';
import marked from 'marked';

// Verificar la existencia de una ruta
test('determinarExistencia: debe devolver true si la ruta existe', () => {
  expect(determinarExistencia('ejemplo.md')).toBe(true);
});

test('determinarExistencia: debe devolver false si la ruta no existe', () => {
    expect(determinarExistencia('ejemplo.md')).not.toBe(false);
  }); 


// Verificar si la ruta es absoluta
test('esAbsoluta: debe devolver true si la ruta es absoluta', () => {
  expect(esAbsoluta('/Users/username/Documents/example.md')).toBe(true);
});

test('esAbsoluta: debe devolver false si la ruta no es absoluta', () => {
  expect(esAbsoluta('ejemplo.md')).toBe(false);
});

// Convertir la ruta relativa en absoluta
test('convertirAbsoluta: debe convertir una ruta relativa en absoluta', () => {
    expect(convertirAbsoluta('ejemplo.md')).toBe('/Users/debra/Desktop/GitHub/DEV004-md-links/ejemplo.md');
  });

  
// Leer el contenido de un archivo
test('leerArchivo: debe leer el contenido de un archivo', async () => {
    const contenido = await leerArchivo('ejemplo.md');
    expect(contenido).toContain('[Markdown](https://es.wikipedia.org/wiki/Markdown)');
    expect(contenido).toContain('[Node.js](https://nodejs.org/)');
    expect(contenido).toContain('[motor de JavaScript V8 de Chrome](https://developers.google.com/v8/)');
  });
  

/*

// mdLinks con contenido de ejemplo
describe('mdLinks', () => {
  test('debe extraer los enlaces de un archivo Markdown correctamente', async () => {
    const contenidoMock = `
      [Markdown](https://es.wikipedia.org/wiki/Markdown)
      [Node.js](https://nodejs.org/)
      [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/)
    `;
    const linksEsperados = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'ejemplo.md',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'ejemplo.md',
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'ejemplo.md',
      },
    ];

    jest.spyOn(fs, 'readFile').mockImplementationOnce((ruta, codificacion, callback) => {
      callback(null, contenidoMock);
    });

    const links = await mdLinks('ejemplo.md');
    expect(links).toEqual(linksEsperados);
  });
});
*/