import { IServerOptions } from "./server.interface";
import fastify, { FastifyInstance } from "fastify";

import { InjectMiddleware } from "@/server/utils/middleware";
import { PrepareRoutes } from "@/server/utils/routes";
import { Database } from "@/database/database";

export class Server {
    public readonly fastify: FastifyInstance;

    constructor(public options: IServerOptions, public db: Database) {
        this.fastify = fastify({
            logger: this.options.dev,
        });
    }

    async start(): Promise<void> {
        await InjectMiddleware(this);
        await PrepareRoutes(this);

        await this.fastify.listen({
            port: this.options.port,
        });
    }
}
