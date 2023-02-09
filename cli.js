#!/usr/bin/env node

//const { mdLinks } = require('./mdlinks.js');
const { mdLinks } = require('./mdlinks.js');

mdLinks('./files/archive.md')
.then(()=>{})
.catch((error) => {
    console.log(error)
});
