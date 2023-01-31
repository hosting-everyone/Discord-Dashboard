import { IServerOptions } from "@/server/server.interface";
import { Server } from "@/server/server";
import { IThemeProvider } from "@/dashboard/dashboard.interface";
import { Database } from "@/database/database";

import { OptionType } from "@/dashboard/form_options/options.interface";
import { IModuleProvider } from "@/modules/module.interface";

export class Dashboard {
    public server!: Server;
    private readonly serverOptions!: IServerOptions;
    private theme!: IThemeProvider;
    private readonly db: Database;

    public modules: Array<IModuleProvider> = [];

    protected isPremium: boolean = false;

    public options: Record<string, Array<OptionType>> = {};

    constructor(serverOptions: IServerOptions) {
        this.serverOptions = serverOptions;
        this.db = new Database(serverOptions.keyv);
    }

    useTheme(theme: IThemeProvider): Dashboard {
        this.theme = theme;
        return this;
    }

    public setGuildOptions(options: Array<OptionType>): Dashboard {
        this.options.per_guild = options;
        return this;
    }

    public registerModule(module: IModuleProvider): Dashboard {
        this.modules.push(module);
        return this;
    }

    public setUserOptions(options: Array<OptionType>): Dashboard {
        this.options.per_user = options;
        return this;
    }

    public setCustomOptions(
        set_id: string,
        options: Array<OptionType>
    ): Dashboard {
        this.options[set_id] = options;
        return this;
    }

    async prepare(): Promise<Dashboard> {
        this.isPremium = false;
        this.server = new Server(this.serverOptions, this, this.db);

        await this.theme.init(
            this,
            new Database(
                this.serverOptions.keyv,
                `theme.${this.theme.codename}`
            )
        );

        for (const module of this.modules) {
            await module.init(
                this,
                new Database(
                    this.serverOptions.keyv,
                    `module.${module.codename}`
                )
            );
        }

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
