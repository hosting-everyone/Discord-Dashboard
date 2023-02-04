"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const options_interface_1 = require("../../../dashboard/form_options/options.interface");
class TextInput extends options_interface_1.OptionBase {
    constructor() {
        super(...arguments);
        this.type = options_interface_1.EFormTypes.TextInput;
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
    setGetter(getter) {
        this.get = getter;
        return this;
    }
    setSetter(setter) {
        this.set = setter;
        return this;
    }
    async exportJSON(server, data) {
        const value = await this.get(data);
        return structuredClone({
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            value,
        });
    }
    async updateData(server, data) {
        return this.set(data);
    }
}
exports.TextInput = TextInput;
