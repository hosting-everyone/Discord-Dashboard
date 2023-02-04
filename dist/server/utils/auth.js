"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordOAuth2Client = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../../server/utils/errors");
class DiscordOAuth2Client {
    constructor(server) {
        this.server = server;
        this.client = server.options.oauth2;
    }
    async getAccessToken(code) {
        try {
            const response = await axios_1.default.post("https://discord.com/api/oauth2/token", {
                grant_type: "authorization_code",
                code: code,
                client_id: this.client.client_id,
                client_secret: this.client.client_secret,
                redirect_uri: this.client.redirect_uri,
                scope: "identify guilds",
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        }
        catch (err) {
            throw new errors_1.ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting access token",
                statusCode: 500,
            });
        }
    }
    async getUserInfo(accessToken) {
        try {
            const response = await axios_1.default.get("https://discord.com/api/users/@me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        }
        catch (err) {
            throw new errors_1.ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting user info",
                statusCode: 500,
            });
        }
    }
    async getGuilds(accessToken) {
        try {
            const response = await axios_1.default.get("https://discord.com/api/users/@me/guilds", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        }
        catch (err) {
            throw new errors_1.ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting guilds",
                statusCode: 500,
            });
        }
    }
}
exports.DiscordOAuth2Client = DiscordOAuth2Client;
