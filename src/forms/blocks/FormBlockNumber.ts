import { FormBlock } from "./FormBlock";
import { FormBlockValidator } from "./FormBlockValidator";

export interface FormBlockNumberParams {
    signed: boolean;
    nullable: boolean;
    decimal: boolean;
    digits: number;
    validators: FormBlockValidator[];
}

export interface FormBlockNumber extends FormBlock<number> {        
    type: "number";
    params?: FormBlockNumberParams;    
}