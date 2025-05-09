import { FormBlock } from "./FormBlock";

export interface FormBlockTextParams {
    suggestions?: string[];
    multiline?: boolean;
}

export interface FormBlockText extends FormBlock<string> {        
    type: "text";
    params?: FormBlockTextParams;    
}