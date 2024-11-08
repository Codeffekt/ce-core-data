import { IndexType } from "../core/core.model";

export type FormEventType = "update";

export interface FormEvent {
    type:  FormEventType;
    elts: IndexType[];
    author: IndexType;
    time: number;
}