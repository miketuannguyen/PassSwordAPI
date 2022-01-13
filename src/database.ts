import { UserEntity } from './entities';
import { Connection, createConnection } from 'typeorm';

export class MySQLDatabase {
    private static _connection: Connection;

    /** Constructor */
    private constructor() {}

    /**
     * Create MySQL connection
     * @returns success / fail
     */
    public static async createConnection(): Promise<boolean> {
        try {
            this._connection = await createConnection({
                type: 'mysql',
                host: '192.168.64.3',
                port: 3306,
                username: 'root',
                password: '123',
                database: 'pass-sword',
                entities: [UserEntity]
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get MySQL entity manager
     * @returns MySQL entity manager
     */
    public static async getManager() {
        if (!this._connection) {
            this._connection = await createConnection({
                type: 'mysql',
                host: '192.168.64.3',
                port: 3306,
                username: 'root',
                password: '123',
                database: 'pass-sword',
                entities: [UserEntity]
            });
        }
        return this._connection.manager;
    }
}
