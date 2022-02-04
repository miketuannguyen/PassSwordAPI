import { NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CONSTANTS, crypt, helpers, logger, MESSAGES, types } from '../utils';

const logFileName = 'middleware/authentication';

/**
 * Verify JWT token in request authorization headers
 * @param req - token payload is added to request if authenticated
 * @param res - response 401 to clients if unauthenticated, `next()` otherwise
 * @param next - keep handling user requests if authenticated
 */
export const tokenVerifier = (req: types.AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
    try {
        const token = req.headers.authorization;
        if (helpers.isBlank(token)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED_401).json({
                message: MESSAGES.ERROR.UNAUTHENTICATED
            });
        }

        req.payload = crypt.verifyJWTString(token);
        next();
    } catch (e) {
        //not log to file if error is just a JWT verifying error
        if (!(e instanceof JsonWebTokenError)) {
            logger.logError(logFileName, e);
        }
        return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED_401).json({
            message: MESSAGES.ERROR.UNAUTHENTICATED
        });
    }
};
