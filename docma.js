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
    title:"html-db"
  }
};
const Docma = require("docma")
Docma.create()
  .build(config)
  .catch(error => {
  console.log(error);
});





// how do i edit it?