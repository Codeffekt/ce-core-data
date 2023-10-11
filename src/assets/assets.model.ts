import { IndexType, CoreIndexElt } from "../core/core.model";

export interface MetaData {
    orientation?: string;
    timestamp: string;
}

export interface AssetElt extends CoreIndexElt {
    author?: IndexType;
    key?: IndexType;
    ref?: IndexType;
    name: string;
    path?: string;
    originalname?: string;
    mimetype?: string;
    size?: number;
    metadata?: MetaData;
}