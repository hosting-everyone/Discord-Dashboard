"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const guild_1 = require("../../../server/routes/api/guild");
const auth_1 = require("../../../server/routes/api/auth");
const ApiRouter = (server) => (fastify, opts, next) => {
    fastify.register((0, guild_1.GuildRoute)(server), { prefix: "/guild" });
    fastify.register((0, auth_1.AuthRoute)(server), { prefix: "/auth" });
    next();
};
exports.ApiRouter = ApiRouter;
