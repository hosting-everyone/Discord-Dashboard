export interface IError {
    error?: string;
    message?: string;
    statusCode?: number;
}

export class ServerError {
    public readonly error: string;
    public readonly message: string;
    public readonly statusCode: number;

    constructor(err: IError) {
        this.error = err.error || "SERVER_ERROR";
        this.message =
            err.message ||
            "Internal server error. Please try again later. If the problem persists, contact the developer.";
        this.statusCode = err.statusCode || 500;
    }
}
