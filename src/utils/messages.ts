import { deepFreeze } from './helpers';

/** Application messages */
const MESSAGES = {
    SUCCESS: {
        SUCCESS: 'SUCCESS'
    },
    ERROR: {
        /** "404 Not Found" error message */
        ERR_RESOURCE_NOT_FOUND: 'ERR_RESOURCE_NOT_FOUND',
        /** "500 Internal Server Error" error message */
        ERR_INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER_ERROR',
        ERR_NO_DATA: 'ERR_NO_DATA'
    },
};

deepFreeze(MESSAGES);
export default MESSAGES;
