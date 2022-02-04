import { deepFreeze } from './helpers';

/** Application constants */
const CONSTANTS = {
    /** HTTP status codes */
    HTTP_STATUS_CODES: {
        SUCCESS: {
            OK_200: 200,
            CREATED_201: 201,
        },
        CLIENT_ERROR: {
            BAD_REQUEST_400: 400,
            UNAUTHORIZED_401: 401,
            FORBIDDEN_403: 403,
            NOT_FOUND_404: 404,
        },
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR_500: 500,
        },
    },
    LOG_FOLDER_NAME: 'logs',
    APPLICATION_LOG_FILE_NAME: 'app',
    MODULE_LOG_FOLDER_NAME: 'modules',
};
deepFreeze(CONSTANTS);

/** API routes */
const ROUTES = {
    USER: {
        MODULE: '/user',
        LOGIN: '/login',
        PROFILE: '/profile'
    },
};
deepFreeze(ROUTES);

/** Application messages */
const MESSAGES = {
    /** Successful messages */
    SUCCESS: {
        /** Common successful message */
        SUCCESS: 'success',
    },
    /** Error messages */
    ERROR: {
        /** 400 Bad Request */
        BAD_REQUEST: 'err_bad_request',
        /** 404 Not Found */
        RESOURCE_NOT_FOUND: 'err_resource_not_found',
        /** 500 Internal Server Error */
        INTERNAL_SERVER_ERROR: 'err_internal_server_error',
        /** No data was found */
        NO_DATA: 'err_no_data',
        /** Login failed */
        LOGIN_FAILED: 'err_login_failed',
        /** Unauthenticated request */
        UNAUTHENTICATED: 'err_unauthenticated',
    },
    /** Validation error messages */
    VALIDATION: {
        INCORRECT_FORMAT: 'incorrect_format',
        REQUIRED: 'required',
    },
};
deepFreeze(MESSAGES);

export { CONSTANTS, ROUTES, MESSAGES };
