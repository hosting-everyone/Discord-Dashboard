import { IOptionsSetterError, OptionGetter, OptionSetter } from "../../../dashboard/form_options/options.interface";
import type { SetterType, GetterType } from "../../../dashboard/form_options/options.interface";
import { EFormTypes, OptionBase } from "../../../dashboard/form_options/options.interface";
import { Server } from "../../../server/server";
export type DataType = string | null;
export declare class TextInput extends OptionBase {
    type: EFormTypes;
    private get;
    private set;
    setId(id: string): TextInput;
    setName(name: string): TextInput;
    setDescription(description: string): TextInput;
    setGetter(getter: OptionGetter<DataType>): TextInput;
    setSetter(setter: OptionSetter<DataType>): TextInput;
    exportJSON(server: Server, data: GetterType): Promise<Object>;
    updateData(server: Server, data: SetterType<DataType>): Promise<IOptionsSetterError | void>;
}
