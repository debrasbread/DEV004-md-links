import fs from 'fs';
import path from 'path';
import { determinarExistencia, esAbsoluta, leerArchivo, extraerEnlaces, mdLinks } from './mdlinks';

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
  it('debería leer el contenido de un archivo', async () => {
    const ruta = './ejemplo.md';
    const contenido = await leerArchivo(ruta);
    expect(contenido).toBeDefined();
  });

  it('debería rechazar la promesa si ocurre un error al leer el archivo', async () => {
    const ruta = './ruta/archivoInexistente.md';
    await expect(leerArchivo(ruta)).rejects.toThrow();
  });
});

describe('extraerEnlaces', () => {
  it('debería retornar un array de enlaces', () => {
    const contenido = `
      [Markdown](https://es.wikipedia.org/wiki/Markdown)
      [Node.js](https://nodejs.org/)
      [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/)
    `;

    const enlaces = extraerEnlaces(contenido);

    expect(Array.isArray(enlaces)).toBe(true);
    expect(enlaces.length).toBe(3);
    expect(enlaces[0]).toEqual({ text: 'Markdown', href: 'https://es.wikipedia.org/wiki/Markdown' });
    expect(enlaces[1]).toEqual({ text: 'Node.js', href: 'https://nodejs.org/' });
    expect(enlaces[2]).toEqual({ text: 'motor de JavaScript V8 de Chrome', href: 'https://developers.google.com/v8/' });
  });

  it('debería retornar un array vacío si no se encuentran enlaces', () => {
    const contenido = 'Este es un texto sin enlaces';
    const enlaces = extraerEnlaces(contenido);

    expect(Array.isArray(enlaces)).toBe(true);
    expect(enlaces.length).toBe(0);
  });
});

describe('mdLinks', () => {
    it('debería retornar un array de objetos con los enlaces encontrados en el archivo Markdown', async () => {
      const ruta = './ejemplo.md';
      const enlaces = await mdLinks(ruta);
  
      expect(Array.isArray(enlaces)).toBe(true);
      expect(enlaces.length).toBe(3);
      expect(enlaces[0]).toHaveProperty('text', 'Markdown');
      expect(enlaces[0]).toHaveProperty('href', 'https://es.wikipedia.org/wiki/Markdown');
      // ... Continuar con las aserciones para el resto de los enlaces
    });
  
    it('debería retornar un array vacío si no se encuentran enlaces', async () => {
      const ruta = './archivoSinEnlaces.md';
      const enlaces = await mdLinks(ruta);
  
      expect(Array.isArray(enlaces)).toBe(true);
      expect(enlaces.length).toBe(0);
    });
  });
  