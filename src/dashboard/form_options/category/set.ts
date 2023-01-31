import {
    EFormTypes,
    GetterType,
    OptionBase,
} from "@/dashboard/form_options/options.interface";
import { OptionsCategory } from "@/dashboard/form_options/category/category";
import { Server } from "@/server/server";

export class OptionsCategoriesSet extends OptionBase {
    type = EFormTypes.CategoriesSet;
    children: Record<string, OptionsCategory> = {};
    callable = false;

    public setId(id: string): OptionsCategoriesSet {
        this.id = id;
        return this;
    }

    public setName(name: string): OptionsCategoriesSet {
        this.name = name;
        return this;
    }

    public setDescription(description: string): OptionsCategoriesSet {
        this.description = description;
        return this;
    }

    public setChildren(categories: OptionsCategory[]): OptionsCategoriesSet {
        for (const category of categories) {
            this.children[category.id] = category;
        }
        return this;
    }

    public async exportJSON(server: Server, data: GetterType): Promise<Object> {
        const children = await Promise.all(
            Object.values(this.children).map((category) =>
                category.exportJSON(server, data)
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
