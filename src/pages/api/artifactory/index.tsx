import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../utils/apiHttpError';

import * as fs from 'fs';
import axios from 'axios';
import { ArtifactRegistryClient } from '@google-cloud/artifact-registry';
import { getUser } from '../util';

// Images
// type image = {
//     name: string;
//     description?: string;
//     tags?: string[];
//     created: string;
//     updated: string;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log('vovacooper images');

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    // console.log("user", user)

    const client = new ArtifactRegistryClient();

    const projectId = 'citros';
    const location = 'us-central1';

    //https://www.npmjs.com/package/@google-cloud/artifact-registry
    const resp = await client.listPackages({
        parent: `projects/${projectId}/locations/${location}/repositories/${user.organization_slug}`,
    });

    if (resp.length < 1) {
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }

    for (let i = 0; i < resp[0].length; i++) {
        resp[0][i].displayName = resp[0][i].name?.split('/').pop();
    }

    try {
        res.status(200).json(resp[0]);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }
}
