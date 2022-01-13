import app from './app';
import * as dotenv from 'dotenv';
import { logger } from './utils/';
import { MySQLDatabase } from './database';

dotenv.config();

const PORT = Number(process.env.PORT);
if (!PORT) {
    process.exit(1);
}

const ENVIRONMENT = process.env.ENVIRONMENT;

/**
 * Initialize database
 */
const initDatabase = async (): Promise<void> => {
    const isSuccess = await MySQLDatabase.createConnection();
    if (!isSuccess) {
        logger.appLogger.info('Database initialization failed.');
        process.exit(1);
    }
};

app.listen(PORT, () => {
    void initDatabase();

    logger.initAppLogFolder();

    if (ENVIRONMENT === 'dev') {
        const cyan = '\x1b[36m%s\x1b[0m';
        console.log(cyan,`========== PassSword API is running on port ${PORT} ==========`);
    }

    if (ENVIRONMENT === 'prod') {
        logger.appLogger.info('PassSword API starts.');
    }
});
