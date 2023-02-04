import { IServerOptions } from "../server/server.interface";
import { Server } from "../server/server";
import { IThemeProvider } from "../dashboard/dashboard.interface";
import { OptionType } from "../dashboard/form_options/options.interface";
import { IModuleProvider } from "../modules/module.interface";
export declare class Dashboard {
    server: Server;
    private readonly serverOptions;
    private theme;
    private readonly db;
    modules: Array<IModuleProvider>;
    protected isPremium: boolean;
    options: Record<string, Array<OptionType>>;
    constructor(serverOptions: IServerOptions);
    useTheme(theme: IThemeProvider): Dashboard;
    setGuildOptions(options: Array<OptionType>): Dashboard;
    registerModule(module: IModuleProvider): Dashboard;
    setUserOptions(options: Array<OptionType>): Dashboard;
    setCustomOptions(set_id: string, options: Array<OptionType>): Dashboard;
    prepare(): Promise<Dashboard>;
    start(): Promise<Dashboard>;
}
