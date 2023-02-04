"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const middleware_1 = require("../server/utils/middleware");
const routes_1 = require("../server/utils/routes");
class Server {
    constructor(options, dashboard, db) {
        this.options = options;
        this.dashboard = dashboard;
        this.db = db;
        this.fastify = (0, fastify_1.default)({
            logger: options.dev,
        });
    }
    async start() {
        await (0, middleware_1.InjectMiddleware)(this);
        await (0, routes_1.PrepareRoutes)(this);
        await this.fastify.listen({
            port: this.options.port,
        });
    }
}
exports.Server = Server;
