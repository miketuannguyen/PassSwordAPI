import * as dotenv from 'dotenv';
import app from './app';
import { MySQLConnection } from './database';
import { CONSTANTS, logger } from './utils';

dotenv.config();

const PORT = Number(process.env.PORT);
if (!PORT) {
    process.exit(1);
}

const ENVIRONMENT = process.env.ENVIRONMENT;

/**
 * Connect to MySQL database
 */
const connectMySQL = async (): Promise<void> => {
    const isSuccess = await MySQLConnection.getInstance().createConnection();
    if (!isSuccess) {
        const errorMessage = 'xxxxxxxxxx Connect to MySQL database failed xxxxxxxxxx';
        if (ENVIRONMENT === 'dev') {
            const red = '\x1b[31m%s\x1b[31m';
            console.log(red,errorMessage);
        }

        if (ENVIRONMENT === 'prod') {
            logger.logError(CONSTANTS.APPLICATION_LOG_FILE_NAME, errorMessage);
        }
        process.exit(1);
    }
};

app.listen(PORT, () => {
    void connectMySQL();

    if (ENVIRONMENT === 'dev') {
        const cyan = '\x1b[36m%s\x1b[0m';
        console.log(cyan,`========== PassSword API is running on port ${PORT} ==========`);
    }

    if (ENVIRONMENT === 'prod') {
        logger.getFileLogger(CONSTANTS.APPLICATION_LOG_FILE_NAME).info('PassSword API starts.');
    }
});
