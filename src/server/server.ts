import { IServerOptions } from "./server.interface";
import fastify, { FastifyInstance } from "fastify";

import { InjectMiddleware } from "@/server/utils/middleware";
import { PrepareRoutes } from "@/server/utils/routes";
import { Db } from "@/db/db";

export class Server {
    public readonly fastify: FastifyInstance;

    constructor(public options: IServerOptions, public db: Db) {
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
