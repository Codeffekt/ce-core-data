import { IndexType } from "../core/core.model";
import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormWrapper } from "../forms/FormWrapper";

@FormRootEntity({ id: FormTemplate.ROOT, title: "Form Template" })
export class FormTemplate {

    static readonly ROOT = "forms-template";

    @FormBlockEntity({ type: "text" })
    root: IndexType;    

    @FormBlockEntity({ type: "index" })
    form: IndexType;           

    @FormBlockEntity({ type: "text" })
    name: string;
}

export class FormTemplateWrapper extends FormWrapper<FormTemplate> {
    constructor() {
        super(new FormTemplate());
    }    
}