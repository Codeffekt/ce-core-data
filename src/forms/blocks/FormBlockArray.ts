import { IndexType } from "../../core/core.model";
import { FormQuery } from "../forms.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockArrayParams {
    useCategory?: boolean;
    ref?: IndexType;
    fields?: IndexType[];
    scope?: "global";
    query?: FormQuery;
}

export interface FormBlockArray extends FormBlock<void> {        
    type: "formArray"|"formAssoc";
    root?: IndexType;        
    params?: FormBlockArrayParams;    
}