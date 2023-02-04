"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsCategory = void 0;
const options_interface_1 = require("../../../dashboard/form_options/options.interface");
class OptionsCategory extends options_interface_1.OptionBase {
    constructor() {
        super(...arguments);
        this.type = options_interface_1.EFormTypes.Category;
        this.children = [];
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
    setChildren(children) {
        this.children = children;
        return this;
    }
    async exportJSON(server, data) {
        const children = await Promise.all(Object.values(this.children).map((option) => option.exportJSON(server, data)));
        return structuredClone({
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            children,
        });
    }
}
exports.OptionsCategory = OptionsCategory;
