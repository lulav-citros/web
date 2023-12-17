import { KernelSpec } from '@jupyterlab/services';
import axios from 'axios';
import { toGetKernelSpecsRequest } from './mapper';

// TODO @jupyter/service/KernelspecAPI.getKernelSpec
export async function getKernelSpec(): Promise<Array<KernelSpec.ISpecModels>> {
    const request = toGetKernelSpecsRequest();

    const axiosResponse = await axios.request<Array<KernelSpec.ISpecModels>>(request);

    return axiosResponse.data;
}
