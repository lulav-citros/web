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

const GoogleToken = require("gtoken").GoogleToken;
const gtoken = new GoogleToken({
	// keyFile: '/Users/vovacooper/dev/citros/citros/bin/secrets/citros-api/.gcloud/citros-9d2872dd1e1a.json', //dev
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
	scope: ["https://www.googleapis.com/auth/cloud-platform"],
	eagerRefreshThresholdMillis: 5 * 60 * 1000,
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.query;

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    const client = new ArtifactRegistryClient(gtoken);

    const projectId = 'citros';
    const location = 'us-central1';

    //https://www.npmjs.com/package/@google-cloud/artifact-registry
    const resp = await client.listVersions(
        {
            parent: `projects/${projectId}/locations/${location}/repositories/${user.organization_slug}/packages/${image}`,
            orderBy: 'update_time desc',
            view: 'FULL',
            pageSize: 1,
        },
        { autoPaginate: false }
    );

    // const resp = await client.listTags({
	// 	parent: `projects/${projectId}/locations/${location}/repositories/${user.organization_slug}/packages/${image}`,
	// });
	// console.info(resp);

    // console.log("resp", resp);
    try {
        res.status(200).json(resp[0]);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }
}
