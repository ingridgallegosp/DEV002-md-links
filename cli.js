// #!/usr/bin/env node

const { mdLinks } = require('./mdlinks.js');

mdLinks('./files/archive.md')
.then(()=>{
    console.log()
})
.catch((error) => {
    console.log(error)
});
