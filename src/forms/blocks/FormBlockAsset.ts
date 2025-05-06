import { AssetElt } from "../../assets/assets.model";
import { IndexType } from "../../core/core.model";
import { FormBlock } from "./FormBlock";

export interface FormBlockAsset extends FormBlock<AssetElt> {
    type: "asset";
    root?: IndexType;
    index?: IndexType;
}