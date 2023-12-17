export const DistributionTypes = [
    'NORMAL',
    'EXPONENTIAL',
    'LAPLACE',
    'POISSON',
    'POWER',
    'UNIFORM',
    'ZIPF',
    'VONMISES',
    'RAYLEIGH',
    'CONST',
    'STRING',
    'INT',
    'FLOAT',
] as const;
export type DistributionType = (typeof DistributionTypes)[number];

export const DistributionParamTypes = ['INT', 'FLOAT', 'STRING'];
export type DistributionParamType = (typeof DistributionParamTypes)[number];

export type DistributionParam = {
    name: string;
    type: DistributionParamType;
    value: any;
    description: string;
};
export type Distribution = {
    type: DistributionType;
    description: string;
    params: DistributionParam[];
    link: string;
};

export const distributionsDict: { [key: string]: Distribution } = {
    NORMAL: {
        type: 'NORMAL',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.normal.html',
        description: 'Drawn samples from the parameterized normal distribution.',
        params: [
            {
                name: 'loc',
                type: 'FLOAT',
                value: 0.0,
                description: 'Mean (“centre”) of the distribution.',
            },
            {
                name: 'scale',
                type: 'FLOAT',
                value: 1.0,
                description: 'Standard deviation (spread or “width”) of the distribution. Must be non-negative.',
            },
        ],
    },
    EXPONENTIAL: {
        type: 'EXPONENTIAL',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.exponential.html#',
        description: 'Drawn samples from the parameterized exponential distribution.',
        params: [
            {
                name: 'scale',
                type: 'FLOAT',
                value: 0.0,
                description: 'The scale parameter, betha= 1/gamma . Must be non-negative.',
            },
        ],
    },
    LAPLACE: {
        type: 'LAPLACE',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.laplace.html',
        description: 'Drawn samples from the parameterized Laplace distribution.',
        params: [
            {
                name: 'loc',
                type: 'FLOAT',
                value: 0.0,
                description: 'The position, meu , of the distribution peak. Default is 0.',
            },
            {
                name: 'scale',
                type: 'FLOAT',
                value: 1.0,
                description: 'the exponential decay. Default is 1. Must be non- negative.',
            },
        ],
    },
    POISSON: {
        type: 'POISSON',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.poisson.html',
        description: 'Drawn samples from the parameterized Poisson distribution.',
        params: [
            {
                name: 'lam',
                type: 'FLOAT',
                value: 1.0,
                description:
                    'Expected number of events occurring in a fixed-time interval, must be >= 0. A sequence must be broadcastable over the requested size.',
            },
        ],
    },
    POWER: {
        type: 'POWER',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.power.html',
        description: 'Drawn samples from the parameterized power distribution.',
        params: [
            {
                name: 'a',
                type: 'FLOAT',
                value: 1.0,
                description: 'Parameter of the distribution. Must be non-negative.',
            },
        ],
    },
    UNIFORM: {
        type: 'UNIFORM',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.uniform.html',
        description: 'Drawn samples from the parameterized uniform distribution.',
        params: [
            {
                name: 'low',
                type: 'FLOAT',
                value: 0.0,
                description:
                    'Lower boundary of the output interval. All values generated will be greater than or equal to low. The default value is 0.',
            },
            {
                name: 'high',
                type: 'FLOAT',
                value: 1.0,
                description:
                    'Upper boundary of the output interval. All values generated will be less than or equal to high.',
            },
        ],
    },
    ZIPF: {
        type: 'ZIPF',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.zipf.html',
        description: 'Drawn samples from the parameterized Zipf distribution.',
        params: [
            {
                name: 'a',
                type: 'FLOAT',
                value: 1.1,
                description: 'Distribution parameter. Must be greater than 1.',
            },
        ],
    },
    VONMISES: {
        type: 'VONMISES',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.vonmises.html',
        description: 'Drawn samples from the parameterized von Mises distribution.',
        params: [
            {
                name: 'mu',
                type: 'FLOAT',
                value: 0.0,
                description: 'Mode (“center”) of the distribution.',
            },
            {
                name: 'kappa',
                type: 'FLOAT',
                value: 1.0,
                description: 'Dispersion of the distribution, has to be >=0.',
            },
        ],
    },
    RAYLEIGH: {
        type: 'RAYLEIGH',
        link: '',
        description: 'Drawn samples from the parameterized Rayleigh distribution.',
        params: [
            {
                name: 'scale',
                type: 'FLOAT',
                value: 1.0,
                description: 'Scale, also equals the mode. Must be non-negative. Default is 1.',
            },
        ],
    },
    CONST: {
        type: 'CONST',
        link: '',
        description: 'a constant value',
        params: [
            {
                name: 'c',
                type: 'FLOAT',
                value: 0.0,
                description: 'The constant value to be returnd.',
            },
        ],
    },
    STRING: {
        type: 'STRING',
        link: '',
        description: 'a string value',
        params: [
            {
                name: 'STRING',
                type: 'STRING',
                value: '',
                description: 'The constant string value to be returnd.',
            },
        ],
    },
    STR: {
        type: 'STRING',
        link: '',
        description: 'a string value',
        params: [
            {
                name: 'STRING',
                type: 'STRING',
                value: '',
                description: 'The constant string value to be returnd.',
            },
        ],
    },
    INT: {
        type: 'INT',
        link: '',
        description: 'a string value',
        params: [
            {
                name: 'int',
                type: 'INT',
                value: 0,
                description: 'The constant int value to be returnd.',
            },
        ],
    },
    FLOAT: {
        type: 'FLOAT',
        link: '',
        description: 'a string value',
        params: [
            {
                name: 'float',
                type: 'FLOAT',
                value: 0.0,
                description: 'The constant float value to be returnd.',
            },
        ],
    },
};

export const distributionList: Distribution[] = [];

Object.keys(distributionsDict).map((k) => {
    distributionList.push(distributionsDict[k]);
});
