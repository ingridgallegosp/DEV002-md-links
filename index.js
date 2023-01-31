// import axios from 'axios';
/* module.exports = () => {
  // ...
}; */

// Node.js file system module 
const fs = require('fs'); 

// Path
const path = require('path');

// validar ruta relativa o ruta absoluta
const validatePath = path.isAbsolute('./files/archive.md'); //donde asigno el path?
console.log('absolute path:', validatePath); //false

// if false - ruta relativa a ruta absoluta
const archivePath = path.join(__dirname, './files/archive.md'); 
// path.join metodo para concatenar ruta relativa
// __dirname palabra reservada deNodeJS para ruta absoluta
console.log('archivePath es '+ archivePath);

//path.extname('ruta') nos da la extension del archivo
console.log(path.extname(archivePath));

// Node.js program to demonstrate the fs.existsSync() method
let fileExists = fs.existsSync(archivePath);
console.log("archivePath exists:", fileExists);

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
  console.log('Es archivo: ' , stats.isFile()); 
  console.log('Es directorio: ' , stats.isDirectory()); 
});

//if .md - contiene links?
//reg ex?

// Obtener/Listar contenido del directorio ---------
// const fs = require('fs');
const folderPath = './files';

const folderContent = fs.readdirSync(folderPath);
console.log(folderContent);

  

module.exports = {  };