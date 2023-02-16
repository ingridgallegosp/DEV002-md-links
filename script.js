// Leer argumentos de linea de comando
const process = require('process');
console.log(process.argv);

//Pass arguments to node app: node script.js './files/archive.md' validate
const proc0 = process.argv[0];
console.log(proc0); //C:\Program Files\nodejs\node.exe
const proc1 = process.argv[1];
console.log(proc1); //C:\Users\INGRID\Desktop\Laboratoria\PROYECTO4-MDLINKS\DEV002-md-links\script.js
const path = process.argv[2];
console.log(path); //./files/archive.md
const options = process.argv[3];
console.log(options); //validate