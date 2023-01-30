import { Dashboard } from "@/dashboard/dashboard";
import { Db } from "@/db/db";

export interface IModuleProvider {
    name: string;
    codename: string;
    init: (dashboard: Dashboard, db: Db) => Promise<void>;
}
