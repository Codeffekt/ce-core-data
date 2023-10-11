import { IndexType } from "../core/core.model";
import { FormBlock, FormInstance, FormInstanceBase } from "./forms.model";

export interface IFormRootEntity {
    _formBase: FormInstanceBase;
    _properties: string[];
    _getFormInstance(id: IndexType, author?: IndexType): FormInstance;
}

export class FormRootFactory {
    private static MODELS: { id: string, constr: any }[] = [];
    private static storeModels = false;

    static useModelsStorage(v: boolean) {
        FormRootFactory.storeModels = v;
    }

    static addModel(model: { id: string, constr: any }) {
        if (FormRootFactory.storeModels) {
            FormRootFactory.MODELS.push(model);
        }
    }

    static getModels() {
        return FormRootFactory.MODELS;
    }
}

export function FormRootEntity(params?: { title?: string, id?: string, table?: string }) {

    return function classDecorator<T extends { new(...args: any[]): {} }>(constr: T) {

        const id = params ? params.id || constr.name : constr.name;
        const newConstr = class extends constr implements IFormRootEntity {
            _formBase: FormInstanceBase = {
                content: {},
                ...constr.prototype._formBase,
                id,
                title: params.title,
                table: params.table,
                ctime: Date.now(),
            };

            _properties: string[] = [...constr.prototype._properties];

            _getFormInstance(id: IndexType, author?: IndexType): FormInstance {
                const target: any = this;
                const formRootContent: { [field: string]: FormBlock } = {};
                for (const field in this._formBase.content) {
                    const block = { ...this._formBase.content[field] };
                    if (block.type === "timestamp" && (target[field] instanceof Date)) {
                        block.value = target[field].getTime();
                    } else {
                        block.value = target[field];
                    }
                    formRootContent[field] = block;
                }
                return {
                    id,
                    valid: true,
                    root: this._formBase.id,
                    table: this._formBase.table,
                    title: this._formBase.title,
                    ctime: Date.now(),
                    content: formRootContent,
                    author
                };
            }

            constructor(...args: any[]) {
                super(args);
                const obj = this as any;
                this._properties
                    .filter(key => obj[key] === undefined)
                    .forEach(key => obj[key] = undefined);
                this._properties
                    .filter(key => obj[key] !== undefined && obj._formBase.content[key].defaultValue === undefined)
                    .forEach(key => {
                        obj._formBase.content[key].defaultValue = obj[key];
                        obj._formBase.content[key].value = obj[key];
                    });
            }
        };

        FormRootFactory.addModel({ id, constr: newConstr });

        return newConstr;
    };
}

export function FormBlockEntity(params?: Partial<FormBlock>) {
    return (
        target: any,
        propertyKey: string
    ): void => {

        if (!target._formBase) {
            target._formBase = { content: {} };
        }

        if (!target._properties) {
            target._properties = [];
        }

        const fieldName = params ? params.field || propertyKey : propertyKey;

        target._formBase.content[fieldName] = {
            field: fieldName,
            defaultValue: target[propertyKey] || params.value || params.defaultValue,
            ...params,
        } as FormBlock;
        target._properties.push(propertyKey);
    };
}

export function getFormModel(entity: any): FormInstanceBase {

    if (!entity._formBase) {
        throw new Error("Cannot get form model, property _formBase missing");
    }

    return entity._formBase as FormInstanceBase;
}

export function getFormId(entity: any): IndexType {

    if (!entity._formBase) {
        throw new Error("Cannot get form id, property _formBase missing");
    }

    return entity._formBase.id;
}
