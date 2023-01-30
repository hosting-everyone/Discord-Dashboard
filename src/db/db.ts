const KeyVModule = require('keyv');

export class Db {
    private readonly keyv;
    constructor(src: string, namespace?: string) {
        this.keyv = new KeyVModule(src, namespace ? { namespace } : undefined);
    }

    public async get(key: string): Promise<any> {
        return this.keyv.get(key);
    }

    public async set(key: string, value: any): Promise<any> {
        return this.keyv.set(key, value);
    }
}