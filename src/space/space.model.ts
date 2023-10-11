import { CoreIndexElt } from "../core/core.model";

export interface Space extends CoreIndexElt {    
    name: string;
    flags: string[];
    description?: string;
}