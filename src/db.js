/*nodejs version of HTML-DB*/
const savefile = require("save-file-atomic");
exports.db = class {
  constructor(sudo_struct = []) {
    Object.defineProperty(this, "db", {
      value: new Map(sudo_struct),
      writable: true,
      configurable: true
    });
  }
  all() {
    return Array.from(this.db);
  }
  createTable(name) {
    this.db.set(name, new Map());
    return true;
  }
  deleteTable(name) {
    this.db.delete(name);
    return true;
  }
  getTable(name) {
    return this.db.get(name);
  }
  hasTable(name) {
    if (this.db.has(name)) {
      return true;
    }
    return false;
  }
  toJSON(data = this.db) {
    var ar = {};
    let keys = data.keys();
    for (const item of keys) {
      let ite = Object.fromEntries(this.db.get(item));
      ar[item] = ite;
    }
    return Array.from(Object.entries(ar));
  }
  /*SAVE TO FILE*/
  async save() {
    let d = this.toJSON();
    d = JSON.stringify(d)
    let fs = require("fs");
    await fs.writeFileSync(
      "h.db.json",
      d,
      { encoding: "utf8", flag: "w+" },
      e => {
        if (e) throw e;
      }
    );
    return true;
  }
  async load() {
    let fs = require("fs");
    let data = await fs.readFileSync("h.db.json", { encoding:"utf8", flag:"r+"});
    console.log(data);
  }
  clear(){
    this.db.clear();
  }
};
