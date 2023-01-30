import { FastifyInstance, FastifyRequest, FastifyServerOptions } from "fastify";
import { ServerError } from "@/server/utils/errors";
import { DiscordOAuth2Client } from "@/server/utils/auth";
import { Server } from "@/server/server";

import Cryptr from "cryptr";

export const AuthRoute =
    (server: Server) =>
    (fastify: FastifyInstance, opts: FastifyServerOptions, next: any) => {
        const discordOAuth2Client = new DiscordOAuth2Client(server);
        const cryptr = new Cryptr(server.options.oauth2.encryption_key);

        fastify.get(
            "/",
            { preHandler: [fastify.authorize] },
            (
                req: FastifyRequest<{
                    Querystring: {
                        redirect_back: string;
                    };
                }>,
                res
            ) => {
                if (req.user) {
                    return res.send(req.user);
                }

                return res
                    .setCookie(
                        "redirect_back",
                        req.query.redirect_back || "/auth"
                    )
                    .redirect(
                        `https://discord.com/api/oauth2/authorize?client_id=${server.options.oauth2.client_id}&redirect_uri=${server.options.oauth2.redirect_uri}&response_type=code&scope=identify%20guilds`
                    );
            }
        );

        fastify.get(
            "/callback",
            async (
                request: FastifyRequest<{
                    Querystring: {
                        code: string;
                    };
                }>,
                reply
            ) => {
                const code = request.query?.code;
                if (!code) {
                    throw new ServerError({
                        error: "INVALID_CODE",
                        message: "No code provided",
                        statusCode: 400,
                    });
                }

                const tokens = await discordOAuth2Client.getAccessToken(code);
                const payload = await discordOAuth2Client.getUserInfo(
                    tokens.access_token
                );

                const token = fastify.jwt.sign(
                    {
                        id: payload.id,
                    },
                    {
                        expiresIn: "7d",
                    }
                );

                await server.db.set(
                    `sessions.${token}`,
                    {
                        access_token: cryptr.encrypt(tokens.access_token),
                        refresh_token: cryptr.encrypt(tokens.refresh_token),
                        expires_date: new Date(
                            new Date().getTime() + tokens.expires_in * 1000
                        ),
                        user: payload,
                    },
                    tokens.expires_in * 1000
                );

                const redirectBack = request.cookies.redirect_back || "/auth";
                await reply.unsignCookie("redirect_back");
                return reply.redirect(`${redirectBack}#token=${token}`);
            }
        );

        next();
    };
