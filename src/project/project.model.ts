import { IndexType, ProjectSettingsError } from "../core/core.model";
import { FormInstance } from "../forms/forms.model";
import { FormWrapper } from "../forms/FormWrapper";
import { FormUtils } from "../forms/FormUtils";

export type ProjectType = string;

export interface ProjectTypeLabel {
    label: string;
    projectType: ProjectType;
}

export type ProjectStatus = "TODO" | "FINISHED" | "RUNNING";
/* export interface Project extends CoreIndexElt {
    type: ProjectType;
    name: string;
    status: ProjectStatus;
    account: IndexType;
    assets: IndexType;
    tunnelOrigin?: IndexType;
    forms: FormCreator[];
    params?: ProjectParams;
} */

export function getProjectCreator(project: FormInstance, id: IndexType) {
    const block = FormUtils.getBlocks(project).find(b => b.field === id);
    if (block !== undefined) {
        return block;
    }
    throw new ProjectSettingsError(
        `Creator ${id} not found for project ${FormWrapper.getFormValue("name", project)}`,
        { id, pid: project.id }
    );
}

export function haveProjectCreator(project: FormInstance, id: IndexType) {
    return FormUtils.getBlocks(project)
        .find(block => block.field === id) !== undefined;
}

export function getProjectRoot(project: FormInstance, id: IndexType) {
    return getProjectCreator(project, id).root;
}

export function getProjectRef(project: FormInstance, id: IndexType) {
    return getProjectCreator(project, id).params.ref;
}