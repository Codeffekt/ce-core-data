import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockArrayParams {
    useCategory?: boolean;
    ref?: IndexType;
    fields?: IndexType[];
    scope?: "global";
}

export interface FormBlockArray extends FormBlock<void> {        
    type: "formArray"|"formAssoc";
    root?: IndexType;        
    params?: FormBlockArrayParams;    
}