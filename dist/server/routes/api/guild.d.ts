import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Server } from "../../../server/server";
export declare const GuildRoute: (server: Server) => (fastify: FastifyInstance, opts: FastifyServerOptions, next: any) => void;
