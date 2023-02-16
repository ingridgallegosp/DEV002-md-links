#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const { validateLinks,  statsLinks, brokenLinks } = require('./data.js');

const process = require('process');
const path = process.argv[2];
const options = process.argv[3];

//Pass arguments to node app: node cli.js './files/archive.md' --validate

mdLinks(path, options)
    .then((result)=>{
        if (!options || options === null || options === undefined || options === { validate: false }) {
            console.log(result);
        } else if (options === '--validate' || options == { validate: true }){ // ojo con {validate}--no funciona
            console.log(validateLinks(result)); 
        } else if (options === '--stats'){
            console.log(statsLinks(result));
        } else if (options === '--stats--validate'){
            console.log(brokenLinks(result));
        } 
    })
    .catch((error) => {
        console.log(error)
    });
    
// Para testear - antes de incluir validaciones
/* mdLinks(path, options)
    .then((result)=>{
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    });  */

/*  .then((result) => return ...)
    .then(()=>) */