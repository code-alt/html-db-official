/**
 *@file plugin
 *@description Plugin Class
 *@exports htmldb.Plugin
 *@example
 * class Dx extends HtmlDB.Plugin{
 *  constructor(){
 *      let PluginInfo = {
 *          name:"NodeNodeNodeNode"
 *      }
 *      super(PluginInfo);
 *      return true;
 *  }
 *  run(self){
 *      self.node = true;
 *      //...
 *  }
 * }
 * //...
 */
class Plugin {
    /**
     * @typedef {Object} pluginOpt plugin options
     * @property {String} name 
     */
    /**
     * 
     * @param {pluginOpt} opt info for plugin
     */
    constructor(opt) {
        if (!opt.name) {
            throw new Error("Plugin name not found ");
        }
        this.name = opt.name;
    }
    /**
     * @description self destructs the plugin
     */
    selfDestruct() {
        Object.entries(this).forEach(ob => {
            if (ob == "selfDestruct") { return; }
            delete this[ob];
        });
        return 0;
    }
}



module.exports.Plugin = Plugin