import { NextApiRequest, NextApiResponse } from 'next';
import { InternalServerError, resolveApiErrorResponse, UnauthorizedError } from '../../../utils/apiHttpError';
import { extractJwtPayload } from '../../../server/auth';
import { kernelSpecApi } from '../../../server/jupyter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await get(req, res);
            break;
        default:
            resolveApiErrorResponse(res);
    }
}

/**
 * Get user opened kernels
 * @param req
 * @param res
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
    const user = extractJwtPayload(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    try {
        const specModels = await kernelSpecApi.getKernelSpec();
        res.status(200).json(specModels);
    } catch (e) {
        console.error(e);
        return resolveApiErrorResponse(res, new InternalServerError());
    }
}
