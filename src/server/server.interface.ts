import { Client, PermissionsBitField } from "discord.js";

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

declare module "fastify" {
    interface FastifyRequest {
        user: any;
    }

    interface FastifyInstance {
        authorize: any;
        allowOnlyAuthorized: any;
    }

    interface FastifyReply {}
}
