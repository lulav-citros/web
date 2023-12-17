import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type ReturnType = {
    active: boolean;
    isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
    const { pathname, asPath } = useRouter();

    // console.log("-----------------------------------");
    // console.log("pathname, asPath", pathname, asPath);

    const checkPath = path.startsWith('#');

    // console.log("checkPath", checkPath);

    const currentPath = path === '/' ? '/' : `${path}`;

    // console.log("currentPath", currentPath);

    const normalActive = (!checkPath && pathname === currentPath) || (!checkPath && asPath === currentPath);

    // console.log("normalActive", normalActive);

    const deepActive =
        (!checkPath && currentPath !== '/' && pathname.includes(currentPath)) ||
        (!checkPath && currentPath !== '/' && asPath.includes(currentPath));

    // console.log("deepActive", deepActive);

    return {
        active: deep ? deepActive || normalActive : normalActive,
        isExternalLink: path.includes('http'),
    };
}
