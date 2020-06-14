/**
 *@exports htmldb
 *@property {class} db database
 *@property {*} WebManager web database manager
*/
module.exports = {
  db: require("./src/db"),
  WebManager: require("./src/web")
};
