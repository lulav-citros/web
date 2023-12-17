import { PATH_PAGE, PATH_REPO } from '../../../routes/paths';
import Iconify from '../../../components/iconify';

const generateConfig = (repo: string) => {
    return [
        // {
        //     title: 'overview',
        //     path: PATH_REPO.overview(repo),
        //     pathname: PATH_PAGE.repo + '/[repo_name]/overview',
        //     icon: <Iconify icon={'octicon:home-16'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        //     // caption: 'Repo Info',
        // },
        {
            title: 'code',
            path: PATH_REPO.view(repo),
            pathname: PATH_PAGE.repo + '/[repo_name]',
            icon: <Iconify icon={'octicon:code-16'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // caption: 'Code',
            deep: true,
        },
        {
            title: 'runs',
            path: PATH_REPO.batch.all(repo),
            pathname: '/batch',
            icon: <Iconify icon={'zondicons:play-outline'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // caption: 'simulation runs',
        },
        {
            title: 'images',
            path: PATH_REPO.image(repo),
            pathname: PATH_PAGE.repo + '/[repo_name]/image',
            icon: <Iconify icon={'pajamas:container-image'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // caption: 'simulation runs',
        },
        {
            title: 'data',
            path: PATH_REPO.data(repo, ''),
            pathname: PATH_PAGE.repo + '/[repo_name]/data/[[...filepath]]',
            icon: <Iconify icon={'majesticons:data-line'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // caption: 'simulation runs',
        },
        // {
        //     title: 'Reports',
        //     path: PATH_REPO.reports(repo),
        //     pathname: PATH_PAGE.repo + '/[repo_name]/reports',
        //     icon: <Iconify icon={'carbon:report'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        //     // caption: 'simulation runs',
        // },
    ];
};

export default generateConfig;
