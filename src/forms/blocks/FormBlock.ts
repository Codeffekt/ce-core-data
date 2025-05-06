import { IndexType } from "../../core/core.model";

export type FormBlockType = "text" | "select"
    | "number" | "boolean" | "timestamp"
    | "coordinates" | "index" | "formArray"
    | "formAssoc" | "mask" | "asset"
    | "barcode" | "object" | "style"
    | "assetArray" | "root" | "rootArray"
    | "factory" | "action";


export interface FormBlock<T = any> {
    field: string;
    label?: string;
    unit?: string;
    value?: T;
    root?: IndexType;
    index?: IndexType;
    defaultValue?: T;
    description?: string;
    type?: FormBlockType;
    params?: any;
    required?: boolean; // default true
    disabled?: boolean; // default false
    readonly?: boolean; // default false
    hint?: string;
}