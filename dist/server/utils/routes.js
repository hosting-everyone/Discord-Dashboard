"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareRoutes = void 0;
const router_1 = require("../../server/routes/api/router");
const PrepareRoutes = async (server) => {
    server.fastify.register((0, router_1.ApiRouter)(server), { prefix: "/api" });
};
exports.PrepareRoutes = PrepareRoutes;
