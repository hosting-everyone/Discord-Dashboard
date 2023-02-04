"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsCategoriesSet = void 0;
const options_interface_1 = require("../../../dashboard/form_options/options.interface");
class OptionsCategoriesSet extends options_interface_1.OptionBase {
    constructor() {
        super(...arguments);
        this.type = options_interface_1.EFormTypes.CategoriesSet;
        this.children = {};
        this.callable = false;
    }
    setId(id) {
        this.id = id;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setChildren(categories) {
        for (const category of categories) {
            this.children[category.id] = category;
        }
        return this;
    }
    async exportJSON(server, data) {
        const children = await Promise.all(Object.values(this.children).map((category) => category.exportJSON(server, data)));
        return structuredClone({
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            children,
        });
    }
}
exports.OptionsCategoriesSet = OptionsCategoriesSet;
