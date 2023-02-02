/* module.exports = () => {
  // ...
}; */

// Node.js file system module 
const fs = require('fs'); 

// Path
const path = require('path');
const givenPath = './files/archive.md';

// Validar si la ruta existe
const verifyFileExists = (givenPath) =>{
  fs.access(givenPath, fs.constants.F_OK, (err) => {
    //console.log(`${givenPath} ${err ? 'does not exist' : 'exists'}`);
  }); 
}; //exists


// Validar si es ruta absoluta - TESTEADO
const validatePath = (givenPath) => {
  return path.isAbsolute(givenPath);
};

// Si es ruta relativa transformar a ruta absoluta - TESTEADO
const toAbsolutePath = (givenPath) => {
  return path.join(__dirname, givenPath);
};


// Consultar si es archivo
const isFile = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error(err);
      return stats.isFile();
    }
    console.log('is file: ' , stats.isFile()); 
  });
};

// Consultar si es directorio
const isDirectory = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error(err);
      return stats.isDirectory();
    } 
    console.log('is directory: ' , stats.isDirectory()); 
  });
};

// Consultar extension del archivo
const fileExtens = (givenPath) => {
  return path.extname(givenPath)
}

// Leer un archivo
const readFilePath = (givenPath) => {
  fs.readFile(givenPath, 'utf8', (err, data) => { 
    // encoding utf8 porque es archivo de texto
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });
};
console.log(readFilePath(givenPath));

// Buscar links en el archivo .md

const regExtLink = '\[.*]\(http[a-zA-Z]://.*\)';
let foundLinks = [];



// Obtener/listar contenido del directorio
const folderPath = './files';

const folderContent = (path) =>{
   fs.readdirSync(path);
}
folderContent(folderPath);

// -----------------------------------
/* const archivePath = path.join(__dirname, './files/archive.md'); 

// __dirname palabra reservada deNodeJS para ruta absoluta
console.log('archivePath es '+ archivePath);

console.log(path.extname(archivePath));

// consultar extension del archivo
const fileExtension = (archivePath) => {  
  return path.extname(archivePath)
}
console.log(fileExtension('file.txt'));

// Leer un archivo 
fs.readFile(archivePath, 'utf8', (err, data) => { 
  // encoding utf8 porque es archivo de texto
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// stats
fs.stat(archivePath, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Es archivo ' + stats.isFile()); 
  console.log('Es directorio ' + stats.isDirectory()); 
}); */




module.exports = { 
  
  validatePath,
  toAbsolutePath,
};