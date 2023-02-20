const { mdLinks } = require('../index.js');

const testRelativePath = './files/archive.md';
const vacioPath = './files/empty.md';
const noExistePath = './files/noexiste.md';
const testRelativeDir = './files/';
const resultadoArchiveStats = { total: 5, unique: 3 }
const resultadoArchiveValidateStats = { total: 5, unique: 3, broken: 2 }
const resultArchive = [
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown0',
        text: 'Markdown-roto',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown0',
        text: 'Markdown-roto2',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    }
]
const resultadoArchiveValidate = [
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        statusCode: 200,
        msg: 'OK'
    },
    {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        statusCode: 200,
        msg: 'OK'
    },
    {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        statusCode: 200,
        msg: 'OK'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown0',
        text: 'Markdown-roto',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        statusCode: 404,
        msg: 'FAIL'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown0',
        text: 'Markdown-roto2',
        file: 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        statusCode: 404,
        msg: 'FAIL'
    }
]

// mdLinks Function
describe('mdLinks', () => {

    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    }); 

    it('should return a promise', () => {
        return mdLinks(testRelativePath)
            .then(() => {
                expect(mdLinks).toBe(typeof Promise);
            }) 
            .catch((error) => {error});
    }); 
    // Archive Path
    it('mostrar links obtenidos si se asigna un path de archivo', () => {
        const resultado = mdLinks(testRelativePath)
        expect(resultado).resolves.toEqual(resultArchive);
    });
    
    // Archive Path + --validate
    it('mostrar links obtenidos si se asigna un path de archivo y la opcion --validate', () => {
        const resultado = mdLinks(testRelativePath, '--validate')
        expect(resultado).resolves.toEqual(resultadoArchiveValidate);
    }); 

    // Archive Path + --stats
    it('mostrar links obtenidos si se asigna un path de archivo y la opcion --stats', () => {
        const resultado = mdLinks(testRelativePath, '--stats')
        expect(resultado).resolves.toEqual(resultadoArchiveStats);
    }); 

    // Archive Path + --validate --stats
    it('mostrar links obtenidos si se asigna un path de archivo y la opcion --validate --stats', () => {
        const resultado = mdLinks(testRelativePath, '--validate', '--stats')
        expect(resultado).resolves.toEqual(resultadoArchiveValidateStats);
    }); 

    // mdlinks con path sin links
    it('mostrar links obtenidos si se asigna un path de directorio', () => {
        const resultado = mdLinks(vacioPath)
        expect(resultado).rejects.toEqual('No hay archivos extension .md');
    }); 

    // mdlinks con path que no existe
    it('mostrar links obtenidos si se asigna un path de directorio', () => {
        const resultado = mdLinks(noExistePath)
        expect(resultado).rejects.toEqual('La ruta NO existe');
    }); 

    // Dir Path
    it('mostrar links obtenidos si se asigna un path de directorio', () => {
        const resultado = mdLinks(testRelativeDir)
        expect(resultado).resolves.toEqual(resultArchive);
    });

});