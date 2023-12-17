// used when executing messages or kernelManager.startNew
export interface JupyterKernelOptions {
    baseUrl: string;
    username: string;
}

// used when executing messages or kernelManager.startNew
export interface JupyterKernelEnvOptions {
    // User.name
    kernelUsername: string;

    // example: kernel-ns TODO to env var
    kernelNamespace: string;

    // number string
    kernelCpus: number;

    // User.organizationId
    kernelOrganizationId: string;

    // User.organizationId
    kernelTenant: string;

    // User.id
    kernelUserId: string;

    // notebook opened
    kernelNotebookId: string;
}
