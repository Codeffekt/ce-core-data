import { IndexType } from "../core/core.model";
import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormWrapper } from "../forms/FormWrapper";

@FormRootEntity({ id: FormSharing.ROOT, title: "Form Sharing"})
export class FormSharing {

    static readonly ROOT = "forms-sharing";

    @FormBlockEntity({ type: "text"})
    root: IndexType;

    @FormBlockEntity({ type: "text"})
    id: IndexType;

    @FormBlockEntity({ type: "text"})
    login: IndexType;

    @FormBlockEntity({ type: "text"})
    group: IndexType;

    @FormBlockEntity({ type: "object"})
    authz: Object;

    @FormBlockEntity({ type: "index"})
    form: IndexType;
}

export class FormSharingWrapper extends FormWrapper<FormSharing> {

    constructor() {
        super(new FormSharing());
    }

}