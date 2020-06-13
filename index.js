/**
*@file index.js
*/
module.exports = {
  ...require("./src/db"),
  ...require("./src/web")
};
