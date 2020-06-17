



const express = require("express");
const loginMgr = express();
const fetcher = express();
const DBMGR = express.Router();
DBMGR.use("/auth", loginMgr);

loginMgr.post("in", (req,res) => {
    
});


/**
 *@name db web manager
 *@exports htmldb.WebManager
 */
module.exports = DBMGR;
