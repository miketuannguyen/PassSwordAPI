import { Connection, createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { UserEntity } from './entities';

export class MySQLConnection {
    /** MySQL connection singleton instance */
    private static _instance: MySQLConnection;

    /** MySQL database connection options */
    private _connectionOptions: MysqlConnectionOptions;

    /** MySQL database connection */
    public connection: Connection;

    /** Constructor */
    private constructor() {
        this._connectionOptions = {
            type: 'mysql',
            host: process.env.MYSQL_DB_HOST,
            port: Number(process.env.MYSQL_DB_PORT),
            username: process.env.MYSQL_DB_USERNAME,
            password: process.env.MYSQL_DB_PASSWORD,
            database: process.env.MYSQL_DB_DATABASE,
            entities: [UserEntity],
        };
    }

    /**
     * Get MySQL connection singleton instance
     * @returns MySQL connection
     */
    public static getInstance(): MySQLConnection {
        if (!this._instance) {
            this._instance = new MySQLConnection();
        }
        return this._instance;
    }

    /**
     * Create MySQL connection
     * @returns success / fail
     */
    public async createConnection(): Promise<boolean> {
        try {
            this.connection = await createConnection(this._connectionOptions);
            return true;
        } catch (e) {
            return false;
        }
    }
}
