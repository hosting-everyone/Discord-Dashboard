export interface IError {
    error?: string;
    message?: string;
    statusCode?: number;
}
export declare class ServerError {
    readonly error: string;
    readonly message: string;
    readonly statusCode: number;
    constructor(err: IError);
}
