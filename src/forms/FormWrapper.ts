import { FormRoot, FormInstance, FormBlock, FormInstanceExt } from "./forms.model";
import { CoreIndexElt } from "../core/core.model";
import { AccountSettings } from "../account/account.model";
import { FormUtils } from "./FormUtils";

interface OpsElt {
    key: string;
    func: (block: FormBlock, params: any) => any;
}

type WrapperConstructor = new (form?: FormRoot) => FormWrapper<any>;

const OPS_FACTORY: OpsElt[] = [
    {
        key: "set",
        func: (block: FormBlock, value: number) => {

            if (block.type !== "number") {
                throw new Error("Operator invalid on type " + block.type);
            }

            return value;
        }
    },
    {
        key: "add",
        func: (block: FormBlock, value: number) => {

            if (block.type !== "number") {
                throw new Error("Operator invalid on type " + block.type);
            }

            return block.value + value;
        }
    },
    {
        key: "minus",
        func: (block: FormBlock, value: number) => {

            if (block.type !== "number") {
                throw new Error("Operator invalid on type " + block.type);
            }

            return block.value - value;
        }
    }
];

function convertTimestampToDate(value: string | number | Date): Date {
    return value instanceof Date ? value : isNaN(parseInt(value as string)) ? undefined : new Date(parseInt(value as string));
}

function convertDateToTimestamp(value: string | number | Date): number {
    return value instanceof Date ? value.getTime() : isNaN(parseInt(value as string)) ? undefined : parseInt(value as string);
}
export class FormWrapper<T = any> {

    core: FormInstance;

    fields?: {
        [field: string]: FormInstance | FormWrapper;
    };

    author?: AccountSettings;

    constructor(public props: T, form?: FormInstance, author?: AccountSettings) {

        if (form) {
            this.core = form;
            this.update(form);
        }

        this.author = author;
    }

    static fromForm<T>(form: FormInstance, author?: AccountSettings): FormWrapper<T> {
        return new FormWrapper<T>(
            FormWrapper.createProps(form),
            form,
            author
        );
    }


    static createProps(form: FormRoot, useDefaultValues = false): any {
        const res: any = {};
        if (form.content instanceof Array) {
            form.content.forEach(elt => {
                res[elt.field] = FormWrapper.getFormValue(elt.field, form, useDefaultValues);
            });
        } else {
            Object.keys(form.content).forEach(key => {
                res[key] = FormWrapper.getFormValue(key, form, useDefaultValues);
            });
        }
        return res;
    }

    static createPropsWithCore(form: FormRoot): any {
        return {
            ...this.createProps(form),
            id: form.id,
            ctime: form.ctime,
            mtime: form.mtime,
        }
    }

    static getFormValue(field: string, form: FormRoot, useDefaultValue = false): any {
        const elt = form?.content instanceof Array ? form.content.find(f => f.field === field) : form?.content[field];
        if (elt) {
            const value = useDefaultValue ? elt.defaultValue : elt.value;
            if (elt.type === "number") {
                const numValue = parseFloat(value);
                return isNaN(numValue) ? undefined : numValue;
            } else if (elt.type === "boolean") {
                try {
                    return !!JSON.parse(value); // convert "false|true" or 0|1 or false|true
                } catch (e) {
                    return undefined;
                }
            } else if (elt.type === "timestamp") {
                return convertTimestampToDate(value);
            } else if (elt.type === "coordinates") {
                return value instanceof Array ? value.map((v: any) => parseFloat(v)) : value;
            } else {
                return value;
            }
        }
    }

    static setFormValue(field: string, value: any, form: FormRoot): void {
        const elt = form?.content && (form?.content instanceof Array ? form.content.find(_ => _.field === field) : form?.content[field]);
        if (elt) {
            if (elt.type === "timestamp") {
                elt.value = convertDateToTimestamp(value);
            } else {
                elt.value = value;
            }
        }
    }

    static setFormValues(props: { [key: string]: any }, form: FormRoot): void {
        for (const entry of Object.entries(props)) {
            this.setFormValue(entry[0], entry[1], form);
        }
    }

