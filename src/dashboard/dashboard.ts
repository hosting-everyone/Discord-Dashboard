import { IServerOptions } from "@/server/server.interface";
import { Server } from "@/server/server";
import { IThemeProvider } from "@/dashboard/dashboard.interface";
import { Db } from "@/db/db";

export class Dashboard {
    public server!: Server;
    private readonly serverOptions: IServerOptions = {
        dev: true,
        port: 3000,
        keyv: "",
        project: {
            account_access_token: "",
            project_id: "",
        },
        secrets: {
            jwt: "",
            cookie: "",
        },
        oauth2: {
            client_id: "",
            client_secret: "",
            redirect_uri: "",
            encryption_key: "dgstrhgtee",
        },
    };
    private theme!: IThemeProvider;
    private readonly db: Db;

    private isPremium: boolean = false;

    constructor(serverOptions: IServerOptions) {
        this.serverOptions = serverOptions;
        this.db = new Db(serverOptions.keyv);
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
            new Db(
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
