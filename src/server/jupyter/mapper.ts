import { AuthJwtPayload } from '../auth';
import { JUPYTER_CONFIG } from '../../config';
import { Kernel, KernelAPI } from '@jupyterlab/services';
import { AxiosRequestConfig } from 'axios';

/*
  Kernel ENV
  https://jupyter-enterprise-gateway.readthedocs.io/en/latest/users/kernel-envs.html

  https://jupyter-enterprise-gateway.readthedocs.io/en/latest/operators/deploy-kubernetes.html#kubernetes-resource-quotas

  KERNEL_CPUS - CPU Request by Kernel
  KERNEL_MEMORY - MEMORY Request by Kernel
  KERNEL_GPUS - GPUS Request by Kernel

  KERNEL_CPUS_LIMIT - CPU Limit
  KERNEL_MEMORY_LIMIT - MEMORY Limit
  KERNEL_GPUS_LIMIT - GPUS Limit

  KERNEL_ORGANIZATION_ID
  KERNEL_TENANT
  KERNEL_USER_ID
  KERNEL_USERNAME

  KERNEL_NOTEBOOK_ID
*/

/**
 * get all kernel models from jupyter gateway
 */
export function toGetKernelsRequest() {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}`,
        method: 'get',
    };
}

/**
 * get single kernel model from jupyter gateway
 */
export function toGetKernelRequest(kernelId: string) {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}/${kernelId}`,
        method: 'get',
    };
}

/**
 * create and start new kernel in jupyter gateway
 * @param notebookId: NotebookEntity.id
 * @param kernelName: kernelspecModel.name
 * @param authUser: from jwt
 */
export function toCreateKernelRequest(
    notebookId: string,
    kernelName: string,
    { user_first_name, user_last_name, user_id, organization_slug, organization_id }: AuthJwtPayload,
    access_key: string
): AxiosRequestConfig<{ name: string; env: any }> {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}`,
        method: 'post',
        data: {
            env: {
                KERNEL_USERNAME: organization_slug + '-' + user_first_name + '-' + user_last_name,
                KERNEL_NAMESPACE: 'kernel-ns',
                KERNEL_CPUS: '1',

                KERNEL_ORGANIZATION_ID: organization_id,
                KERNEL_TENANT: organization_slug,
                KERNEL_USER_ID: user_id,
                KERNEL_NOTEBOOK_ID: notebookId,

                KERNEL_CITROS_ACCESS_KEY: access_key,
            },
            name: kernelName,
        },
    };
}

/**
 * interrupt kernel from jupyter gateway
 */
export function toInterruptKernelRequest(kernelId: string) {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}/${kernelId}/interrupt`,
        method: 'post',
    };
}

/**
 * restart kernel from jupyter gateway
 */
export function toRestartKernelRequest(kernelId: string) {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}/${kernelId}/restart`,
        method: 'post',
    };
}

/**
 * delete/shutdown kernel from jupyter gateway
 */
export function toDeleteKernelRequest(kernelId: string) {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/${KernelAPI.KERNEL_SERVICE_URL}/${kernelId}`,
        method: 'delete',
    };
}

// --------------------------------------------------
// KERNEL_SPECS

/**
 * get kernel specs model from jupyter gateway
 */
export function toGetKernelSpecsRequest() {
    return {
        url: `${JUPYTER_CONFIG.gatewayUrl}/api/kernelspecs`,
        method: 'get',
    };
}
