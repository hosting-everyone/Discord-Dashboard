import { IServerOptions } from "@/server/server.interface";
import { Server } from "@/server/server";
import { IThemeProvider } from "@/dashboard/dashboard.interface";
import { Database } from "@/database/database";

export class Dashboard {
    public server!: Server;
    private readonly serverOptions!: IServerOptions;
    private theme!: IThemeProvider;
    private readonly db: Database;

    private isPremium: boolean = false;

    constructor(serverOptions: IServerOptions) {
        this.serverOptions = serverOptions;
        this.db = new Database(serverOptions.keyv);
    }

    useTheme(theme: IThemeProvider): Dashboard {
        this.theme = theme;
        return this;
    }

    async prepare(): Promise<Dashboard> {
        this.isPremium = false;

        this.server = new Server(this.serverOptions, this.db);
        await this.theme.init(
            this,
            new Database(
                this.serverOptions.keyv,
                `theme_settings.${this.theme.codename}`
            )
        );
        return this;
    }

    async start(): Promise<Dashboard> {
        if (!this.server) {
            await this.prepare();
        }
        await this.server.start();
        return this;
    }
}
