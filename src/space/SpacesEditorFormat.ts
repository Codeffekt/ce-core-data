import { FormRoot } from "../forms/forms.model";

export interface SpacesEditorNodeLayout {
    id: string;
    coords: SpacesEditorVector2;
}

export interface SpacesEditorLayout {
    nodes: SpacesEditorNodeLayout[];
}

export interface SpacesEditorVector2 {
    x: number;
    y: number;
}

export interface SpacesEditorFormatContext {
    name: string;
    ctime: number;
    mtime: number;
    version: string;
    author: string;
}

export class SpacesEditorFormat {
    context: SpacesEditorFormatContext;    
    forms: FormRoot[];
    layout: SpacesEditorLayout;
}

