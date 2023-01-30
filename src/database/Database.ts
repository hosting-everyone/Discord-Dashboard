const KeyVModule = require("keyv");

export class Database {
    private readonly keyv;
    constructor(src: string, namespace?: string) {
        this.keyv = new KeyVModule(src, namespace ? { namespace } : undefined);
    }

    public async get(key: string): Promise<any> {
        return this.keyv.get(key);
    }

    public async set(key: string, value: any, ttl?: number): Promise<any> {
        return this.keyv.set(key, value, ttl || undefined);
    }
}
