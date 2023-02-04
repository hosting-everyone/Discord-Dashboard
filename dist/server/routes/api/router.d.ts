import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Server } from "../../../server/server";
export declare const ApiRouter: (server: Server) => (fastify: FastifyInstance, opts: FastifyServerOptions, next: any) => void;
