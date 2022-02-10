import { Brackets } from 'typeorm';
import { AuthenticatedUser } from 'utils/types';
import { MySQLConnection } from '../../database';
import { UserEntity } from '../../entities';
import { crypt, helpers } from '../../utils';

/**
 * Authenticate user with username / email and password
 * @param usernameEmail - `m_users.username` or `m_users.email` of the user
 * @param password - password to validate
 * @returns JWT string, blank if user is unauthenticated or error occurs
 */
export const authenticate = async (usernameEmail: string, password: string): Promise<string> => {
    if (helpers.isBlank(usernameEmail) || helpers.isBlank(password)) return '';

    const userRepo = MySQLConnection.getInstance().connection.getRepository(UserEntity);
    const user = await userRepo
        .createQueryBuilder('u')
        .select('u.username')
        .addSelect('u.email')
        .addSelect('u.password')
        .where('u.is_active = :is_active', { is_active: 1 })
        .andWhere(
            new Brackets((qb) => {
                qb.where('u.username = :username', { username: usernameEmail }).orWhere('u.email = :email', { email: usernameEmail });
            })
        )
        .getOne();
    if (helpers.isEmpty(user)) return '';

    const isMatch = crypt.bcryptCompare(password, user.password);
    if (!isMatch) return '';

    const payload: AuthenticatedUser = {
        username: user.username,
        email: user.email,
    };
    return crypt.createJWTString(payload);
};

/**
 * Get profile information of user
 * @param username - `m_users.username`
 * @returns profile information of user
 */
export const getProfile = async (username: string): Promise<UserEntity | null> => {
    if (helpers.isBlank(username)) return null;

    const userRepo = MySQLConnection.getInstance().connection.getRepository(UserEntity);
    const user = await userRepo
        .createQueryBuilder('u')
        .select('u.username')
        .addSelect('u.email')
        .addSelect('u.full_name')
        .addSelect('u.phone')
        .addSelect('u.last_login_date')
        .addSelect('u.avatar')
        .where('u.is_active = :is_active', { is_active: 1 })
        .andWhere('u.username = :username', { username: username })
        .getOne();
    return !helpers.isEmpty(user) ? user : null;
};
