// ----------------------------------------------------------------------

import { GridStrategyProcessingApi } from '@mui/x-data-grid/hooks/core/strategyProcessing';

import { Distribution, DistributionType, DistributionParamType } from './distribution';
import { number } from 'yup';
import { type } from 'os';

// https://danielbarta.com/literal-iteration-typescript/
export const ParameterTypes = ['STRING', 'INT', 'FLOAT', 'BOOL'] as const;
export type ParameterType = (typeof ParameterTypes)[number];

export type ParameterSetting = {
    id?: string;

    parameterSetupId: string;
    nodeParameterId: string; //the id of the parameter

    distType: DistributionType;
    param1Type: DistributionParamType;
    param1: string;
    param2Type?: DistributionParamType;
    param2?: string;

    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;
};

export type ParameterSetup = {
    id: string;
    // project_id: string;

    name: string;
    description: string;
    createdAt?: Date | string | number;
    updatedAt: Date | string | number;

    parameterSettings: ParameterSetting[];
};

// ----------------------------------------------------------------------
export type Launch = {
    id: string;
    rosPackageId: string;

    name: string;
    path: string;

    description: string;

    createdAt: Date | string | number;
    updatedAt: Date | string | number;
};

export type Parameter = {
    id?: string;
    rosNodeId: string;

    name: string;
    parameterType: ParameterType;

    value?: any;

    description?: string;
    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;
};

export type RosNode = {
    id: string;
    rosPackageId: string;

    // cover: string;
    name: string;
    entryPoint: string;
    // package: string;
    createdAt: Date | string | number;
    updatedAt: Date | string | number;

    path: string;

    // for UI
    parameters: Parameter[];
};

export type RosPackage = {
    id: string;
    RepoId: string;

    name: string;
    path: string;
    setupPy: string;
    maintainer: string;
    maintainerEmail: string;
    description: string;
    license: string;

    readme: string;
    git: string;

    createdAt: Date | string | number;
    updatedAt: Date | string | number;

    nodes: RosNode[];
    // for UI
    launches: Launch[];
};

export type User = {
    id: string;
    organizationId: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive?: string;
    role: {
        id?: string;
        role?: string;
    };
    createdAt?: string;
    updatedAt?: string;
};

export type Repo = {
    id: string;

    organizationId: string;
    userId: string;
    user?: User;

    cover: string;
    name: string;

    isActive: boolean;
    description: string;
    createdAt: Date | string | number;
    updatedAt: Date | string | number;
    git: string;
    path: string;
    readme: string;
    license: string;
    branch?: string;

    // for UI
    packages: RosPackage[];
    launches: Launch[];
    parameterSetups: ParameterSetup[];

    batchRunsCount: number;
    batchRunsCountDone: number;
};

export type SimulationRun = {
    id: string;
    message: string;
    status: string;
    metadata: string;
    createdAt: string;
    updatedAt: string;
};
export type BatchRun = {
    id: string;
    name: string;
    message: string;

    simulation: string;

    completions: string;
    parallelism: string;

    image: string;
    tag: string;

    citrosCommit: string;
    citrosBranch: string;

    userCommit: string;
    userBranch: string;

    cpu: string;
    gpu: string;

    memory: string;
    metadata: string;
    storageType: string;

    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };

    organization: {
        id: string;
        name: string;
        slug: string;
    };

    repo: {
        name: string;
    };

    status: string;
    simulationRunsCountDone: {
        totalCount: number;
    };
    simulationRunsCount: {
        totalCount: number;
    };
    createdAt: string;
    updatedAt: string;
    simulationRunsList?: SimulationRun[];

    dataLastAccess: string;
    dataStatus: string;
};
// ----------------------------------------------------------------------

export type RepoState = {
    isLoading: boolean;
    error: Error | string | null;

    Repos: Repo[];
    Repo: Repo | null;

    tags: string[] | null;

    sortBy: string | null;
    filters: {
        tags: string[];
    };
};

export type RepoFilter = {
    tags: string[];
};
