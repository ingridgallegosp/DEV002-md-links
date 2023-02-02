// const mdLinks = require('../index.js');
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
const { validatePath, toAbsolutePath } = require('../index.js');

const testRelativePath = './files/archive.md';
const testAbsolutePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/archive.md';
const testFakePath = './files/archive22.md';

/* // File Existence Validation
describe('Tests para validar si ruta existe', () => {
  
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