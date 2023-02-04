"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionBase = exports.EFormTypes = void 0;
var EFormTypes;
(function (EFormTypes) {
    EFormTypes["CategoriesSet"] = "CategoriesSet";
    EFormTypes["Category"] = "Category";
    EFormTypes["TextInput"] = "TextInput";
})(EFormTypes = exports.EFormTypes || (exports.EFormTypes = {}));
class OptionBase {
    constructor() {
        this.callable = true; // updateData will be called
        this.id = "";
        this.name = "";
    }
}
exports.OptionBase = OptionBase;
