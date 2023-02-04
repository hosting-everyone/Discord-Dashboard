import { EFormTypes, GetterType, OptionBase } from "../../../dashboard/form_options/options.interface";
import { OptionsCategory } from "../../../dashboard/form_options/category/category";
import { Server } from "../../../server/server";
export declare class OptionsCategoriesSet extends OptionBase {
    type: EFormTypes;
    children: Record<string, OptionsCategory>;
    callable: boolean;
    setId(id: string): OptionsCategoriesSet;
    setName(name: string): OptionsCategoriesSet;
    setDescription(description: string): OptionsCategoriesSet;
    setChildren(categories: OptionsCategory[]): OptionsCategoriesSet;
    exportJSON(server: Server, data: GetterType): Promise<Object>;
}
