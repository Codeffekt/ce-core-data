import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockIndexParams {
    useCategory?: boolean;
    scope?: "global";
    fields?: IndexType[];
}

export interface FormBlockIndex extends FormBlock<IndexType> {        
    type: "index";
    root?: IndexType;    
    params?: FormBlockIndexParams;    
}