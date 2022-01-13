import { Request, Response } from 'express';
import { MySQLDatabase } from '../../database';
import { UserEntity } from '../../entities';
import { CONSTANTS, helpers, MESSAGES } from '../../utils';

/**
 * Get user list
 * @param _ - request
 * @param  res - response
 * @returns user list
 */
export const getList = async (_: Request, res: Response) => {
    try {
        const manager = await MySQLDatabase.getManager();
        const userList = await manager.find(UserEntity);
        if (!helpers.isNotEmptyArray(userList)) {
            return res.status(CONSTANTS.HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST_400).json({
                status: false,
                message: MESSAGES.ERROR.ERR_NO_DATA
            });
        }

        return res.status(CONSTANTS.HTTP_STATUS_CODES.SUCCESS.OK_200).json({
            status: true,
            message: MESSAGES.SUCCESS.SUCCESS,
            data: userList,
        });
    } catch (e) {
        return res.status(CONSTANTS.HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR_500).json({
            status: false,
            message: MESSAGES.ERROR.ERR_INTERNAL_SERVER_ERROR,
        });
    }
};
