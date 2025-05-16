import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockRootParams {
    fields?: IndexType[];
}

export interface FormBlockRoot extends FormBlock<IndexType> {
    type: "root";
    cat?: IndexType;
    params?: FormBlockRootParams;
}