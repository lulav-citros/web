import axios from '../../utils/axios';
import { Kernel, KernelSpec } from '@jupyterlab/services';

// Citros Jupyter proxy api for ui (wrapping citros user context)
// axios.url = self hostname

export async function getKernelSpecs(): Promise<KernelSpec.ISpecModels> {
    const axiosResponse = await axios.get<KernelSpec.ISpecModels>(`/api/kernelspecs`);
    return axiosResponse.data;
}

export async function getKernel(kernelId: string): Promise<Kernel.IModel | null> {
    try {
        const axiosResponse = await axios.get<Kernel.IModel>(`/api/kernels/${kernelId}`);
        return axiosResponse.data;
    } catch (e) {
        return null;
    }
}

export async function createKernel(kernelName: string, notebookId: string): Promise<Kernel.IModel> {
    try {
        const axiosResponse = await axios.post<Kernel.IModel>(`/api/kernels`, { kernelName, notebookId });
        return axiosResponse.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
