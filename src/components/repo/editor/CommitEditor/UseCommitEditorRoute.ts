import { useRouter } from 'next/router';
import { FileEditorRoute } from './types';
import { getFileExtension, getFolders, toFileExtensionEnum, toFileSchematicsType } from './file.utils';

export function useCommitEditorRoute(): FileEditorRoute {
    const { query, asPath } = useRouter();

    const isFolder = asPath[asPath?.length - 1] === '/';

    const branch = query.branch as string;
    const type = query.type as FileEditorRoute['type'];
    const repoName = query.repo_name as string;
    const filePath = (query.filepath as string[]) || [];

    const folders = getFolders(filePath);
    const fileName = !isFolder ? (filePath[filePath.length - 1] || '').split('.')?.[0] : undefined;
    const ext = getFileExtension(filePath);

    const fileType = toFileExtensionEnum(ext || '');
    const schemaType = toFileSchematicsType({ fileType, folders });
    // console.log("vova schemaType", schemaType)
    const permission = 'READ';

    return {
        asPath,
        type,
        branch,
        repoName,
        filePath,
        folders,
        fileName,
        ext,
        fileType,
        schemaType,
        permission,
    };
}
