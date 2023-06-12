import { mdLinks } from './mdlinks.js';
// import { determinarExistencia } from './mdlinks.js';


describe('determinarExistencia', () => {
    it('debería retornar que no existe', () => {
       // determinarExistencia(...)
    })
})

it('debería retornar que sí existe', () => {
   // determinarExistencia(...)
})

// Probar funciones que RETORNAN PROMESAS (funciones asíncronas)

/*
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
*/

describe('mdLinks', () => {
    it('mdLinks procesa un solo archivo con 3 links sin validar', () => {
        const ruta = 'ejemplo.md';
        return mdLinks(ruta, { validate: false }) // Le digo que no valide. Es muy importante el return
            .then((array) => {
                expect(array).toEqual([
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
                    }
                ]); // Expect debe estar dentro de un then (es la promesa). La promesa se resuelve con el arreglo de objetos (3 links): url, texto y archivo
            });
    });
});

