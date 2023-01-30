import { Dashboard } from "@/dashboard/dashboard";
import { Database } from "@/database/Database";

export interface IModuleProvider {
    name: string;
    codename: string;
    init: (dashboard: Dashboard, db: Database) => Promise<void>;
}
