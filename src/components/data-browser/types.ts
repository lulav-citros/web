export interface ItemUrlParams {
    organizationSlug: string;
    repoName: string;
    filePath?: string;
}

export interface IBrowserItem {
    id: string;
    name: string;
    
    folders: string[],
    filename: string,

    idFolder?: boolean;
    
    bucket?: string;
    contentType?: string;
    crc32c?: string;
    etag?: string;
    generation?: string;
    kind?: string;
    md5Hash?: string;
    mediaLink?: string;
    metageneration?: string;
    selfLink?: string;
    size?: string;
    storageClass?: string;
    timeCreated?: string;
    timeStorageClassUpdated?: string;
    updated?: string;    
}

export interface IFile extends IBrowserItem {
    content: string;
}
