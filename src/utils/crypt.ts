import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as helpers from './helpers';
import { AuthenticatedUser } from './types';

/**
 * Hash a string using `bcrypt`
 * @param str - a string to be encrypted
 * @returns encrypted string
 */
export const bcryptHash = (str: string) => bcrypt.hashSync(str, Number(process.env.BCRYPT_SALT_ROUNDS) || 11);

/**
 * Compare a plain text with an text which was encrypted with `bcrypt`
 * @param plainStr - plain text
 * @param encryptedStr - encrypted text
 * @returns two strings are match or not
 */
export const bcryptCompare = (plainStr: string, encryptedStr: string) => bcrypt.compareSync(plainStr, encryptedStr);

/**
 * Create a JSON Web Token string storing user payload
 * @param payload - user payload to be stored in the token
 * @returns JWT string
 */
export const createJWTString = (payload: AuthenticatedUser): string => {
    const secret = process.env.JWT_SECRET;
    if (helpers.isBlank(secret)) return '';

    const expiredTime = Number(process.env.JWT_EXPIRED_TIME);
    if (Number.isNaN(expiredTime)) return '';

    return jwt.sign(payload, secret, {
        expiresIn: expiredTime,
    });
};

/**
 * Verify a JSON Web Token string
 * @param token - the token string to be verified
 * @returns the payload contained in the token, `null` if errors
 */
export const verifyJWTString = (token: string): (jwt.JwtPayload & AuthenticatedUser) | null => {
    const secret = process.env.JWT_SECRET;
    if (helpers.isBlank(secret)) return null;

    const payload = jwt.verify(token, secret);
    return typeof payload !== 'string' ? payload as jwt.JwtPayload & AuthenticatedUser : null;
};
