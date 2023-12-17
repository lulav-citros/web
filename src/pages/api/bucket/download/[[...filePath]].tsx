import { NextApiRequest, NextApiResponse } from 'next';
import {
    BadRequestError,
    NotFoundError,
    resolveApiErrorResponse,
    UnauthorizedError,
} from '../../../../utils/apiHttpError';

import * as fs from 'fs';
import axios from 'axios';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { getUser } from '../../util';

// Images
// type image = {
//     name: string;
//     description?: string;
//     tags?: string[];
//     created: string;
//     updated: string;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log('vovacooper bucket');

    const user = getUser(req);
    if (!user) return resolveApiErrorResponse(res, new UnauthorizedError());

    // console.log(" req.query:",req.query)
    let prefix = '';
    if (req.query.filePath == undefined) {
        prefix = ``;
    } else {
        const filePath: string =
            typeof req.query.filePath === 'string' ? req.query.filePath : req.query.filePath?.join('/');
        prefix = `${filePath}`;
    }

    // console.log("user", user)

    const storage = new Storage();
    // const bucket = storage.bucket('runs');

    // const files = bucket.getFiles().then((files) => {
    //     console.log("files", files);
    // });
    const options: GetSignedUrlConfig = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // const [files, nextQuery, apiResponse] = await storage.bucket(`tenant-${user.organization_slug}`).getFiles({autoPaginate: false, delimiter: "/", prefix: prefix});
    const [url] = await storage.bucket(`tenant-${user.organization_slug}`).file(prefix).getSignedUrl(options);

    // const [url] = await bucket.file(fileName).getSignedUrl(options)

    // console.log('Files:', files, nextQuery, apiResponse);
    // files.forEach((file) => {
    //     console.log(file.name);
    // });
    // console.log('Done');

    try {
        return res.status(200).json({url});
    } catch (e) {
        return resolveApiErrorResponse(res, new NotFoundError(''));
    }
}
