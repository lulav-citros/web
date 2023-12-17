import { CommitContext, FileEditorRoute } from './types';

export function generateCommitEditorRouteTitle(context: CommitContext, editorRoute: FileEditorRoute) {
    return `${context.organizationSlug}/${editorRoute.repoName} - ${
        editorRoute.filePath[editorRoute.filePath?.length === 0 ? editorRoute.filePath?.length : 0] ||
        editorRoute.branch
    }`;
}
