import {
    EFormTypes,
    GetterType,
    OptionBase,
} from "@/dashboard/form_options/options.interface";
import { Server } from "@/server/server";

import { OptionType } from "@/dashboard/form_options/options.interface";

export class OptionsCategory extends OptionBase {
    type = EFormTypes.Category;
    children: OptionType[] = [];
    callable = false;

    public setId(id: string): OptionsCategory {
        this.id = id;
        return this;
    }

    public setName(name: string): OptionsCategory {
        this.name = name;
        return this;
    }

    public setDescription(description: string): OptionsCategory {
        this.description = description;
        return this;
    }

    public setChildren(children: OptionType[]): OptionsCategory {
        this.children = children;
        return this;
    }

    public async exportJSON(server: Server, data: GetterType): Promise<Object> {
        const children = await Promise.all(
            Object.values(this.children).map((option) =>
                option.exportJSON(server, data)
            )
        );

        return structuredClone({
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            children,
        });
    }
}
