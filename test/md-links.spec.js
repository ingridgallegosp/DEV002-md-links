const { 
  verifyPathExists,
  validatePath,
  toAbsolutePath,
  pathValidation,
  pathIsFile,
  pathIsDirectory,
  mdFile,
  readingFile,
  getMdFileArray,
  getLinks,
  directoryContent } = require('../data.js');

const { mdLinks } = require('../index.js');

const testRelativePath = '../archivos.md';
const testAbsolutePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos.md';
const testFakePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos22.md';
const testTxtPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/text.txt';
const testOnlyFaq = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/lecturaComplementaria/faq.md';
const resultFaq = 'Para que el módulo sea instalable desde GitHub solo tiene que estar en un repo público de GitHub y contener un `package.json` válido';
const testDirectoryPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto';
const insideDirectory = ["archivos.md", "criteriosAceptacion", "objetivos", "opcionales.md"];

// File Existence Validation
describe('Tests para validar si ruta existe', () => {
  
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

// Test promesas reading file y get links


/* // Reading file - cambiar test- promesa
describe('Tests para obtener el contenido del archivo', () => {

  it('should be a function', () => {
    expect(typeof readingfile).toBe('function');
  });
  
  it('debe mostrar el texto del archivo',  () => {
    const result = readingfile(testOnlyFaq);
    expect(result).toEqual(resultFaq);
  });  
}); */


// TEST ASINCRONO CON UN FILE MD PARA VER SI ME DEVUELVE LOS LINKS Y DATOS QUE ESPERO


// mdLinks function
describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  /* it('should be return a promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */
  it('should reject a promise when path does not exist', () => {
    return(mdLinks('./noexuste.md')).catch((error) =>{
    expect(error).toBe('La ruta no existe')
    });
  });
});   
