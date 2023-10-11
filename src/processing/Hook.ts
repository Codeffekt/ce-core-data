import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormWrapper } from "../forms/FormWrapper";

@FormRootEntity({ id: FormHook.ROOT, title: "Formulaire hook", table: "hooks" })
export class FormHook {

    static readonly ROOT = "forms-hook";

    @FormBlockEntity({ type: "text"})
    name: string;

    @FormBlockEntity({ type: "text"})
    endpoint: string;

    @FormBlockEntity({ type: "text"})
    token: string;

    @FormBlockEntity({ type: "text"})
    root: string;

    @FormBlockEntity({ type: "object"})
    data: any;
}

export class FormHookWrapper extends FormWrapper<FormHook> {

    constructor() {
        super(new FormHook());
    }

}