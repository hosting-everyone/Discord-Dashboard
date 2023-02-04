"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const errors_1 = require("../../../server/utils/errors");
const auth_1 = require("../../../server/utils/auth");
const cryptr_1 = __importDefault(require("cryptr"));
const AuthRoute = (server) => (fastify, opts, next) => {
    const discordOAuth2Client = new auth_1.DiscordOAuth2Client(server);
    const cryptr = new cryptr_1.default(server.options.oauth2.encryption_key);
    fastify.get("/me", { preHandler: [fastify.authorize, fastify.allowOnlyAuthorized] }, (request, reply) => {
        return request.user.data.user;
    });
    fastify.get("/", { preHandler: [fastify.authorize] }, (req, res) => {
        if (req.user) {
            return res.send(req.user);
        }
        return res
            .setCookie("redirect_back", req.query.redirect_back || "/auth")
            .redirect(`https://discord.com/api/oauth2/authorize?client_id=${server.options.oauth2.client_id}&redirect_uri=${server.options.oauth2.redirect_uri}&response_type=code&scope=identify%20guilds`);
    });
    fastify.get("/callback", async (request, reply) => {
        const code = request.query?.code;
        if (!code) {
            throw new errors_1.ServerError({
                error: "INVALID_CODE",
                message: "No code provided",
                statusCode: 400,
            });
        }
        const tokens = await discordOAuth2Client.getAccessToken(code);
        const payload = await discordOAuth2Client.getUserInfo(tokens.access_token);
        const token = fastify.jwt.sign({
            id: payload.id,
        }, {
            expiresIn: "7d",
        });
        await server.db.set(`sessions.${token}`, {
            access_token: cryptr.encrypt(tokens.access_token),
            refresh_token: cryptr.encrypt(tokens.refresh_token),
            expires_date: new Date(new Date().getTime() + tokens.expires_in * 1000),
            user: payload,
        }, tokens.expires_in * 1000);
        const redirectBack = request.cookies.redirect_back || "/auth";
        await reply.unsignCookie("redirect_back");
        return reply.redirect(`${redirectBack}#token=${token}`);
    });
    next();
};
exports.AuthRoute = AuthRoute;
