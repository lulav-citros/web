import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export enum ApiErrorType {
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    NOT_FOUND = 'NOT_FOUND',
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const apiErrorStatusCode: Record<ApiErrorType, number> = {
    [ApiErrorType.BAD_REQUEST]: 400,
    [ApiErrorType.UNAUTHORIZED]: 403,
    [ApiErrorType.NOT_FOUND]: 404,
    [ApiErrorType.METHOD_NOT_ALLOWED]: 405,
    [ApiErrorType.INTERNAL_SERVER_ERROR]: 500,
};

export interface ApiErrorContent {
    error: ApiErrorType;
    message: string;
}

export class ApiHttpError extends Error {
    constructor(readonly type: ApiErrorType, readonly message: string) {
        super(message);
    }

    toJSON(): ApiErrorContent {
        return {
            error: this.type,
            message: this.message,
        };
    }
}

export function resolveApiErrorResponse(res: NextApiResponse, error?: ApiHttpError): void {
    if (error) {
        res.status(apiErrorStatusCode[error?.type]).json(error?.toJSON());
        return;
    }
    res.status(apiErrorStatusCode[ApiErrorType.INTERNAL_SERVER_ERROR]).json(new InternalServerError().toJSON());
}

export function resolveMiddlewareErrorResponse(req: NextRequest, error?: ApiHttpError): NextResponse {
    if (error) {
        return NextResponse.json(error.toJSON(), {
            status: apiErrorStatusCode[error.type],
        });
    }
    return NextResponse.json(new InternalServerError().toJSON(), {
        status: apiErrorStatusCode[ApiErrorType.INTERNAL_SERVER_ERROR],
    });
}

/**
 * Api errors classes
 */

export class BadRequestError extends ApiHttpError {
    constructor(message: string) {
        super(ApiErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ApiHttpError {
    constructor(item: string) {
        super(ApiErrorType.NOT_FOUND, `Item: ${item} was not found`);
    }
}

export class UnauthorizedError extends ApiHttpError {
    constructor() {
        super(ApiErrorType.UNAUTHORIZED, `Unauthorized request`);
    }
}

export class MethodNotAllowedError extends ApiHttpError {
    constructor(method: string) {
        super(ApiErrorType.METHOD_NOT_ALLOWED, `Method: ${method} not allowed`);
    }
}

export class InternalServerError extends ApiHttpError {
    constructor() {
        super(ApiErrorType.INTERNAL_SERVER_ERROR, `Unable to handle request`);
    }
}
