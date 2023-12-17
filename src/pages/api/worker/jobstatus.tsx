import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../utils/apiHttpError';

import { getUser } from '../util';
import { WORKER_CONFIG } from 'src/config';
import { Client } from 'pg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    const client = new Client(WORKER_CONFIG);
    await client.connect();

    try {
        const jobId = req.body.job_id;

        const data = await client.query(
            `select id, last_error, created_at, attempts from graphile_worker.jobs where id = '${jobId}'`
        );

        if (data.rowCount == 0) {
            // no job exists = done
            return res.status(200).json({
                status: 'done',
            });
        } else {
            // job exists mean: running or another attemp.
            console.log('data', data.rowCount, data.rows);
            let _status = 'running';
            if (data.rows[0].attempts > 0) {
                _status = 'error';
            }
            return res.status(200).json({
                id: data.rows[0].id,
                status: _status,
                error: data.rows[0].last_error,
            });
        }
    } catch (e) {
        console.error(e);
        return resolveApiErrorResponse(e, new InternalServerError());
    } finally {
        await client.end();
    }
}
