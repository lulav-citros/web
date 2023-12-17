import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../utils/apiHttpError';

import { ArtifactRegistryClient } from '@google-cloud/artifact-registry';
import { getUser } from '../util';
import { WORKER_CONFIG } from 'src/config';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
};

// const { quickAddJob } = require('graphile-worker');
const { makeWorkerUtils } = require('graphile-worker');

let job: any = undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log('vovacooper export to pdf', req.method, req.body);

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    console.log('WORKER_CONFIG.connectionString', WORKER_CONFIG.connectionString);
    const workerUtils = await makeWorkerUtils({
        connectionString: WORKER_CONFIG.connectionString,
    });

    try {
        // await workerUtils.migrate();
        job = await workerUtils.addJob(
            // Task identifier
            'on_nbconvert',

            // Payload
            {
                organization_id: user.organization_id,
                tenant: req.body.tenant, // 'lulav',
                repo_name: req.body.repo_name, //'cannon',
                notebook_path: req.body.notebook_path, //'notebooks/test.ipynb',
                notebook_name: req.body.notebook_name, //'test',
                format: req.body.format, //'pdf',
                notebook_data: req.body.notebook_data,
            }

            // Optionally, add further task spec details here
        );
        console.log(job);

        return res.status(200).json(job);
    } catch (e) {
        console.error(e);
        return resolveApiErrorResponse(e, new InternalServerError());
    } finally {
        await workerUtils.release();
    }
}
