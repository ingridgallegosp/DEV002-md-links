// import axios from 'axios';
/* module.exports = () => {
  // ...
}; */

// Leer un archivo
const fs = require('fs'); // requerimos el paquete file system que viene ya

fs.readFile('./files/archive.md', 'utf8', (err, data) => { // encoding utf8 porque es archivo de texto
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Averiguar la extensión de un archivo

