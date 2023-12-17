import { NextApiRequest } from 'next';
import { decodeJwt, JWTPayload } from 'jose';

export interface AuthJwtPayload extends JWTPayload {
    user_id: string;
    user_name: string;
    role: string;
    organization_id: string;
    organization_type: string;
    organization_slug: string;
}

interface TreeObject {
    [key: string]: any;
}

export function getUser(req: NextApiRequest) {
    if (!req.headers.authorization) {
        return null;
    }

    const jwtPayload = decodeJwt(req.headers.authorization) as AuthJwtPayload;

    return jwtPayload;
}

export function extractUserId(payload: AuthJwtPayload): string {
    return payload.user_id;
}

export function extractUserName(payload: AuthJwtPayload): string {
    return payload.user_name;
}

export function extractOrganizationId(payload: AuthJwtPayload): string {
    return payload.organization_id;
}

export function extractOrganizationName(payload: AuthJwtPayload): string {
    return payload.organization_slug;
}

export function extractedQueryParam(req: NextApiRequest, field: string) {
    const paramValue = req.query[field];
    return paramValue instanceof Array ? paramValue[0] : paramValue!;
}

export function filterData(original: TreeObject, ignoreKeys: string[]): TreeObject {
    if (typeof original !== 'object' || original === null) {
        return original;
    }
    let result: TreeObject = {};

    for (let key in original) {
        if (ignoreKeys.includes(key)) {
            continue;
        }

        if (original[key] instanceof Object) {
            if (original[key].hasOwnProperty('children')) {
                const childValue = filterData(original[key].children, ignoreKeys);
                let newValue: TreeObject = {};
                for (let innerKey in original[key]) {
                    if (innerKey !== 'children') {
                        newValue[innerKey] = original[key][innerKey];
                    }
                }
                newValue.children = childValue;
                result[key] = newValue;
            } else {
                result[key] = filterData(original[key], ignoreKeys);
            }
        } else {
            result[key] = original[key];
        }
    }

    return result;
}
