import { CoreIndexElt, IndexType } from "../core/core.model";
import { FormWrapper } from "./FormWrapper";

export const FORM_BLOCK_TYPE_INDEX = "index";
export const FORM_BLOCK_TYPE_TEXT = "text";
export const FORM_BLOCK_TYPE_FORM_ARRAY = "formArray";
export const FORM_BLOCK_TYPE_FORM_ASSOC = "formAssoc";
export const FORM_BLOCK_TYPE_ASSET_ARRAY = "assetArray";

export const FORM_MASK_ROOT = "forms-mask";
export const FORM_STYLE_ROOT = "forms-style";

export type FormBlockType = "text" | "select"
    | "number" | "boolean" | "timestamp"
    | "coordinates" | "index" | "formArray"
    | "formAssoc" | "mask" | "asset"
    | "barcode" | "object" | "style"
    | "assetArray" | "root" | "rootArray"
    | "factory" | "action";

export interface FormBlock {
    field: string;
    label?: string;
    unit?: string;
    value?: any;
    root?: IndexType;
    index?: IndexType;
    defaultValue?: any;
    description?: string;
    type?: FormBlockType;
    params?: any;
    required?: boolean; // default true
    disabled?: boolean; // default false
    readonly?: boolean; // default false
    hint?: string;
}

export interface FormBlockSelectOption<T = string | number> {
    label: string;
    value: T;
}
export interface FormBlockSelectParams {
    options: FormBlockSelectOption[];
}

export interface FormBlockValidator {
    id: string;
    params?: any;
}
export interface FormBlockNumberParams {
    signed: boolean;
    nullable: boolean;
    decimal: boolean;
    digits: number;
    validators: FormBlockValidator[];
}

export interface FormCreator {
    id: IndexType; // unique id
    root: IndexType; // FormRoot id to create the form
    ref: IndexType; // Form ref assoc to store the form
    fields?: string[];
    extMode?: boolean;
    shared?: boolean; // if this assoc is shared between multiple projects
    usedHasParams?: boolean; // use this assoc with the project params service
}

export interface FormVersion {
    // link to the current version, use this to retrieve full form history
    // when head is undefined => form was deleted
    head?: IndexType;
    prev?: IndexType; // link prev history version
    next?: IndexType; // link next history version
    author?: IndexType; // who made the changes could be != form author
}

export interface FormInstanceBase extends CoreIndexElt {
    title: string;
    content: { [field: string]: FormBlock };
    table?: string;
    version?: FormVersion;
    type?: IndexType; // used to group different roots id
}

export interface FormInstance extends FormInstanceBase {
    valid: boolean;
    root: IndexType;
    author?: IndexType; // who created this form ?    
}

export interface FormInstanceExt extends FormInstance {
    forms?: FormInstance[];
    fields?: {
        [field: string]: FormInstance | FormWrapper<any>;
    };
}

export type FormRoot = FormInstanceBase;

export type FormMask = Partial<FormInstance>;

export interface FormStyleCard {
    title?: string;
    blocks: string[];
}
export interface FormStyle {
    orderBlock?: IndexType[];
    cards?: FormStyleCard[];
}

export interface FormArray {
    root: IndexType;
    elts: IndexType[];
}

export interface FormAssoc {
    ref: IndexType;
    form: IndexType;
}

export type FormQueryFieldType = "array" | "date" | "integer" | "double" | "timestamp" | "object" | "text" | "form" | "formAssoc";

export type FormQueryFieldOp = "=" | "!=" | "<" | ">" | ">=" | "<=" | "~~" | "~~*" | "!~~" | "!~~*" | "@>" | "<@" | "[]" | "]]" | "][" | "[[";

export interface FormQueryFieldDateOp {
    op: '-' | '+';
    duration: number;
    unit: 'seconds' | 'days' | 'months' | 'years';
    startOf?: 'year' | 'month' | 'week' | 'isoWeek' | 'day' | 'hour';
}

export interface FormQueryFieldParent {
    field: string;
    onMeta?: boolean
    context?: string;
}

export interface FormQueryFieldAssoc {
    ref?: string;
    refs?: string[];
    field?: string;
    onMeta?: boolean;
    value?: string;    
}

export interface FormQueryField<T = string | number | FormQueryFieldDateOp | FormQueryFieldParent | FormQueryFieldAssoc> {
    context?: string;
    field: string;
    fieldsPath?: string[];
    value?: T;
    values?: T[];
    type?: FormQueryFieldType;
    op?: FormQueryFieldOp;
    onMeta?: boolean;
}

export interface FormQuerySortField {
    type?: FormQueryFieldType;
    context?: string;
    field: string;
    fieldsPath?: string[];
    order?: "asc" | "desc";
    onMeta?: boolean;
}

export type FormQueryFieldExpr = FormQueryFieldLogic | FormQueryField;

export interface FormQueryFieldLogic {
    and?: FormQueryFieldExpr[];
    or?: FormQueryFieldExpr[];
}


export type FormAggFieldOp = "count" | "avg" | "sum" | "max" | "min";
export interface FormAggField {
    context?: string;
    field: string;
    op: FormAggFieldOp;
    root?: string;
    index?: string;
}

export interface FormFilter {
    queryFields?: FormQueryFieldLogic | FormQueryFieldExpr[];
    ref?: IndexType | FormQueryField<string>;
    refs?: IndexType[];
    op?: "=" | "!=";
}

export interface FormQuery {
    ref?: IndexType;
    refs?: IndexType[];
    root?: IndexType;
    table?: IndexType;
    formRoot?: IndexType;
    extMode?: boolean;
    withMaskCat?: IndexType;
    withStyleCat?: IndexType;
    extFields?: string[];
    extSubFields?: string[];
    queryFields?: FormQueryFieldLogic | FormQueryFieldExpr[];
    aggFields?: FormAggField[];
    filters?: FormFilter[];
    limit?: number;
    offset?: number;
    sortFields?: FormQuerySortField[];
    sortOrderCTime?: "asc" | "desc";
    sortOrderMTime?: "asc" | "desc";
    indices?: IndexType[];
    indicesExcluded?: boolean;
    cTimeRange?: [number, number];
    queryRootFields?: FormQueryFieldLogic | FormQueryFieldExpr[];
    sortRootFields?: FormQuerySortField[];
}

export type FormMutateType = 'form' | 'formArray' | 'formAssoc' | 'factory';

export type FormMutateOp = 'create' | 'update' | 'delete' | 'fork' | 'add' | 'upgrade';


export interface FormMutateFields {
    excludes?: IndexType[];
    includes?: IndexType[];
}

export interface FormPreFilledProps {
    root: IndexType;
    props: { [key: string]: any }
}

export interface FormMutate {
    author?: IndexType;
    type?: FormMutateType;
    op?: FormMutateOp;
    props?: FormPreFilledProps[];
    indices?: IndexType[];
    elts?: FormInstance[];
    root?: IndexType;
    rootField?: IndexType;
    ref?: IndexType;
    formArrayField?: string;
    formEltField?: string;
    fields?: FormMutateFields;
}
