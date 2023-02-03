// const mdLinks = require('../index.js');
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
const { 
  validatePath,
  toAbsolutePath,
  pathIsFile,
  pathIsDirectory,
  mdFile,
  readFilePath,
  directoryContent } = require('../index.js');

const testRelativePath = '../archivos.md';
const testAbsolutePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos.md';
const testFakePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos.md';
const testTxtPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/text.txt';
const testDirectoryPath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto';
const testOnlyText = 'C:Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/lecturaComplementaria/faq.md';

// File Existence Validation
/* describe('Tests para validar si ruta existe', () => {
  
  it('debe mostrar true si la ruta dada existe',  () => {
    const result = verifyFileExists(testRelativePath);
    expect(result).toEqual(true);
  });

  it('debe mostrar false si la ruta dada no existe',  () => {
    const result = verifyFileExists(testFakePath);
    expect(result).toEqual(false);
  });
}); */

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
