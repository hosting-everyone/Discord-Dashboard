import { Dashboard } from "@/dashboard/dashboard";
import { Database } from "@/database/database";

export interface IThemeProvider {
    name: string;
    codename: string;
    init: (dashboard: Dashboard, db: Database) => Promise<void>;
}
