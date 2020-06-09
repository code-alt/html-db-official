/*nodejs version of HTML-DB*/
class db {
  constructor(sudo_struct = []) {
    Object.defineProperty(this, "db", {
      value: new Map(sudo_struct),
      writable: true,
      configurable: true
    });
    try {
      this.load();
    } catch (e) {
      0;
    }
  }
  all() {
    return Array.from(this.db);
  }
  async createTable(name) {
    this.db.set(name, new Map());
    await this.save();
    return true;
  }
  async deleteTable(name) {
    this.db.delete(name);
    await this.save();
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
    d = JSON.stringify(d);
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
  /*LOAD FROM FILE*/
  async load() {
    let fs = require("fs");
    let data = await fs.readFileSync("h.db.json", {
      encoding: "utf8",
      flag: "r+"
    });
    this.db = new Map(JSON.parse(data));
  }
  async clear() {
    this.db.clear();
    await this.save();
  }
}

module.exports.db = db;
