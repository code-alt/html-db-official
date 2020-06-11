const config = {
  src: [
    './src/*.js',
    './README.md',
    './index.js'
    
  ],
  dest: './docs',
  clean:true,
  recurse:true,
  app:{
    base:"/html-db-official"
  }
};
const Docma = require("docma")
Docma.create()
  .build(config)
  .catch(error => {
  console.log(error);
});





// how do i edit it?