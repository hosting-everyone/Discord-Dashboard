"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMiddleware = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const errors_1 = require("../../server/utils/errors");
const InjectMiddleware = async (server) => {
    await server.fastify.register(jwt_1.default, {
        secret: server.options.secrets.jwt,
    });
    await server.fastify.register(cookie_1.default, {
        secret: server.options.secrets.cookie,
    });
    await server.fastify.decorate("authorize", async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) { }
    });
    await server.fastify.decorate("allowOnlyAuthorized", async (request, reply) => {
        try {
            if (!request.headers["authorization"]) {
                throw new errors_1.ServerError({
                    error: "UNAUTHORIZED",
                    message: "No authorization header provided",
                    statusCode: 401,
                });
            }
            await request.jwtVerify();
            const user = request.user;
            if (!user) {
                throw new errors_1.ServerError({
                    error: "UNAUTHORIZED",
                    message: "User is not authorized",
                    statusCode: 401,
                });
            }
            const tokenValid = await server.db.get(`sessions.${request.headers["authorization"].replace("Bearer ", "")}`);
            if (!tokenValid) {
                throw new errors_1.ServerError({
                    error: "UNAUTHORIZED",
                    message: "User is not authorized. Token could be either revoked or expired",
                    statusCode: 401,
                });
            }
            request.user.data = tokenValid;
        }
        catch (err) {
            throw new errors_1.ServerError({
                error: "UNAUTHORIZED",
                message: err.message,
                statusCode: err.statusCode,
            });
        }
    });
};
exports.InjectMiddleware = InjectMiddleware;
