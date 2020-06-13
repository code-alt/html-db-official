/**
*@file index.js
*/
module.exports = {
  db:require("./src/db").db,
  ...require("./src/web")
};
