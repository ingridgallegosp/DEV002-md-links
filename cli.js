// #!/usr/bin/env node

const { mdLinks } = require('./index.js');

mdLinks('./files/archive.md')
    .then((result)=>{
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    });



