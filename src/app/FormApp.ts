import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormWrapper } from "../forms/FormWrapper";
import { ProjectType } from "../project/project.model";

@FormRootEntity({ id: FormApp.ROOT, title: "Form App"})
export class FormApp {

    static readonly ROOT = "forms-app";

    @FormBlockEntity({ type: "text" })
    name: string;

    @FormBlockEntity({ type: "text" })
    type: ProjectType;

    @FormBlockEntity({ type: "text" })
    category: string;

    @FormBlockEntity({ type: "text" })
    title: string;

    @FormBlockEntity({ type: "text" })
    description: string;
}

export class FormAppWrapper extends FormWrapper<FormApp> {
    
    constructor() {
        super(new FormApp());
    }

}