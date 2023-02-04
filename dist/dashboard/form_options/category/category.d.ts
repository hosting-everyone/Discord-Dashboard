import { EFormTypes, GetterType, OptionBase } from "../../../dashboard/form_options/options.interface";
import { Server } from "../../../server/server";
import { OptionType } from "../../../dashboard/form_options/options.interface";
export declare class OptionsCategory extends OptionBase {
    type: EFormTypes;
    children: OptionType[];
    callable: boolean;
    setId(id: string): OptionsCategory;
    setName(name: string): OptionsCategory;
    setDescription(description: string): OptionsCategory;
    setChildren(children: OptionType[]): OptionsCategory;
    exportJSON(server: Server, data: GetterType): Promise<Object>;
}
