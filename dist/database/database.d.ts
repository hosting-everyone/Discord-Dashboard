export declare class Database {
    private readonly keyv;
    constructor(src: string, namespace?: string);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<any>;
}
