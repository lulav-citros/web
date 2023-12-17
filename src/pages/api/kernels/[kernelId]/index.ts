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

    const user = extractJwtPayload(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    if (req.method === 'GET') {
        return await handleGet(kernelId, req, res);
    } else if (req.method === 'DELETE') {
        return await handleDelete(kernelId, req, res);
    }

    return resolveApiErrorResponse(res, new MethodNotAllowedError(req.method || 'Unknown'));
}

async function handleGet(kernelId: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const model = await kernelApi.findById(kernelId);
        return res.status(200).json(model);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError('Kernel does not exist.'));
    }
}

async function handleDelete(kernelId: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const model = await kernelApi.shutdown(kernelId);
        return res.status(200).json(model);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError('Kernel does not exist.'));
    }
}
