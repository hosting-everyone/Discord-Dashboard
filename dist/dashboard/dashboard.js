"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const server_1 = require("../server/server");
const database_1 = require("../database/database");
class Dashboard {
    constructor(serverOptions) {
        this.modules = [];
        this.isPremium = false;
        this.options = {};
        this.serverOptions = serverOptions;
        this.db = new database_1.Database(serverOptions.keyv);
    }
    useTheme(theme) {
        this.theme = theme;
        return this;
    }
    setGuildOptions(options) {
        this.options.per_guild = options;
        return this;
    }
    registerModule(module) {
        this.modules.push(module);
        return this;
    }
    setUserOptions(options) {
        this.options.per_user = options;
        return this;
    }
    setCustomOptions(set_id, options) {
        this.options[set_id] = options;
        return this;
    }
    async prepare() {
        this.isPremium = false;
        this.server = new server_1.Server(this.serverOptions, this, this.db);
        await this.theme.init(this, new database_1.Database(this.serverOptions.keyv, `theme.${this.theme.codename}`));
        for (const module of this.modules) {
            await module.init(this, new database_1.Database(this.serverOptions.keyv, `module.${module.codename}`));
        }
        return this;
    }
    async start() {
        if (!this.server) {
            await this.prepare();
        }
        await this.server.start();
        return this;
    }
}
exports.Dashboard = Dashboard;
