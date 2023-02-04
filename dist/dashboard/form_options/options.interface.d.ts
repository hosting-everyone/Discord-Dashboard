import { Guild, User } from "discord.js";
import { OptionsCategoriesSet } from "../../dashboard/form_options/category/set";
import { OptionsCategory } from "../../dashboard/form_options/category/category";
import { TextInput } from "../../dashboard/form_options/types/textinput";
export declare enum EFormTypes {
    CategoriesSet = "CategoriesSet",
    Category = "Category",
    TextInput = "TextInput"
}
export type GetterType = {
    user: User;
    guild?: Guild;
};
export type SetterType<T> = {
    user: User;
    guild?: Guild;
    value: T;
};
export type OptionGetter<T> = (data: GetterType) => T;
export type OptionSetter<T> = (data: SetterType<T>) => void | IOptionsSetterError;
export declare class OptionBase {
    callable: boolean;
    value: any;
    protected type: string;
    id: string;
    protected name: string;
    protected description?: string;
}
export interface IOptionsSetterError {
    error: string;
    message: string;
    possible_solution?: string;
}
export type BuiltInOptionTypes = OptionsCategoriesSet | OptionsCategory | TextInput;
export type OptionType = BuiltInOptionTypes;
