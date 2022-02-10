import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as core from 'express-serve-static-core';

export type AuthenticatedUser = {
    username: string;
    email: string;
};

export interface AuthenticatedRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    payload: AuthenticatedUser & JwtPayload;
}
