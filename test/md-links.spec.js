const { mdLinks } = require('../index.js');

const testAbsolutePath = 'C:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md';


// mdLinks Function
describe('mdLinks', () => {

    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    }); 

    it('should return a promise', () => {
        return mdLinks(testAbsolutePath)
            .then(() => {
                expect(mdLinks).toBe(typeof Promise);
            }) 
            .catch((error) => {error});
    }); 
});
