import * as path from 'path';
import * as fs from 'fs';
import { createLogger, format, transports } from 'winston';
import CONSTANTS from './constants';
const { combine, timestamp, prettyPrint } = format;

/**
 * Create `logs/app.log` folder if not exists
 */
export const initAppLogFolder = (): void => {
    if (!fs.existsSync(CONSTANTS.APP_LOG_FOLDER_NAME)) {
        fs.mkdirSync(CONSTANTS.APP_LOG_FOLDER_NAME);
    }
};

/** Application logger, directly log to `app.log` */
export const appLogger = createLogger({
    level: 'info',
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.File({
            filename: path.join(CONSTANTS.APP_LOG_FOLDER_NAME, '/app.log'),
        }),
    ],
});
