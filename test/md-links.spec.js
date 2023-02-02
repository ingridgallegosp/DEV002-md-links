const mdLinks = require('../index.js');
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */


// Test de Validacion de Path 
describe('Tests para validar si ruta es absoluta', () => {
  const relativePath = './files/archive.md';
  const absolutePath = './files/archive.md';
      
  it('debe validar que sea funcion', () => {
    expect(typeof validatePath).toBe('function');
  });

  it('debe mostrar true si la ruta dada  es absoluta',  () => {
    expect(validatePath(absolutePath)).toEqual(true);
  });

  it('debe mostrar false si la ruta dada no es absoluta',  () => {
    expect(validatePath(relativePath)).toEqual(false);
  });
});