    static opFormField(form: FormInstance, field: string, op: string, params: any): FormInstance {

        const fieldBlock = form.content instanceof Array ? form.content.find(_ => _.field === field) : form.content[field];

        if (fieldBlock !== undefined) {
            const operator = OPS_FACTORY.find(_ => _.key === op);
            if (operator !== undefined) {
                fieldBlock.value = operator.func(fieldBlock, params);
            } else {
                throw new Error("Operator " + op + " not found");
            }
        } else {
            throw new Error("Field " + field + " missing on " + form.id + " with root " + form.root);
        }

        return form;
    }

    getPropsWithId(options: {
        setUndefinedPropsToNull: boolean,
        convertDateToTimestamp?: boolean,
    } = {
            setUndefinedPropsToNull: false,
            convertDateToTimestamp: true,
        }): T & CoreIndexElt {
        if (!this.props || !this.core) {
            throw new Error("Cannot get props with id, props or core missing");
        }

        const props = options.setUndefinedPropsToNull ?
            {
                ...this.props, ...Object.keys(this.props)
                    .filter(p => this.props[p as keyof T] === undefined)
                    .map(p => ({ [p]: null }))
                    .reduce((prev, cur) => ({ ...prev, ...cur }), {})
            } : this.props;


        if (convertDateToTimestamp) {
            const core = <any>this.core;
            Object.keys(props).forEach(key => {
                const elt = core.content instanceof Array ? core.content.find((block: any) => block.field === key) : core.content[key];
                if (elt && elt.type === "timestamp") {
                    (<any>props)[key] = convertDateToTimestamp((<any>props)[key]);
                }
            });
        }

        return { ...props, id: this.core.id, ctime: this.core.ctime, mtime: this.core.mtime };
    }

    fill(form?: FormRoot) {

        if (!form) {
            form = this.core;
        }

        Object.keys(this.props).forEach(
            key => FormWrapper.setFormValue(key, (<any>this.props)[key], form)
        );
    }

    update(form: FormRoot) {
        Object.keys(this.props).forEach(
            key => (<any>this.props)[key] = FormWrapper.getFormValue(key, form)
        );
    }

    updateProps(object: Partial<T>, form?: FormRoot) {
        const props: any = this.props;

        if (!form && this.core) {
            form = this.core;
        }

        if (!form) {
            Object.keys(object).forEach(key => props[key] = parseFloat((<any>object)[key]));
        } else {
            Object.keys(object).forEach(key => {
                const objKey = (<any>object)[key];
                const elt = form.content instanceof Array ? form.content.find(_ => _.field === key) : form.content[key];
                if (elt) {
                    if (elt.type === "number") {
                        props[key] = isNaN(parseFloat(objKey)) ? undefined : parseFloat(objKey);
                    } else if (elt.type === "timestamp") {
                        props[key] = convertTimestampToDate(objKey);
                    } else if (elt.type === "boolean") {
                        try {
                            props[key] = !!JSON.parse(objKey); // convert "false|true" or 0|1 or false|true
                        } catch (e) {
                            props[key] = undefined;
                        }
                    } else if (elt.type === "coordinates") {
                        props[key] = objKey instanceof Array ? objKey.map((_: any) => parseFloat(_)) : objKey;
                    } else {
                        props[key] = objKey;
                    }
                }
            });
        }
    }

    getInstanceFromField(field: string): FormInstance {
        return (<FormInstance>(<FormInstanceExt>this.core).fields[field]);
    }

    haveProp(propName: string): boolean {
        return (<any>this.props)[propName] !== undefined;
    }

    isPropDefined(propName: string): boolean {
        return FormUtils.isDefined((<any>this.props)[propName]);
    }

    setFormValid(valid: boolean) {
        (<FormInstance>this.core).valid = valid;
    }

    isFormValid() {
        return (<FormInstance>this.core).valid;
    }

    getFormTitle() {
        return FormUtils.getFormTitle(this.core);
    }

    mergeForm(form: FormInstance) {
        if (!this.core) {
            this.core = form;
        } else {
            this.core = { ...this.core, ...form };
        }
    }

    wrapFields() {
        throw new Error(`Method must be implemented by subclasses`);
    }

    weakClone() {
        const newWrapper = Object.create(this);
        newWrapper.core = this.core;
        newWrapper.props = this.props;
        newWrapper.author = this.author;
        newWrapper.fields = this.fields;
        return newWrapper;
    }
}
