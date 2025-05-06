import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockIndexParams {
    scope?: "global";
    fields?: IndexType[];
}

export interface FormBlockIndex extends FormBlock<IndexType> {        
    type: "index";
    root?: IndexType;
    cat?: IndexType;
    params?: FormBlockIndexParams;    
}