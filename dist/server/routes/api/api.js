"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoute = void 0;
const guild_1 = require("../../../server/routes/api/guild/guild");
const ApiRoute = (fastify, opts, next) => {
    fastify.register(guild_1.GuildRoute, { prefix: "/guild" });
    next();
};
exports.ApiRoute = ApiRoute;
