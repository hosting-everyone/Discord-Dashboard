import { IOAuthSecrets } from "@/server/server.interface";
import axios from "axios";
import { ServerError } from "@/server/utils/errors";
import { Server } from "@/server/server";

export class DiscordOAuth2Client {
    private readonly client: IOAuthSecrets;
    constructor(private readonly server: Server) {
        this.client = server.options.oauth2;
    }

    public async getAccessToken(code: string) {
        try {
            const response = await axios.post(
                "https://discord.com/api/oauth2/token",
                {
                    grant_type: "authorization_code",
                    code: code,
                    client_id: this.client.client_id,
                    client_secret: this.client.client_secret,
                    redirect_uri: this.client.redirect_uri,
                    scope: "identify guilds",
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.data;
        } catch (err) {
            throw new ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting access token",
                statusCode: 500,
            });
        }
    }

    public async getUserInfo(accessToken: string) {
        try {
            const response = await axios.get(
                "https://discord.com/api/users/@me",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return response.data;
        } catch (err) {
            throw new ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting user info",
                statusCode: 500,
            });
        }
    }

    public async getGuilds(accessToken: string) {
        try {
            const response = await axios.get(
                "https://discord.com/api/users/@me/guilds",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return response.data;
        } catch (err) {
            throw new ServerError({
                error: "SERVER_ERROR",
                message: "Error while getting guilds",
                statusCode: 500,
            });
        }
    }
}
