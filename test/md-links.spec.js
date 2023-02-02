const mdLinks = require('../index.js');
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */


// Test de Validacion de Path 
describe('Tests para validar si ruta es absoluta', () => {
  const relativePath = './files/archive.md';
  const absolutePath = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/archive.md';
      
  it('debe validar que sea funcion', () => {
    expect(typeof validatePath).toBe('function');
  });

  it('debe mostrar false si la ruta dada no es absoluta',  () => {
    expect(validatePath(relativePath)).toEqual(false);
  });

  it('debe mostrar true si la ruta dada  es absoluta',  () => {
    expect(validatePath(absolutePath)).toEqual(true);
  });

});
