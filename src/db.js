/*nodejs version of HTML-DB*/

/**
 *@file db
 *@description database class
 *@exports htmldb.db
 *@example
 * let database = new HtmlDB.db();
 * ...
 */
class db {
    /**
     * @param {Array} plugins a list of plugins
     *@returns {(boolean|Error)}
     */
    constructor(plugins = []) {
        Object.defineProperty(this, "db", {
            value: new Map(),
            writable: true,
            configurable: true
        });
        try {
            this.load();
        } catch (e) {
            throw new Error(
                "File h.db.json is not accessable, does not exist, or is being written to by another program at this very moment. please fix permissions/ add the file with the contents of '{}' in it"
            );
        }
        plugins.forEach(pl => {
            pl.run(this);
        });
        return true;
    }

    /**
     *@returns {Array}
     *@description Returns all tables/data from database
     *@param {string} name name of table
     */
    all() {
        return Array.from(this.db);
    }
    /**
     *@async
     *@description creates a table in the database
     *@returns {(boolean|Error)}
     *@example
     * db.createTable("Hello World!");
     * db.getTable("Hellow World!").set("a", "b"); // true
     *@param {string} name name of table
     */
    async createTable(name) {
        this.db.set(name, new Map());
        await this.save();
        return true;
    }
    /**
     *@returns {(boolean|Error)}
     *@async
     *@description deletes a table in the database
     *@param {string} name name of table
     */
    async deleteTable(name) {
        this.db.delete(name);
        await this.save();
        return true;
    }
    /**
     *@returns {(Map|null)}
     *@description Get Table
     *@param {string} name name of table
     */
    getTable(name) {
        return this.db.get(name);
    }
    /**
     *@returns {boolean}
     *@description Check If Table Exists
     *@param {string} name name of table
     */
    hasTable(name) {
        if (this.db.has(name)) {
            return true;
        }
        return false;
    }
    /**
     *@returns {(Array|Error)}
     *@description turns the data provided ( not required ) into an Array that can be jsonfied ( json.stringify )
     *@param {Map} data the data/stored data of the database ( not required)
     */

    toJSON(data = this.db) {
        var ar = {};
        let keys = data.keys();
        for (const item of keys) {
            let ite = Object.fromEntries(this.db.get(item));
            ar[item] = ite;
        }
        return Array.from(Object.entries(ar));
    }
    /**
     *@description saves the table to file ( note - not working as expected, figuring out the issue)
     */
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
    /**
     *@description LOAD FROM FILE
     */
    async load() {
        let fs = require("fs");
        let data = await fs.readFileSync("h.db.json", {
            encoding: "utf8",
            flag: "r+"
        });
        this.db = new Map(JSON.parse(data));
    }
    /**
     *@description clear the database
     */
    async clear() {
        this.db.clear();
        await this.save();
    }
}
module.exports = db;
