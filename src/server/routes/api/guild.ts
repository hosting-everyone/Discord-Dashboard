import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Server } from "@/server/server";
import { Guild, User } from "discord.js";

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

        fastify.get<{
            Params: {
                guild_id: string;
                user_id: string;
            };
        }>("/settings", async (req, res) => {
            const data = [];
            for (const option of server.dashboard.options.per_guild) {
                data.push(
                    await option.exportJSON(server, {
                        user: {} as User,
                        guild: {} as Guild,
                    })
                );
            }
            return res.send(data);
        });

        next();
    };
