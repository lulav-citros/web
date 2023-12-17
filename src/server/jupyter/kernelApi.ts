import { Kernel } from '@jupyterlab/services';
import axios from 'axios';
import { AuthJwtPayload } from '../auth';
import {
    toCreateKernelRequest,
    toDeleteKernelRequest,
    toGetKernelRequest,
    toGetKernelsRequest,
    toInterruptKernelRequest,
    toRestartKernelRequest,
} from './mapper';

// Proxy to citros Jupyter Enterprise Gateway

export async function findById(kernelId: string): Promise<Kernel.IModel> {
    const request = toGetKernelRequest(kernelId);

    const axiosResponse = await axios.request<Kernel.IModel>(request);

    return axiosResponse.data;
}

export async function listRunning(): Promise<Array<Kernel.IModel>> {
    const request = toGetKernelsRequest();

    const axiosResponse = await axios.request<Array<Kernel.IModel>>(request);

    return axiosResponse.data;
}

export async function startNew(
    notebookId: string,
    kernelName: string,
    user: AuthJwtPayload,
    access_key: string
): Promise<Kernel.IModel> {
    const request = toCreateKernelRequest(notebookId, kernelName, user, access_key);

    const axiosResponse = await axios.post<Kernel.IModel>(request.url!, request.data);

    return axiosResponse.data;
}

export async function interrupt(kernelId: string) {
    const request = toInterruptKernelRequest(kernelId);

    const axiosResponse = await axios.post<Kernel.IModel>(request.url!);
    return axiosResponse.data;
}

export async function shutdown(kernelId: string) {
    const request = toDeleteKernelRequest(kernelId);

    const axiosResponse = await axios.post<Kernel.IModel>(request.url!);
    return axiosResponse.data;
}

export async function restart(kernelId: string) {
    const request = toRestartKernelRequest(kernelId);

    const axiosResponse = await axios.post<Kernel.IModel>(request.url!);
    return axiosResponse.data;
}
