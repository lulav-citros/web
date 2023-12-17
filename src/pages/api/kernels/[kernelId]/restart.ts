import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    MethodNotAllowedError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../../utils/apiHttpError';
import { kernelApi } from '../../../../server/jupyter';
import { extractJwtPayload } from '../../../../server/auth';
import { extractedQueryParam } from '../../../../server/utils/params';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const kernelId = extractedQueryParam(req, 'kernelId');

    if (!kernelId) {
        return resolveApiErrorResponse(res, new BadRequestError('kernelId param is missing'));
    }

    if (req.method !== 'POST') {
        return resolveApiErrorResponse(res, new MethodNotAllowedError(req.method || 'Unknown'));
    }

    const user = extractJwtPayload(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    try {
        const model = await kernelApi.restart(kernelId);
        res.status(200).json(model);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError('Kernel does not exist.'));
    }
}
