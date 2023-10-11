import { IndexType } from "../core/core.model";
import { FormBlockEntity, FormRootEntity } from "./FormRoot";
import {
    FormBlock, FormInstance,
    FormMask, FormStyle,
    FormStyleCard, FORM_MASK_ROOT
} from "./forms.model";
import { FormWrapper } from "./FormWrapper";

@FormRootEntity({ id: FORM_MASK_ROOT, title: "Masque" })
export class FormInstanceMask {

    @FormBlockEntity({ type: 'index' })
    root: IndexType;

    @FormBlockEntity({ type: 'boolean' })
    disabled: IndexType;

    @FormBlockEntity({ type: 'index' })
    category: IndexType;

    @FormBlockEntity({ type: 'mask' })
    mask: FormMask;

    @FormBlockEntity({ type: 'style' })
    style: FormStyle;
}

function getMaskValueWithDisabledBlock(blocks: FormBlock[]): FormMask {
    return {
        content: blocks.reduce((prev, cur) => ({
            ...prev,
            [cur.field]: { disabled: true }
        }), {})
    };
}

function createMaskWithDisabledBlock(blocks: FormBlock[]) {
    return new FormInstanceMaskWrapper({
        id: "",
        ctime: 0,
        title: "",
        valid: true,
        root: FORM_MASK_ROOT,
        content: {
            mask: {
                field: "mask",
                type: "mask",
                value: getMaskValueWithDisabledBlock(blocks),
            },
            style: {
                field: "style",
                type: "style",
                value: undefined
            }
        }
    });
}

export class FormInstanceMaskWrapper extends FormWrapper<FormInstanceMask> {
    constructor(form?: FormInstance) {
        super(new FormInstanceMask(), form);
    }

    setTitle(title: string) {
        this.props.mask.title = title;
        return this;
    }

    setFieldParams(field: string, params: any) {
        this.props.mask.content[field] = {
            ...this.props.mask.content[field],
            params
        }
        return this;
    }

    without(form: FormInstance, fieldsToRemove: IndexType[]) {
        this.props.mask = {
            ...this.props.mask, ...getMaskValueWithDisabledBlock(Object.values(form.content)
                .filter(block => fieldsToRemove.includes(block.field)))
        };
        return this;
    }

    withCards(cards: FormStyleCard[]) {
        this.props.style = { ...this.props.style, cards: cards };
        return this;
    }

    withOnly(form: FormInstance, fieldsToKeep: IndexType[]) {
        this.props.mask = {
            ...this.props.mask,
            ...getMaskValueWithDisabledBlock(Object.values(form.content)
                .filter(block => !fieldsToKeep.includes(block.field)))
        };
        return this;
    }

    withOrder(fields: IndexType[]) {
        this.props.style = { ...this.props.style, orderBlock: fields };
        return this;
    }

    static emptyForRoot(root: string): FormInstanceMaskWrapper {
        return new FormInstanceMaskWrapper({
            id: "",
            ctime: Date.now(),
            title: "",
            valid: true,
            root: FORM_MASK_ROOT,
            content: {
                mask: {
                    field: "mask",
                    type: "mask",
                    value: undefined
                },
                style: {
                    type: "style",
                    field: "style",
                    value: undefined
                },
                root: {
                    type: "index",
                    field: "root",
                    value: root
                }
            }
        });
    }

    static withOnly(form: FormInstance, fieldsToKeep: IndexType[]) {
        const disabledBlocks = Object.values(form.content)
            .filter(block => !fieldsToKeep.includes(block.field));
        return createMaskWithDisabledBlock(disabledBlocks);
    }

    static without(form: FormInstance, fieldsToRemove: IndexType[]) {
        const disabledBlocks = Object.values(form.content)
            .filter(block => fieldsToRemove.includes(block.field));
        return createMaskWithDisabledBlock(disabledBlocks);
    }

    static withOrder(fields: IndexType[]) {
        return new FormInstanceMaskWrapper({
            id: "",
            ctime: 0,
            title: "",
            valid: true,
            root: FORM_MASK_ROOT,
            content: {
                style: {
                    type: "style",
                    field: "style",
                    value: {
                        orderBlock: fields
                    }
                },
                mask: {
                    type: "mask",
                    field: "mask",
                    value: undefined
                }
            }
        });
    }
}