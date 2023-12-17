// import { Project } from "./project";
import { ObjectId } from 'mongodb';

// ----------------------------------------------------------------------

export const SimulationStatusTypes = [
    'creating',
    'scheduled',
    'running',
    'done',
    'error',
    'terminating',
    'stopping',
    'starting',
] as const;
export type SimulationStatusType = (typeof SimulationStatusTypes)[number];

export const TestStatusTypes = [
    'creating',
    'scheduled',
    'running',
    'done',
    'error',
    'terminating',
    'stopping',
    'starting',
] as const;
export type TestStatusType = (typeof TestStatusTypes)[number];

export type SimulationRun = {
    id: string;

    testId: string;
    simulationSettingId: string;

    status: SimulationStatusType;

    stopReason: string; // exit(), timeout...

    createdAt: Date | string | number;
    updatedAt: Date | string | number;
};

export type Simulation = {
    id?: string;

    userId?: string;
    projectId: string;

    launchId: string;
    launch:{
        package:string;
        file:string;
    }
    parameter_setup: string;
    parameterSetupId: string;

    // TODO: add halt conditions. on parameter, on topic. timeout
    name: string;
    description: string;
    timeout: number;

    GPU: number;    
    CPU: number;
    MEM: number;

    storage_type: string;
    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;
};

export type TestRun = {
    id: string;
    testId: string;

    trigger: string; // UI, CI/CD pipe...
    status: TestStatusType;
    simulation_runs: SimulationRun[];

    createdAt: Date | string | number;
    updatedAt: Date | string | number;
};
//Test instance
export type Test = {
    id?: string;
    userId?: string;

    isActive: boolean;

    name: string;
    description: string;

    simulation?: Simulation;
    simulationId?: string;

    // test settings
    completions: number; // How many times to run the simulation.
    parallelism: number; // How many simulation can run in parallel
    ttl: number; // How long the simulation pod will stay alive after finish.

    triggers?: string[]; // what source will trigger the test.
    reports?: string[]; // what report to run after the test is done.

    // runs: TestRun[];

    createdAt: Date | string | number;
    updatedAt: Date | string | number;
};

// ----------------------------------------------------------------------
export type TestState = {
    isLoading: boolean;
    error: Error | string | null;

    tests: Test[];
    test: Test | null;

    runs: TestRun[];

    sortBy: string | null;
    filters: {
        tags: string[];
    };
};

export type ProjectFilter = {
    tags: string[];
};
