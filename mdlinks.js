// function
export const determinarExistencia = (ruta) => {

}

export const mdLinks = (path, options) => { // modules.exports
    const existeRuta = determinarExistencia(ruta);
    if (existeRuta) {
        // algo
        const esAbsoluta = esAbsoluta(ruta);
        if (!esAbsoluta) {
            const nuevaRuta = convertirAbsoluta(ruta);
        }
        // leerArchivo(nuevaRuta) // async/then/callback ???
        // extraerLinks(contenido)

    }
    else {
        // esto
    }
}