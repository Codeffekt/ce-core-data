import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormWrapper } from "../forms/FormWrapper";

export type ProcessingStatus = "PENDING" | "RUNNING" | "DONE" | "ERROR";

export type ProcessingType = "INTERNAL";

export type ProcessingMsgType = "UPDATE" | "ERROR" | "DONE";

export interface ProcessingMsg {
    type: ProcessingMsgType;
    data: Partial<Processing>;
}

export interface ProcessingProgress {
    count: number;
    total: number;
}

@FormRootEntity({ id: Processing.ROOT, title: "Formulaire Processing", table: "processing" })
export class Processing {

    static readonly ROOT = "forms-processing";

    @FormBlockEntity({ type: "select"})
    status: ProcessingStatus = "PENDING";

    @FormBlockEntity({ type: "select"})
    type: ProcessingType = "INTERNAL";

    @FormBlockEntity({ type: "text"})
    name: string;

    @FormBlockEntity({ type: "text"})
    description: string;

    @FormBlockEntity({ type: "object"})
    params?: any;

    @FormBlockEntity({ type: "text"})
    message?: string;

    @FormBlockEntity({ type: "object"})
    res?: any;

    @FormBlockEntity({ type: "object"})
    progress?: ProcessingProgress;
}

export class ProcessingWrapper extends FormWrapper<Processing> {

    constructor() {
        super(new Processing());
    }

}