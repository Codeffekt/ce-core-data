import { FormInstance } from "../forms/forms.model";
import { MapConfig } from "../map/map";
import { v4 as uuidv4 } from 'uuid';
export class Utils {
    static deepcopy<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }

    static isNumber(v: any): boolean {
        return !isNaN(parseFloat(v));
    }

    static cleanUrlEndPoint(url: string) {
        return url.replace(/\/+$/, "");
    }

    static createUnique() {
        return uuidv4();
    }
}

export type IndexType = string;

export type MapConfigElt = {
    pid: IndexType;
    data: MapConfig;
};

export interface DatabaseResults {
    rows: Array<any>;
}

export interface CoreIndexElt {
    id: IndexType;
    ctime: number; // creation time unix ms
    mtime?: number; // last modification time unix ms
}

export interface ProcessCoreIndexElt extends CoreIndexElt {
    ptime: number; // ms processing time
}

export interface BoxGeometry {
    minimum: number[]; // The minimum x, y, and z coordinates of the box.
    maximum: number[]; // The maximum x, y, and z coordinates of the box.
}
export class RouteError extends Error {

}

export const API_STATUS_UNKNOWN = "API_ERROR_UNKNOWN";
export const API_STATUS_UNAUTHORIZED = "API_ERROR_UNAUTHORIZED";
export const API_STATUS_ELT_NO_FOUND = "API_ERROR_ELT_NOT_FOUND";
export const API_STATUS_FORMAT_ERROR = "API_ERROR_FORMAT_ERROR";
export const API_PASSWD_FORMAT_ERROR = "API_ERROR_PASSWD_FORMAT_ERROR";
export const API_ROUTE_ERROR = "API_ERROR_ROUTE";
export const API_ERROR_PROCESS_ALREADY_RUNNING = "API_ERROR_PROCESS_ALREADY_RUNNING";
export const API_ERROR_PROCESSING_ERROR = "API_ERROR_PROCESSING_ERROR";
export const API_INVALID_PARAM_ERROR = "API_ERROR_INVALID_PARAM";
export const API_ERROR_PROJECT_SETTINGS = "API_ERROR_PROJECT_SETTINGS";
export interface APIStatusError {
    status: {
        code: string;
    };
    error: {
        name?: string;
        message: string;
        data?: any;
    };
}

export class APIError extends Error {

    data: any;
    returnStatus: number = 500;

    constructor(public code: string | number, message: string, data?: any) {
        super(message);
        this.data = data;
    }

    static fromAPIStatusError(statusError: APIStatusError): APIError {
        return new APIError(
            statusError.status ? statusError.status.code : API_STATUS_UNKNOWN,
            statusError.error.message,
            statusError.error.data);
    }

    toAPIStatusError(): APIStatusError {
        return {
            status: {
                code: this.code.toString(),
            },
            error: {
                message: this.message,
                data: this.data
            }
        };
    }
}

export class APIRouteError extends APIError {
    constructor(route?: string) {
        super(API_ROUTE_ERROR, "Invalid route");
    }
}

export class UnauthorizedError extends APIError {
    constructor(message: string, data: any) {
        super(API_STATUS_UNAUTHORIZED, message, data);
        this.returnStatus = 401;
    }
}

export class EltNotFoundError extends APIError {

    constructor(message: string, data: any) {
        super(API_STATUS_ELT_NO_FOUND, message, data);
    }
}

export class IncorrectFormatError extends APIError {

    constructor(message: string, data?: any) {
        super(API_STATUS_FORMAT_ERROR, message, data);
    }
}

export class PasswdFormatError extends APIError {

    constructor(message: string, data?: any) {
        super(API_PASSWD_FORMAT_ERROR, message, data);
    }
}

export class InvalidParamError extends APIError {

    constructor(message: string, data?: any) {
        super(API_INVALID_PARAM_ERROR, message, data);
    }

}

export class AlreadyProcessingError extends APIError {
    constructor(message: string, data?: any) {
        super(API_ERROR_PROCESS_ALREADY_RUNNING, message, data);
    }
}

export class ProcessingError extends APIError {
    constructor(message: string, data?: any) {
        super(API_ERROR_PROCESSING_ERROR, message, data);
    }
}

export class ProjectSettingsError extends APIError {
    constructor(message: string, data?: any) {
        super(API_ERROR_PROJECT_SETTINGS, message, data);
    }
}

export interface DataElt extends CoreIndexElt {
    ref: IndexType;
    data: any;
}

export interface DbArrayRes<T> {
    total: number;
    limit: number;
    offset: number;
    elts: T[];
    subElts?: FormInstance[];
}

export interface AggElt {
    id: IndexType;
    value: number;
}
