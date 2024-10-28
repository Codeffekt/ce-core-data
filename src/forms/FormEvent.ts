import { IndexType } from "../public-api";

export type FormEventType = "update";

export interface FormEvent {
    type:  FormEventType;
    elts: IndexType[];
    author: IndexType;
    time: number;
}