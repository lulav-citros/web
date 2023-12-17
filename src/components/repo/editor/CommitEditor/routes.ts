import { PATH_REPO } from 'src/routes/paths';

export const fileEditorRoutes = {
    file: ({ repoName, branch, file }: { repoName: string; branch: string, file: string }) => PATH_REPO.blob(repoName, branch, file),
};
