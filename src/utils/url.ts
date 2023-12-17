export function removeTrailingSlash(route: string) {
    return route.replace(/\/$/, '') || '/';
}
