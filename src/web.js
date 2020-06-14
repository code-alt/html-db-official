/*expect this in 4.0*/
const express = require("express");
const loginMgr = express();
const DBMGR = express();
DBMGR.use("/auth", loginMgr);





/**
 *@exports htmldb/WebManager
 */
module.exports = DBMGR
