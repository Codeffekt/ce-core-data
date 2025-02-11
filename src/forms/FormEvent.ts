import { IndexType } from "../core/core.model";
import { FormInstance } from "./forms.model";

export type FormEventType = "update";

export interface FormEvent {
    type:  FormEventType;
    elts: IndexType[] | FormInstance[];
    author: IndexType;
    time: number;
}