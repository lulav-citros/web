import { AuthJwtPayload } from './types';
import { NextApiRequest } from 'next';
import { decodeJwt } from 'jose';

export function extractJwtPayload(req: NextApiRequest) {
    if (!req.headers.authorization) {
        return null;
    }

    const jwtPayload = decodeJwt(req.headers.authorization) as AuthJwtPayload;

    return jwtPayload;
}

export function extractRequestJwtPayload(req: Request) {
    const authorization = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!authorization) {
        return null;
    }

    const jwtPayload = decodeJwt(authorization) as AuthJwtPayload;

    return jwtPayload;
}
