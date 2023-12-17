// ----------------------------------------------------------------------

import { User } from '@auth0/auth0-spa-js';
import { GridStrategyProcessingApi } from '@mui/x-data-grid/hooks/core/strategyProcessing';

import { Distribution, DistributionType, DistributionParamType } from './distribution';

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
    projectId: string;

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

export type Project = {
    id: string;

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

    // for UI
    packages: RosPackage[];
    launches: Launch[];
    parameterSetups: ParameterSetup[];
};

// ----------------------------------------------------------------------

export type ProjectState = {
    isLoading: boolean;
    error: Error | string | null;

    projects: Project[];
    project: Project | null;

    tags: string[] | null;

    sortBy: string | null;
    filters: {
        tags: string[];
    };
};

export type ProjectFilter = {
    tags: string[];
};
