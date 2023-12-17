import { NextApiRequest } from 'next';

export function extractedQueryParam(req: NextApiRequest, field: string): string | undefined {
    const paramValue = req.query[field];
    return paramValue instanceof Array ? paramValue[0] : paramValue;
}
