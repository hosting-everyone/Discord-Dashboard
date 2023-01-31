import {
    IOptionsSetterError,
    OptionGetter,
    OptionSetter,
} from "@/dashboard/form_options/options.interface";
import type {
    SetterType,
    GetterType,
} from "@/dashboard/form_options/options.interface";

import {
    EFormTypes,
    OptionBase,
} from "@/dashboard/form_options/options.interface";
import { Server } from "@/server/server";

export type DataType = string | null;

export class TextInput extends OptionBase {
    type = EFormTypes.TextInput;

    private get!: OptionGetter<DataType>;
    private set!: OptionSetter<DataType>;

    public setId(id: string): TextInput {
        this.id = id;
        return this;
    }

    public setName(name: string): TextInput {
        this.name = name;
        return this;
    }

    public setDescription(description: string): TextInput {
        this.description = description;
        return this;
    }

    public setGetter(getter: OptionGetter<DataType>): TextInput {
        this.get = getter;
        return this;
    }

    public setSetter(setter: OptionSetter<DataType>): TextInput {
        this.set = setter;
        return this;
    }

    public async exportJSON(server: Server, data: GetterType): Promise<Object> {
        const value = await this.get(data);

        return structuredClone({
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            value,
        });
    }

    public async updateData(
        server: Server,
        data: SetterType<DataType>
    ): Promise<IOptionsSetterError | void> {
        return this.set(data);
    }
}
