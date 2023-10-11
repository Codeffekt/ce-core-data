import { CoreIndexElt } from "../core/core.model";

export interface BarCode extends CoreIndexElt {
    type: string;
    text: string;    
}
