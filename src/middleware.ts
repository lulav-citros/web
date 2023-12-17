import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { extractRequestJwtPayload } from './server/auth';
import { removeTrailingSlash } from './utils/url';
import { resolveMiddlewareErrorResponse, UnauthorizedError } from './utils/apiHttpError';

/**
 * Main app middleware
 * @param request
 */
export function middleware(request: NextRequest) {
    // TODO
    //  move if to outer logic scope
    //  maybe add jupyter WS for kernels communication
    if (request.nextUrl.pathname.startsWith('/git/api')) {
        const user = extractRequestJwtPayload(request);

        if (!user) {
            return resolveMiddlewareErrorResponse(request, new UnauthorizedError());
        }

        const url = `http://${process.env.CITROS_GITOLITE_API}${removeTrailingSlash(
            request.nextUrl.pathname.replace('/git/api', '')
        )}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
