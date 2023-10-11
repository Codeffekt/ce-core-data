import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormCreator } from "../forms/forms.model";
import { ProjectType } from "./project.model";
import { ProjectParams } from "./ProjectParams";

@FormRootEntity({ id: FormProjectTemplate.ROOT })
export class FormProjectTemplate {

    static readonly ROOT = "forms-project-template";

    @FormBlockEntity({ type: "text" })
    type: ProjectType;

    @FormBlockEntity({ type: "text" })
    name: string;

    @FormBlockEntity({ type: "object" })
    forms: FormCreator[];

    @FormBlockEntity({ type: "object" })
    params?: ProjectParams;
}
