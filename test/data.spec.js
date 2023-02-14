const { 
    verifyPathExists,
    validatePath,
    toAbsolutePath,
    pathValidation,
    pathIsFile,
    pathIsDirectory,
    mdFile,
    getMdFileArray,
    directoryContent } = require('../data.js');

const testRelativePath = '../archivos.md';
const testAbsolutePath = 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\resumenProyecto\\archivos.md';
const testFakePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos22.md';
const testTxtPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/text.txt';
const testOnlyFaq = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/lecturaComplementaria/faq.md';
const resultFaq = 'Para que el módulo sea instalable desde GitHub solo tiene que estar en un repo público de GitHub y contener un `package.json` válido';
const testDirectoryPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto';
const insideDirectory = ["archivos.md", "criteriosAceptacion", "objetivos", "opcionales.md"];
//Some languages use \ as an 'escape' character with special meaning. To get a single literal \ in Windows you need to write \\ 
const arrayPrueba = [
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
        ok: 'FAIL'
    },
    {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    }
]


// File Existence Validation
describe('Tests para validar si ruta existe', () => {

    it('should be a function', () => {
        expect(typeof verifyPathExists).toBe('function');
    });
  
    it('debe mostrar true si la ruta dada existe',  () => {
        const result = verifyPathExists(testAbsolutePath);
        expect(result).toEqual(true);
    });

    it('debe mostrar false si la ruta dada no existe',  () => {
        const result = verifyPathExists(testFakePath);
        expect(result).toEqual(false);
    });
}); 

// Absolute Path Validation
describe('Tests para validar si ruta es absoluta', () => {
  
    it('should be a function', () => {
        expect(typeof validatePath).toBe('function');
    });
  
    it('debe mostrar true si la ruta dada es absoluta',  () => {
        const result = validatePath(testAbsolutePath);
        expect(result).toEqual(true);
    });

    it('debe mostrar false si la ruta dada no es absoluta',  () => {
        const result = validatePath(testRelativePath);
        expect(result).toEqual(false);
    });  
});

// From Relative Path to Absolute Path 
describe('Tests para validar si ruta relativa es convertida en absoluta', () => {
  
    it('should be a function', () => {
        expect(typeof toAbsolutePath).toBe('function');
    });
  
    it('debe mostrar ruta absoluta si se le asigna la ruta relativa',  () => {
        const result = toAbsolutePath(testRelativePath);
        expect(result).toEqual(testAbsolutePath);
    });  
});

// Path Validation
describe('Tests para validar si es ruta relativa  y si es, se convierta en absoluta', () => {
  
    it('should be a function', () => {
        expect(typeof pathValidation).toBe('function');
    });
  
    it('debe mostrar ruta absoluta si se le asigna la ruta absoluta',  () => {
        const result = pathValidation(testAbsolutePath);
        expect(result).toEqual(testAbsolutePath);
    }); 

    it('debe mostrar ruta absoluta si se le asigna la ruta relativa',  () => {
        const result = pathValidation(testRelativePath);
        expect(result).toEqual(testAbsolutePath);
    });

});

// File Validation 
describe('Tests para validar si ruta corresponde a archivo', () => {

    it('should be a function', () => {
        expect(typeof pathIsFile).toBe('function');
    });
  
    it('debe mostrar true si la ruta corresponde a un archivo',  () => {
        const result = pathIsFile(testAbsolutePath);
        expect(result).toEqual(true);
    });  

    it('debe mostrar false si la ruta no corresponde a un archivo',  () => {
        const result = pathIsFile(testDirectoryPath);
        expect(result).toEqual(false);
    }); 
});

// Directory Validation 
describe('Tests para validar si ruta corresponde a directorio', () => {

    it('should be a function', () => {
        expect(typeof pathIsDirectory).toBe('function');
    });
  
    it('debe mostrar true si la ruta corresponde a un directorio',  () => {
        const result = pathIsDirectory(testDirectoryPath);
        expect(result).toEqual(true);
    });  

    it('debe mostrar false si la ruta no corresponde a un directorio',  () => {
        const result = pathIsDirectory(testAbsolutePath);
        expect(result).toEqual(false);
    }); 
});

// Looking for .md File
describe('Tests para obtener la extension de un archivo', () => {

    it('should be a function', () => {
        expect(typeof mdFile).toBe('function');
    });
  
    it('debe mostrar true si la ruta corresponde a un archivo md',  () => {
        const result = mdFile(testRelativePath);
        expect(result).toEqual(true);
    });  

    it('debe mostrar false si la ruta no corresponde a un archivo md',  () => {
        const result = mdFile(testTxtPath);
        expect(result).toEqual(false);
    }); 
});

// Reading directory
describe('Tests para obtener los archivos de un directorio', () => {

    it('should be a function', () => {
        expect(typeof directoryContent).toBe('function');
    });
  
    it('debe mostrar true si la ruta corresponde a un archivo md',  () => {
        const result = directoryContent(testDirectoryPath);
        expect(result).toEqual(insideDirectory);
    });  
});

