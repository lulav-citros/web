import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    InternalServerError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../utils/apiHttpError';
import { kernelApi } from '../../../server/jupyter';
// @ts-ignore
import { extractJwtPayload } from '../../../server/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await get(req, res);
            break;
        case 'POST':
            await post(req, res);
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
        const models = await kernelApi.listRunning();
        res.status(200).json(models);
    } catch (e) {
        console.error(e);
        return resolveApiErrorResponse(res, new InternalServerError());
    }
}

/**
 * Kernel creation
 * https://jupyter-server.readthedocs.io/en/latest/developers/rest-api.html
 * @param req
 * @param res
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
    const user = extractJwtPayload(req);

    const access_key = req.headers.authorization?.split(' ').pop();

    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    const kernelName = req.body?.kernelName;
    if (!kernelName) {
        return resolveApiErrorResponse(res, new BadRequestError('Field kernelName cannot be empty'));
    }

    const notebookId = req.body?.notebookId || '';
    if (!notebookId) return resolveApiErrorResponse(res, new BadRequestError('Missing notebookId field'));

    try {
        // console.log("vova", notebookId, kernelName, user, access_key as string);
        const kernelModels = await kernelApi.startNew(notebookId, kernelName, user, access_key as string);

        res.status(201).json(kernelModels);
    } catch (e) {
        console.error(e);
        return resolveApiErrorResponse(res, new InternalServerError());
    }
}
