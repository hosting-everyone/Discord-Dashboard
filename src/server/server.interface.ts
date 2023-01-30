export interface IProjectInfo {
    account_access_token: string;
    project_id: string;
}

export interface IServerOptions {
    dev: boolean;
    port: number;
    keyv: string;
    project: IProjectInfo;
}

declare module "fastify" {
    interface FastifyRequest {
        user: any;
    }

    interface FastifyReply {

    }
}