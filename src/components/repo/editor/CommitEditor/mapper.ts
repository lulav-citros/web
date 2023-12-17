import { CommitContext, FileEditorRoute } from './types';
import { IGetFileRequest } from '../../gitolite.api';

export function toGetFileRequest(context: CommitContext, route: FileEditorRoute): IGetFileRequest {
    return {
        organizationSlug: context.organizationSlug,
        filePath: route.filePath.join('/'),
        repoName: route.repoName,
        branch: route.branch,
        type: 'blob',
    };
}
