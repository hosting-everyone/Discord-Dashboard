import { Server } from "@/server/server";

export const GuildRoute = (server: Server) => {
    server.fastify.register(async (fastify) => {
        fastify.get("/guilds", async (request, reply) => {
            return { hello: "world" };
        });
    }, { prefix: "/api" });
}