"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError {
    constructor(err) {
        this.error = err.error || "SERVER_ERROR";
        this.message =
            err.message ||
                "Internal server error. Please try again later. If the problem persists, contact the developer.";
        this.statusCode = err.statusCode || 500;
    }
}
exports.ServerError = ServerError;
