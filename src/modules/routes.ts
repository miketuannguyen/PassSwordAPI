import { deepFreeze } from '../utils/helpers';

/** API routes */
const ROUTES = {
    USER: {
        MODULE: '/user',
    },
};

deepFreeze(ROUTES);
export default ROUTES;
