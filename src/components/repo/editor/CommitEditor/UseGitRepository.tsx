import { useCallback, useState } from 'react';
import { GitRepository } from '../../gitolite.types';
import { getGitTreeApi } from '../../gitolite.api';

export function useGitRepository() {
    const [{ gitRepository, loading, error }, setState] = useState<{
        gitRepository: GitRepository | null;
        loading: boolean;
        error: number | null;
    }>({
        error: null,
        loading: true,
        gitRepository: null,
    });

    const load = useCallback(
        ({ organizationSlug, repoName, branch }: { organizationSlug: string; repoName: string; branch: string }) => {
            getGitTreeApi({
                type: 'tree',
                organizationSlug,
                repoName,
                branch,
            })
                .then((gitTree) => {
                    setState((prevState) => ({ ...prevState, gitRepository: gitTree, loading: false }));
                })
                .catch((reason) => {
                    console.log('Unable to load git tree', reason);
                    setState((prevState) => ({ ...prevState, loading: false, error: reason.status_code }));                    
                });
        },
        []
    );

    return {
        error,
        loading,
        load,
        gitRepository,
    };
}
