import { IndexType } from "../core/core.model";

export type GeoJSONFeatureCollection<T = GeoJSONPoint | GeoJSONPolygon, U = GeoJSONProperties> = {
    type: "FeatureCollection";
    features: GeoJSONFeature<T, U>[];
};

export type GeoJSONFeature<T = GeoJSONPoint | GeoJSONPolygon, U = GeoJSONProperties> = {
    id?: IndexType;
    type: "Feature";
    properties?: U;
    geometry: T;
};

export interface GeoJSONPolygon {
    type: 'Polygon';
    coordinates: number[][][];
}

export interface GeoJSONPoint {
    type: 'Point';
    coordinates: number[];
}

export type GeoJSONElt = {
    type: "Point" | "Polygon" | "LineString";
    coordinates: number[];
};

export type GeoJSONProperties = { [key: string]: string | number | boolean };

export class GeoJSONEltWrapper {
    static coordsToPoint(coords: number[]): GeoJSONPoint {
        return {
            type: "Point",
            coordinates: coords
        };
    }
}

