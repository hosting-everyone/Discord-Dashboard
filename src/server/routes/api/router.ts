import { FastifyInstance, FastifyServerOptions } from "fastify";
import { GuildRoute } from "@/server/routes/api/guild";
import { AuthRoute } from "@/server/routes/api/auth";
import { Server } from "@/server/server";

export const ApiRouter =
    (server: Server) =>
    (fastify: FastifyInstance, opts: FastifyServerOptions, next: any) => {
        fastify.register(GuildRoute(server), { prefix: "/guild" });
        fastify.register(AuthRoute(server), { prefix: "/auth" });

        next();
    };
