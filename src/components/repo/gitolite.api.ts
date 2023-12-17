import axios from '../../utils/axios';
import { GitRepository } from './gitolite.types';

export interface GitUrlParams {
    type?: 'blob' | 'tree';
    branch: string;
    organizationSlug: string;
    repoName: string;
    filePath?: string;
}

function generateGitApiUrl({ type = 'blob', branch, organizationSlug, repoName, filePath }: GitUrlParams) {
    return `/git/api/${organizationSlug}/${repoName}/${type}/${branch}${filePath ? `/${filePath}` : ''}`;
}

export interface IGetRepositoryRequest extends GitUrlParams {
    type: 'tree';
}

export async function getGitTreeApi(params: IGetRepositoryRequest): Promise<GitRepository> {
    const axiosResponse = await axios.get(
        generateGitApiUrl({
            ...params,
            type: 'tree',
        })
    );

    return axiosResponse.data;
}

export interface IGetFileRequest extends GitUrlParams {
    type: 'blob';
}

export async function getGitFileApi(params: IGetFileRequest) {
    try {
        const axiosResponse = await axios.get(
            generateGitApiUrl({
                ...params,
                type: 'blob',
            })
        );

        return axiosResponse.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export interface IEditFileRequest extends GitUrlParams {
    fileData: string;
    name: string;
    email: string;
    message: string;
    extendedDescription: string;
}

export async function editGitFileApi({
    name,
    email,
    message,
    extendedDescription,
    fileData,
    ...params
}: IEditFileRequest) {
    try {
        const axiosResponse = await axios.post(generateGitApiUrl(params), {
            data: fileData,
            message: message + '\n\n' + extendedDescription,
            name: name,
            email: email,
        });

        return axiosResponse.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export interface IGetCommitsRequest {
    organizationSlug: string;
    repoName: string;
    filePath: string;
}

function generateGitCommitsUrl({ organizationSlug, repoName }: GitUrlParams) {
    return `/git/api/${organizationSlug}/${repoName}/branches`;
}

export async function getBranches(params: GitUrlParams) {
    try {
        const axiosResponse = await axios.get(
            generateGitCommitsUrl({
                ...params,
            })
        );

        return axiosResponse.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}
