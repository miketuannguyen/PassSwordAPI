import { join } from 'path';
import { existsSync } from 'fs';
import { createLogger, format, transports, Logger } from 'winston';
import { CONSTANTS } from './constants';
const { combine, timestamp, prettyPrint, errors } = format;

/** Loggers of log files */
const FILE_LOGGERS: { [key: string]: Logger } = {};

/**
 * Get logger of log files of the application
 * @param fileName - file path is allowed to be included
 * @param useErrorFormat - use error format if needed, `false` be default
 * @returns file logger, create new file if not exists
 */
export const getFileLogger = (fileName: string, useErrorFormat = false) => {
    const fileNameWithExt = `${fileName}.log`;
    const fileNameWithFullPath = `${CONSTANTS.LOG_FOLDER_NAME}/${fileNameWithExt}`;
    const existence = FILE_LOGGERS[fileName];

    //return old logger if it exists and the log file exists
    if (existence && existsSync(fileNameWithFullPath)) return existence;

    const formats = [timestamp(), prettyPrint()];
    if (useErrorFormat) formats.push(errors({ stack: true }));

    FILE_LOGGERS[fileName] = createLogger({
        format: combine(...formats),
        transports: [
            new transports.File({
                filename: join(CONSTANTS.LOG_FOLDER_NAME, fileNameWithExt),
            }),
        ],
    });
    return FILE_LOGGERS[fileName];
};

/**
 * Log error to log files
 * @param fileName - file path is allowed to be included
 * @param err - the error to be logged, log stack if `err` is an `Error` instance
 */
export const logError = (fileName: string, err: any): void => {
    getFileLogger(fileName).error(err instanceof Error ? err.stack : err);
};
