import { IndexType } from "../core/core.model";
import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import {
    FormBlock, FormInstance,
    FORM_BLOCK_TYPE_FORM_ARRAY,
    FORM_BLOCK_TYPE_FORM_ASSOC
} from "../forms/forms.model";
import { FormUtils } from "../forms/FormUtils";
import { FormWrapper } from "../forms/FormWrapper";
import { ProjectStatus, ProjectType } from "./project.model";
import { ProjectParams } from "./ProjectParams";

export const FORM_PROJECT_ASSETS_FIELD = "_assets";

@FormRootEntity({ id: FormProject.ROOT, title: "Form Project" })
export class FormProject {

    static readonly ROOT = "forms-project";

    @FormBlockEntity({ type: "text" })
    type: ProjectType;

    @FormBlockEntity({ type: "text" })
    name: string;

    @FormBlockEntity({ type: "text" })
    account: IndexType;

    @FormBlockEntity({ type: "object" })
    params?: ProjectParams;

    /*
    * We use a specific field name starting with '_'
    * while we could both assets on form project and other forms
    * that leads to some problem when using the checkTable options
    * in FormMutateFacade
    */
    @FormBlockEntity({ type: 'text' })
    _assets?: string;

    @FormBlockEntity({ type: 'select' })
    status: ProjectStatus;
}

export class FormProjectWrapper extends FormWrapper<FormProject> {

    constructor(form: FormInstance) {
        super(FormWrapper.createProps(form), form);
    }

    getFormsBlocks(): FormBlock[] {
        const blocks = FormUtils.getBlocksAsArray(this.core);
        return blocks.filter(block =>
            block.type === FORM_BLOCK_TYPE_FORM_ARRAY ||
            block.type === FORM_BLOCK_TYPE_FORM_ASSOC
        );
    }

    getFormBlock(field: string): FormBlock | undefined {
        const blocks = this.getFormsBlocks();
        return blocks.find(b => b.field === field);
    }

    getAssetsRef() {
        return this.props._assets ?? this.core.id;
    }

    static getAssetsRef(form: FormInstance) {
        return FormWrapper.getFormValue(FORM_PROJECT_ASSETS_FIELD, form) ?? form.id;
    }    
}