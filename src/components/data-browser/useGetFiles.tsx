import { removeTrailingSlash } from 'src/utils/url';
import { IBrowserItem } from './types';
import { useAxios } from 'src/utils/useAxios';

const useGetFiles = (prefix: string) => {
    const { cancel, data, error, loaded } = useAxios(`/api/bucket/browser/${prefix}`, 'GET');

    const _folders: IBrowserItem[] = [];
    const _files: IBrowserItem[] = [];

    if (data && data.prefixes) {
        // folders
        data.prefixes.map((item: string) => {
            _folders.push({
                id: item,
                name: item,
                idFolder: true,
                folders: item.split('/').slice(0, -1),
                filename: removeTrailingSlash(item).split('/').pop() as string,
            });
        });
    }

    if (data && data.items) {
        // files
        data.items.map((item: IBrowserItem) => {
            _files.push({
                ...item,
                folders: item.name.split('/').slice(0, -1),
                filename: item.name.split('/').pop() as string,
            });
        });

        _files.sort((a, b) => {
            return Date.parse(a.timeCreated as string) > Date.parse(b.timeCreated as string) ? -1 : 1
        })
    }

    // console.log('useGetFiles', _files);
    return { cancel, files: [ ..._folders, ..._files ], error, loaded };
};
export default useGetFiles;
