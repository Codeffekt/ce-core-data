import {
    AlreadyProcessingError,
    APIError, APIRouteError, APIStatusError,
    API_ERROR_PROCESSING_ERROR,
    API_ERROR_PROCESS_ALREADY_RUNNING,
    API_ERROR_PROJECT_SETTINGS,
    API_INVALID_PARAM_ERROR,
    API_PASSWD_FORMAT_ERROR,
    API_ROUTE_ERROR,
    API_STATUS_ELT_NO_FOUND,
    API_STATUS_FORMAT_ERROR,
    API_STATUS_UNAUTHORIZED,
    API_STATUS_UNKNOWN, EltNotFoundError,
    IncorrectFormatError, InvalidParamError, PasswdFormatError, 
    ProcessingError, ProjectSettingsError, UnauthorizedError
} from "../core/core.model";

type Constructor<T> = new (...args: any[]) => T;

interface FactoryMethods {
    [status: string]: Constructor<APIError>;
}

const FACTORY_METHODS: FactoryMethods = {
    [API_STATUS_UNAUTHORIZED]: UnauthorizedError,
    [API_STATUS_ELT_NO_FOUND]: EltNotFoundError,
    [API_STATUS_FORMAT_ERROR]: IncorrectFormatError,
    [API_PASSWD_FORMAT_ERROR]: PasswdFormatError,
    [API_ROUTE_ERROR]: APIRouteError,
    [API_ERROR_PROCESS_ALREADY_RUNNING]: AlreadyProcessingError,
    [API_ERROR_PROCESSING_ERROR]: ProcessingError,
    [API_INVALID_PARAM_ERROR]: InvalidParamError,
    [API_ERROR_PROJECT_SETTINGS]: ProjectSettingsError
};

export class APIErrorFactory {

    static fromAPIStatusError(statusError: APIStatusError): APIError {
        const status = statusError.status.code || API_STATUS_UNKNOWN;

        if (status === API_STATUS_UNKNOWN) {
            return APIError.fromAPIStatusError(statusError);
        }

        const classRef = FACTORY_METHODS[status];
        return new classRef(statusError.error.message, statusError.error.data);
    }

    static registerNewAPIError(code: string, error: Constructor<APIError>) {        
        FACTORY_METHODS[code] = error;
    }
}