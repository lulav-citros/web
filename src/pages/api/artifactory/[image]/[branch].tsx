import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../../utils/apiHttpError';

import * as fs from 'fs';
import axios from 'axios';
import { ArtifactRegistryClient } from '@google-cloud/artifact-registry';
import { getUser } from '../../util';

const GoogleToken = require('gtoken').GoogleToken;
const gtoken = new GoogleToken({
    // keyFile: '/Users/vovacooper/dev/citros/citros/bin/secrets/citros-api/.gcloud/citros-9d2872dd1e1a.json', //dev
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scope: ['https://www.googleapis.com/auth/cloud-platform'],
    eagerRefreshThresholdMillis: 5 * 60 * 1000,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { branch, image } = req.query;

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    const client = new ArtifactRegistryClient(gtoken);

    const projectId = 'citros';
    const location = 'us-central1';

    try {
        let resp = await client.getTag(
            {
                name: `projects/${projectId}/locations/${location}/repositories/${user.organization_slug}/packages/${image}/tags/${branch}`,
                // name: `projects/${projectId}/locations/${location}/repositories/${'lulav'}/packages/${image}/tags/${branch}`,
            },
            { autoPaginate: false }
        );
        console.log('getTag', resp, resp.length);
        const versionName = resp[0]['version'];
        if (!versionName) {
            return {};
        }

        resp = await client.getVersion(
            {
                name: versionName,
                view: 'FULL',
            },
            { autoPaginate: false }
        );
        res.status(200).json(resp[0]);
    } catch (err) {
        console.error(err);
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }
}
