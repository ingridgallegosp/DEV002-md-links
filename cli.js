#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const { validateLinks,  statsLinks, brokenLinks } = require('./data.js');

const process = require('process');
const path = process.argv[2];
const options = process.argv[3];

//Pass arguments to node app: node cli.js './files/archive.md' --validate

const mdlinksPromise = mdLinks(path, options)
    .then((result)=>{
        if (!options || options === null || options === undefined) {
            return result;
        } else if (options === '--validate'){ 
            return validateLinks(result); 
        } else if (options === '--stats'){
            return statsLinks(result)
        } else if (options === '--stats--validate'){
            return brokenLinks(result)
        } 
    })
    .catch((error) => {
        console.log(error)
    });

mdlinksPromise.then(console.log)



    

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