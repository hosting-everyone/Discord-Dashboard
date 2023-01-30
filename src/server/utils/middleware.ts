import { Server } from "@/server/server";

import FastifyJWT from "@fastify/jwt";
import type { FastifyCookieOptions } from "@fastify/cookie";
import FastifyCookie from "@fastify/cookie";

import { FastifyReply, FastifyRequest } from "fastify";

import { IError, ServerError } from "@/server/utils/errors";

export const InjectMiddleware = async (server: Server) => {
    await server.fastify.register(FastifyJWT, {
        secret: server.options.secrets.jwt,
    });

    await server.fastify.register(FastifyCookie, {
        secret: server.options.secrets.cookie,
    } as FastifyCookieOptions);

    await server.fastify.decorate(
        "authorize",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {}
        }
    );

    await server.fastify.decorate(
        "allowOnlyAuthorized",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                if (!request.headers["authorization"]) {
                    throw new ServerError({
                        error: "UNAUTHORIZED",
                        message: "No authorization header provided",
                        statusCode: 401,
                    });
                }

                await request.jwtVerify();
                const user = request.user;
                if (!user) {
                    throw new ServerError({
                        error: "UNAUTHORIZED",
                        message: "User is not authorized",
                        statusCode: 401,
                    });
                }

                const tokenValid = await server.db.get(
                    `sessions.${request.headers["authorization"].replace(
                        "Bearer ",
                        ""
                    )}`
                );

                if (!tokenValid) {
                    throw new ServerError({
                        error: "UNAUTHORIZED",
                        message:
                            "User is not authorized. Token could be either revoked or expired",
                        statusCode: 401,
                    });
                }

                request.user.data = tokenValid;
            } catch (err: any) {
                throw new ServerError({
                    error: "UNAUTHORIZED",
                    message: err.message,
                    statusCode: err.statusCode,
                });
            }
        }
    );
};
