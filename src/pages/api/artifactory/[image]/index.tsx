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

// Images
type image = {
    name: string;
    description?: string;
    tags?: string[];
    created: string;
    updated: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.query;

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());


    const client = new ArtifactRegistryClient();

    // async function callListDockerImages(projectId: string, location: string, repository: string) {
    //     // Run request
    //     // const iterable = client.listDockerImagesAsync({
    //     //     // parent: `projects/${projectId}/locations/${location}`,
    //     //     // parent: `projects/${projectId}/locations/${location}/repositories/${repository}`,
    //     //     parent: `cannon`,
    //     // });

    //     const iterable = client.listVersionsAsync({            
    //         parent: `projects/${projectId}/locations/${location}/repositories/${repository}/packages/${image}`,
    //     });
    //     // const iterable = await client.listTagsAsync({
    //     //     parent: `projects/${projectId}/locations/${location}/repositories/${repository}/packages/cannon`,
    //     // });

    //     for await (const response of iterable) {
    //         console.log(response);
    //     }
    // }
    // callListDockerImages('citros', 'us-central1', 'lulav');

    const projectId = 'citros';
    const location = 'us-central1';

    //https://www.npmjs.com/package/@google-cloud/artifact-registry
    const resp = await client.listVersions({            
        parent: `projects/${projectId}/locations/${location}/repositories/${user.organization_slug}/packages/${image}`, 
        orderBy: 'update_time desc', 
        view: 'FULL',
    });
    
    // console.log("resp", resp);
    try {
        res.status(200).json(resp[0]);
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }
}
