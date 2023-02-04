import { Server } from "../../server/server";
export declare class DiscordOAuth2Client {
    private readonly server;
    private readonly client;
    constructor(server: Server);
    getAccessToken(code: string): Promise<any>;
    getUserInfo(accessToken: string): Promise<any>;
    getGuilds(accessToken: string): Promise<any>;
}
