import { deepFreeze } from './helpers';

/** Application constants */
const CONSTANTS = {
    /** HTTP status codes */
    HTTP_STATUS_CODES: {
        SUCCESS: {
            OK_200: 200,
            CREATED_201: 201
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
    APP_LOG_FOLDER_NAME: 'logs'
};

deepFreeze(CONSTANTS);
export default CONSTANTS;
