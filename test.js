let htmlDB = require("./index.js");
let axe = new htmlDB.db();
axe.createTable("abx");

axe.getTable("abx").set("A", "B")
let n = axe.all();
let a = new htmlDB.db(n);
console.log(a.all())
let b = new htmlDB.db(n);
let c = axe.toJSON();
console.log(c)
let d = new htmlDB.db(c);
console.log(d.all());
console.log(d.hasTable("abx"))

axe.save();

axe.load();
