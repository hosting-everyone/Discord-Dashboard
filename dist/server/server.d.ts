import { IServerOptions } from "./server.interface";
import { FastifyInstance } from "fastify";
import { Database } from "../database/database";
import { Dashboard } from "../dashboard/dashboard";
export declare class Server {
    options: IServerOptions;
    dashboard: Dashboard;
    db: Database;
    readonly fastify: FastifyInstance;
    constructor(options: IServerOptions, dashboard: Dashboard, db: Database);
    start(): Promise<void>;
}
