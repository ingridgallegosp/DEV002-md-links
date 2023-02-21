#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const { validateLinks,  statsLinks, brokenLinks } = require('./data.js');

const process = require('process');
const path = process.argv[2];
const options = process.argv[3];
const options2 = process.argv[4];

//Pass arguments to node app: node cli.js './files/archive.md' --validate
const mdlinksPromise = mdLinks(path, options, options2)
    .then((result)=>{
        if (!options || options === null || options === undefined){
            if(result.length===0){
                return 'No hay links';
            }else{
                return result;
            }
        } else if (options === '--validate' && !options2){ 
            return validateLinks(result);
        } else if (options === '--stats' && !options2){
            return statsLinks(result);
        } else if (options === '--validate' && options2 === '--stats'){
            return validateLinks(result).then((data) => brokenLinks(data));//broken links callback?
        } else {
            return 'Opción NO valida.'
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