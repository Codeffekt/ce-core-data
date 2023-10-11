import { IndexType } from "../core/core.model";

export interface EventMessage {
    id: IndexType;
    type: string;
    name: string;
    params?: any;
}
