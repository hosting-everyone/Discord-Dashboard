import { Server } from "@/server/server";
import { ApiRouter } from "@/server/routes/api/router";

export const PrepareRoutes = async (server: Server) => {
    server.fastify.register(ApiRouter(server), { prefix: "/api" });
};
