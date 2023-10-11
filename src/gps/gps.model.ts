import { IndexType, CoreIndexElt } from "../core/core.model";

export const GEO_SYSTEM = "WSG84";

export interface GpsTrackElt {
    time: string; // UTC timestamp
    latitude: number;
    longitude: number;
    height: number;
}

export interface GpsTrack extends CoreIndexElt {
    elts: GpsTrackElt[];
}

export interface AddTrackEltRequest {
    id: IndexType;
    elt: GpsTrackElt;
}

