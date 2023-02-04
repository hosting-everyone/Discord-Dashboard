"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRoute = void 0;
const GuildRoute = (server) => (fastify, opts, next) => {
    fastify.get("/", { preHandler: [fastify.authorize, fastify.allowOnlyAuthorized] }, (req, res) => {
        res.send(req.user);
    });
    fastify.get("/settings", async (req, res) => {
        const data = [];
        for (const option of server.dashboard.options.per_guild) {
            data.push(await option.exportJSON(server, {
                user: {},
                guild: {},
            }));
        }
        return res.send(data);
    });
    next();
};
exports.GuildRoute = GuildRoute;
