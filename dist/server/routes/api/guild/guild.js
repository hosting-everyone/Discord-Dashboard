"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRoute = void 0;
const GuildRoute = (fastify, opts, next) => {
    fastify.get("/", (req, res) => {
        res.send(req.raw.method);
    });
    next();
};
exports.GuildRoute = GuildRoute;
