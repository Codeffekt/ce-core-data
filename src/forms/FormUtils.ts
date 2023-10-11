import { FormWrapper } from "./FormWrapper";
import { IndexType, CoreIndexElt, Utils } from "../core/core.model";
import {
    FormBlock, FormInstance,
    FormInstanceExt, FormQueryField, FormRoot,
    FORM_BLOCK_TYPE_FORM_ARRAY,
    FORM_BLOCK_TYPE_INDEX,
    FORM_MASK_ROOT, FORM_STYLE_ROOT
} from "./forms.model";

/**
 * Utility functions to manager Forms parts
 */
export class FormUtils {

    static isBlockIndex(block: FormBlock): boolean {
        return block && block.type === FORM_BLOCK_TYPE_INDEX;
    }

    static isBlockFormArray(block: FormBlock): boolean {
        return block.type === FORM_BLOCK_TYPE_FORM_ARRAY;
    }

    static isBlockHaveSubFormIndex(block: FormBlock): boolean {
        return this.isBlockIndex(block) && block.required && block.index !== undefined;
    }

    static haveFieldValue(form: FormInstance, query: FormQueryField) {
        return form.content instanceof Array ?
            form.content.find(_ => _.field === query.field && _.value === query.value) !== undefined :
            (form.content[query.field] && form.content[query.field].value === query.value);
    }

    static getBlockFromField(form: FormRoot, field: string): FormBlock {
        return form.content instanceof Array ?
            form.content.find(_ => _.field === field) : form.content[field];
    }

    static getBlocksAsArray(form: FormRoot, wrapper?: FormWrapper): FormBlock[] {
        return form.content instanceof Array ? form.content :
            Object.keys(wrapper ? wrapper.props : form.content).map(_ => (<any>form.content)[_] as FormBlock);
    }

    static haveSameField(a: FormQueryField, b: FormQueryField): boolean {
        return (a.field === b.field) && (a.context === b.context);
    }

    static getFormField(fieldName: string, form: FormInstanceExt) {
        return (form.fields && form.fields[fieldName] as FormInstance) || undefined;
    }

    static getBlocks(form: FormRoot): FormBlock[] {
        return form.content instanceof Array ? form.content : Object.values(form.content);
    }

    static createFormAssocRef(id: IndexType, field?: IndexType) {
        return field ? `${field}-${id}` : id;
    }

    static isPropDefined(fieldName: string, form: FormInstance): boolean {
        return this.isDefined(form.content[fieldName]);
    }

    static isDefined(v: any) {
        return v != undefined;
    }

    static addLocalForm(form: FormInstanceExt, f: FormInstance) {
        if (!f) {
            return;
        }

        form.forms = form.forms ? form.forms.concat(f) : [f];
    }

    static getFirstLocalStyle(form: FormInstanceExt): FormInstance {
        return form.forms?.find(f => f.root === FORM_STYLE_ROOT);
    }

    static getFirstLocalMask(form: FormInstanceExt): FormInstance {
        return form.forms?.find(f => f.root === FORM_MASK_ROOT);
    }


    static createForm(root: FormRoot, author?: IndexType): FormInstance {
        return FormUtils.createFormWithCore(root, {
            id: Utils.createUnique(),
            ctime: Date.now(),
        }, author);
    }

    static createFormWithCore(root: FormRoot, context: CoreIndexElt, author?: IndexType): FormInstance {
        const newInstance = {
            ...Utils.deepcopy(root),
            valid: true,
            ...context,
            root: root.id,
            author: author
        };
        for (const block of Object.values(newInstance.content)) {
            if (!FormUtils.isDefined(block.value) && FormUtils.isDefined(block.defaultValue)) {
                block.value = block.defaultValue;
            }
        }
        return newInstance;
    }

    static getFormTitle(root: FormRoot) {

        if (!root?.title) {
            return undefined;
        }

        return this.parseValue(root, root.title);
    }

    static parseValue(form: FormRoot, value: string) {        
        return value.replace(/{(\$?\w+)}/g,
            (_, field) => {
                if(field.startsWith('$')) {
                    const metaField = field.slice(1);
                    return form[metaField] ?? '';
                }
                const block = this.getBlockFromField(form, field);
                return block?.value ?? '';
            });
    }
}
