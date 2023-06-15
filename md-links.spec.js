import { determinarExistencia, esAbsoluta, leerArchivo, mdLinks } from './mdlinks.js';

describe('determinarExistencia', () => {
  it('debería retornar true si la ruta existe', () => {
    return determinarExistencia('./ruta/existente')
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
    const ruta = '/ruta/absoluta';
    const resultado = esAbsoluta(ruta);
    expect(resultado).toBe(ruta);
  });

  it('debería retornar la ruta absoluta si es relativa', () => {
    const ruta = './ruta/relativa';
    const resultado = esAbsoluta(ruta);
    const rutaAbsolutaEsperada = '/ruta/absoluta/ruta/relativa'; // Reemplaza con la ruta absoluta correcta
    expect(resultado).toBe(rutaAbsolutaEsperada);
  });
});

describe('leerArchivo', () => {
  it('debería leer el contenido de un archivo', () => {
    const ruta = './ruta/archivo.md';
    return leerArchivo(ruta)
      .then((contenido) => {
        // Realiza las aserciones correspondientes al contenido del archivo
        expect(contenido).toBeDefined();
      });
  });

  it('debería rechazar la promesa si ocurre un error al leer el archivo', () => {
    const ruta = './ruta/archivoInexistente.md';
    return leerArchivo(ruta)
      .catch((error) => {
        // Realiza las aserciones correspondientes al error
        expect(error).toBeDefined();
      });
  });
});

describe('mdLinks', () => {
  it('debería retornar un array de objetos con los enlaces encontrados en el archivo Markdown', () => {
    const ruta = './ruta/archivo.md';
    return mdLinks(ruta)
      .then((enlaces) => {
        // Realiza las aserciones correspondientes a los enlaces encontrados
        expect(enlaces).toBeDefined();
        expect(Array.isArray(enlaces)).toBe(true);
      });
  });
});
