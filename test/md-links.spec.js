
const { mdLinks } = require('../index.js');
const { readingFile, getLinks } = require('../data.js');

const testOnlyFaq = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/lecturaComplementaria/faq.md';
const resultFaq = 'Para que el módulo sea instalable desde GitHub solo tiene que estar en un repo público de GitHub y contener un `package.json` válido';

// readingFile function
jest.mock('../data.js', () => ({
    readingFile:jest.fn((givenPath) => {
        if (!givenPath) {
            throw new Error('No has ingresado un path');
        }
        Promise.resolve( resultFaq )
    })
}));

describe('readingFile es funcion', () => { 

    it('should be a function', () => {
        expect(typeof readingFile).toBe('function');
    });

    it('debe mostrar error si no hay un path', () => {
        return readingFile('').catch ((error) =>{
            expect(error.message).toEqual('No has ingresado un path');
        });
    });

    it('debe mostrar el contenido si se asigna un path', () => {
        return readingFile(testOnlyFaq).then((data) =>{
            expect(data).toEqual(resultFaq);
        });
    });
});

// getLinks function


// mdLinks Function

jest.mock('../index.js', () => ({
    mdLinks:jest.fn(),
}));


describe('mdLinks', () => {

    it('should...', () => {
        console.log('FIX ME!');
    });

    it('should be return a promise', () => {
        expect(mdLinks).toBe(typeof Promise);
    }); 

    it('should be return a promise', () => {
        expect(typeof mdLinks).toBe('function');
    }); 

    it('should reject a promise when path does not exist', () => {
        return(mdLinks('./noexuste.md')).catch((error) =>{
            expect(error).toBe('La ruta no existe')
        });
    });
});  
