import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockArrayParams {
    ref?: IndexType;
    fields?: IndexType[];
}

export interface FormBlockArray extends FormBlock<void> {        
    type: "formArray"|"formAssoc";
    root?: IndexType;    
    cat?: IndexType;
    params?: FormBlockArrayParams;    
}