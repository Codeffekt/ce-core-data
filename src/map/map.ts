import { CoreIndexElt } from "../core/core.model";
import { GeoJSONFeatureCollection } from "../geojson/geojson";

export type MapLayerType = "Cluster"|"image"|"raster";

export type RemoteDataFormat = "DRILLINGS";

export type RemoteData = {
    url?: string;
    format?: RemoteDataFormat;    
};

export type MapLayerMode = "GEOMETRY" | "RENDER" | "STYLE";

export type MapLayerEditorConfig = {
    mode: MapLayerMode;
};

export type MapLayerPopupStyle = "name_description" | "template";

export interface MapLayer extends CoreIndexElt {    
    name: string;
    description?: string;
    rank?: number;
    displayOnLoad: boolean;
    browsable: boolean;
    remoteData?: RemoteData;
    color: string;
    type?: MapLayerType;
    heat?: any;
    cluster?: any;
    geojson?: GeoJSONFeatureCollection;        
    iconClass: string;
    iconUrl: string;
    popupStyle?: MapLayerPopupStyle;
    popupContentTemplate?: string; 
    editor: MapLayerEditorConfig;   
}

export type MapTileType = "raster"|"wms"|"mapbox";

export interface MapTile extends CoreIndexElt {    
    name: string;
    minZoom?: number;
    maxZoom?: number;
    attribution?: string;
    type: MapTileType;
    tileSize?: number;
    tiles?: string[];
    thumbnail?: string;
    layers?: string;
    tms?: boolean;
    url?: string;
    visible: boolean;
    opacity: number;
    format?: string;
    version?: string;
    subdomains?: string[];
    transparent?: boolean;
}

export type MapConfigTokens = {
    mapbox: string;
};

export interface MapConfig extends CoreIndexElt {
    position: any;
    name: string;
    description: string;
    zoom: number;
    scrollWheelZoom: boolean;
    scaleControl: boolean;
    moreControl: boolean;
    miniMap: boolean;
    displayPopupFooter: boolean;
    licence: string;
    layers: MapLayer[];
    tilesLayers: MapTile[];
    limitBounds: any[];
    captionBar: boolean;
    slideshow: any[];
    zoomControl: boolean;
    datalayersControl: boolean;
    searchControl: boolean;
    fullscreenControl: boolean;
    embedControl: boolean;
    easing: boolean;
    public: boolean;
    tokens: MapConfigTokens;
}
