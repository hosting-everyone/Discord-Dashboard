import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Server } from "@/server/server";

export const GuildRoute =
    (server: Server) =>
    (fastify: FastifyInstance, opts: FastifyServerOptions, next: any) => {
        fastify.get(
            "/",
            { preHandler: [fastify.authorize, fastify.allowOnlyAuthorized] },
            (req, res) => {
                res.send(req.user);
            }
        );
        next();
    };
