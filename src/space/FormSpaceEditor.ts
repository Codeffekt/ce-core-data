import { IndexType } from "../core/core.model";
import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { FormInstance, FormRoot } from "../forms/forms.model";
import { FormWrapper } from "../forms/FormWrapper";
import { SpacesEditorVector2 } from "./SpacesEditorFormat";

@FormRootEntity({ id: FormSpaceEditorLayout.ROOT, title: "Form space editor layout" })
export class FormSpaceEditorLayout {
    
    static readonly ROOT = "forms-space-editor-layout";

    @FormBlockEntity({ type: "text"})
    id: string;
    
    @FormBlockEntity({ type: "object"})
    coords: SpacesEditorVector2;
}

@FormRootEntity({ id: FormSpaceEditorFormatContext.ROOT, title: "Form Space Editor Format Context" })
export class FormSpaceEditorFormatContext {
    
    static readonly ROOT = "forms-space-editor-format-context";

    @FormBlockEntity({ type: "text"})
    name: string;
    
    @FormBlockEntity({ type: "text"})
    version: string;    
}

@FormRootEntity({ id: FormSpaceEditorFormat.ROOT, title: "Form Space Editor Format" })
export class FormSpaceEditorFormat {

    static readonly ROOT = "forms-space-editor-format";

    @FormBlockEntity({ type: "index"})
    context: IndexType;    

    @FormBlockEntity({ type: "formArray"})
    forms: FormRoot[];

    @FormBlockEntity({ type: "formArray"})
    nodes: FormSpaceEditorLayout[];
}

export class FormSpaceEditorFormatWrapper extends FormWrapper<FormSpaceEditorFormat> {
    
    constructor(form: FormInstance) {
        super(FormWrapper.createProps(form), form);
    }

    getRootsRef() {
        return `forms-${this.core.id}`;
    }

    getNodesRef() {
        return `nodes-${this.core.id}`;
    }
}

export class FormSpaceEditorFormatContextWrapper extends FormWrapper<FormSpaceEditorFormatContext> {

    constructor(form: FormInstance) {
        super(FormWrapper.createProps(form), form);
    }    

}

export class FormSpaceEditorLayoutWrapper extends FormWrapper<FormSpaceEditorLayout> {

    constructor(form: FormInstance) {
        super(FormWrapper.createProps(form), form);
    }   

}