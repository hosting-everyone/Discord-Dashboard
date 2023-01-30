import { IServerOptions } from "./server.interface";
import fastify, { FastifyInstance } from "fastify";

export class Server {
    public readonly fastify: FastifyInstance;
    constructor(public options: IServerOptions) {
        this.fastify = fastify({
            logger: this.options.dev,
        });
    }

    async start(): Promise<void> {
        await this.fastify.listen({
            port: this.options.port,
        });
    }
}