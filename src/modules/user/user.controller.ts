import { Request, Response } from 'express';
import { CONSTANTS, helpers, logger, MESSAGES, ROUTES, types } from '../../utils';
import { loginSchema } from './user.schema';
import * as userService from './user.service';

const logFileName = `${CONSTANTS.MODULE_LOG_FOLDER_NAME}/${ROUTES.USER.MODULE}.controller`;

/**
 * User login
 * @param req - user_name or email with password (md5 encoded) needed
 * @param res - access token
 */
export const login = async (req: Request<unknown, unknown, {
    user_name_email: string,
    password: string,
}>, res: Response) => {
    try {
        const body = req.body;

        const { error } = loginSchema.validate(body, { abortEarly: false });
        if (!helpers.isEmpty(error)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST_400).json({
                message: MESSAGES.ERROR.BAD_REQUEST,
                error: helpers.generateKeyValueError(error),
            });
        }

        const token = await userService.authenticate(body.user_name_email, body.password);
        if (helpers.isBlank(token)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED_401).json({
                message: MESSAGES.ERROR.LOGIN_FAILED,
            });
        }

        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK_200).json({
            message: MESSAGES.SUCCESS.SUCCESS,
            access_token: token
        });
    } catch (e) {
        logger.logError(logFileName, e);
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR_500).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        });
    }
};

/**
 * Get profile information of user with username in token payload
 * @param req - request is needed to be authenticated
 * @param res - profile information of user
 */
export const getProfile = async (req: types.AuthenticatedRequest, res: Response) => {
    try {
        const userName = req.payload.user_name;
        const user = await userService.getProfile(userName);
        if (helpers.isEmpty(user)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST_400).json({
                message: MESSAGES.ERROR.NO_DATA,
            });
        }

        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK_200).json({
            message: MESSAGES.SUCCESS.SUCCESS,
            data: user,
        });
    } catch (e) {
        logger.logError(logFileName, e);
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR_500).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        });
    }
};
