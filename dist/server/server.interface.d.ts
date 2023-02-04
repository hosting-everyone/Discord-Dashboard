import { Client, PermissionsBitField } from "discord.js";
import { APIUser } from "discord-api-types/v10";
export interface IProjectInfo {
    account_access_token: string;
    project_id: string;
}
export interface IOAuthSecrets {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    encryption_key: string;
}
export interface IServerOptions {
    djs_client: Client;
    permissions_required: PermissionsBitField[];
    dev: boolean;
    port: number;
    keyv: string;
    project: IProjectInfo;
    oauth2: IOAuthSecrets;
    secrets: {
        cookie: string;
        jwt: string;
    };
}
export interface IUserSession {
    id: string;
    iat: number;
    exp: number;
    data: {
        access_token: string;
        refresh_token: string;
        expires_date: Date;
        user: APIUser;
    };
}
declare module "fastify" {
    interface FastifyRequest {
        user: IUserSession;
    }
    interface FastifyInstance {
        authorize: any;
        allowOnlyAuthorized: any;
    }
    interface FastifyReply {
    }
}
