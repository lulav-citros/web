import { NumpyFunctionObj } from './types';

export const numpyRandomFunctions: string[] = [
    'numpy.random.rand',
    'numpy.random.randn',
    'numpy.random.randint',
    'numpy.random.random_integers',
    'numpy.random.random_sample',
    'numpy.random.random',
    'numpy.random.ranf',
    'numpy.random.sample',
    'numpy.random.choice',
    'numpy.random.bytes',
    'numpy.random.shuffle',
    'numpy.random.permutation',
    'numpy.random.beta',
    'numpy.random.binomial',
    'numpy.random.chisquare',
    'numpy.random.dirichlet',
    'numpy.random.exponential',
    'numpy.random.f',
    'numpy.random.gamma',
    'numpy.random.geometric',
    'numpy.random.gumbel',
    'numpy.random.hypergeometric',
    'numpy.random.laplace',
    'numpy.random.logistic',
    'numpy.random.lognormal',
    'numpy.random.logseries',
    'numpy.random.multinomial',
    'numpy.random.multivariate_normal',
    'numpy.random.negative_binomial',
    'numpy.random.noncentral_chisquare',
    'numpy.random.noncentral_f',
    'numpy.random.normal',
    'numpy.random.pareto',
    'numpy.random.poisson',
    'numpy.random.power',
    'numpy.random.rayleigh',
    'numpy.random.standard_cauchy',
    'numpy.random.standard_exponential',
    'numpy.random.standard_gamma',
    'numpy.random.standard_normal',
    'numpy.random.standard_t',
    'numpy.random.triangular',
    'numpy.random.uniform',
    'numpy.random.vonmises',
    'numpy.random.wald',
    'numpy.random.weibull',
    'numpy.random.zipf',
    'numpy.random.seed',
    'numpy.random.default_rng',
    'numpy.random.bit_generator',
];

export const numpyRandomFunctionsUPD: NumpyFunctionObj[] = [
    {
        name: 'numpy.random.rand',
        description:
            'rand(d0, d1, ..., dn)\
            \
            Random values in a given shape.\
            \
            Create an array of the given shape and populate it with random samples from a uniform distribution over `[0, 1)`.\
            \
            Parameters:\
            d0, d1, ..., dn : int, optional\
            The dimensions of the returned array, must be non-negative.\
            If no argument is given a single Python float is returned.\
            \
            Returns:\
            out : ndarray, shape `(d0, d1, ..., dn)`\
            Random values.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.rand.html',
    },
    {
        name: 'numpy.random.randn',
        description:
            'randn(d0, d1, ..., dn)\
            \
            Return a sample (or samples) from the "standard normal" distribution.\
            \
            If positive int_like arguments are provided, `randn` generates an array of shape `(d0, d1, ..., dn)`, filled with random floats sampled from a univariate "normal" (Gaussian) distribution of mean 0 and variance 1. A single float randomly sampled from the distribution is returned if no argument is provided.\
            \
            Parameters:\
            d0, d1, ..., dn : int, optional\
            The dimensions of the returned array, must be non-negative.\
            If no argument is given a single Python float is returned.\
            \
            Returns:\
            Z : ndarray or float\
            A `(d0, d1, ..., dn)`-shaped array of floating-point samples from the standard normal distribution, or a single such float if no parameters were supplied.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.randn.html',
    },
    {
        name: 'numpy.random.randint',
        description:
            'randint(low, high=None, size=None, dtype=int)\
            \
            Return random integers from `low` (inclusive) to `high` (exclusive).\
            \
            Return random integers from the "discrete uniform" distribution of the specified dtype in the "half-open" interval [`low`, `high`). If `high` is None (the default), then results are from [0, `low`).\
            \
            Parameters:\
            low : int or array-like of ints\
            Lowest (signed) integers to be drawn from the distribution (unless `high=None`, in which case this parameter is one above the `highest` such integer).\
            high : int or array-like of ints, optional\
            If provided, one above the largest (signed) integer to be drawn from the distribution (see above for behavior if `high=None`).\
            If array-like, must contain integer values\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            dtype : dtype, optional\
            Desired dtype of the result. Byteorder must be native.\
            The default value is int.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.randint.html',
    },
    {
        name: 'numpy.random.random_sample',
        description:
            'random_sample(size=None)\
            \
            Return random floats in the half-open interval [0.0, 1.0).\
            \
            Results are from the "continuous uniform" distribution over the stated interval.  To sample :math:`Unif[a, b), b > a` multiply the output of `random_sample` by `(b-a)` and add `a`:\
            \
            (b - a) * random_sample() + a\
            \
            Parameters:\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            \
            Returns:\
            out : float or ndarray of floats\
            Array of random floats of shape `size` (unless `size=None`, in which case a single float is returned).',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.random_sample.html',
    },
    {
        name: 'numpy.random.random',
        description:
            'random(size=None)\
            Return random floats in the half-open interval [0.0, 1.0). Alias for  random_sample to ease forward-porting to the new random API.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.random.html',
    },
    {
        name: 'numpy.random.ranf',
        description: 'This is an alias of `random_sample`. See `random_sample` for the complete documentation.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.ranf.html',
    },
    {
        name: 'numpy.random.sample',
        description: 'This is an alias of `random_sample`. See `random_sample`  for the complete documentation.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.sample.html',
    },
    {
        name: 'numpy.random.choice',
        description:
            'choice(a, size=None, replace=True, p=None)\
            \
            Generates a random sample from a given 1-D array\
            \
            Parameters:\
            a : 1-D array-like or int\
            If an ndarray, a random sample is generated from its elements.\
            If an int, the random sample is generated as if it were `np.arange(a)`\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            replace : boolean, optional\
            Whether the sample is with or without replacement. Default is True, meaning that a value of `a` can be selected multiple times.\
            p : 1-D array-like, optional\
            The probabilities associated with each entry in a.\
            If not given, the sample assumes a uniform distribution over all\
            entries in `a`.\
            \
            Returns:\
            samples : single item or ndarray\
            The generated random samples',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.choice.html',
    },
    {
        name: 'numpy.random.bytes',
        description:
            'bytes(length)\
            \
            Return random bytes.\
            \
            Parameters:\
            length : int\
            Number of random bytes.\
            \
            Returns:\
            out : bytes\
            String of length `length`.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.bytes.html',
    },
    {
        name: 'numpy.random.permutation',
        description:
            'permutation(x)\
            \
            Randomly permute a sequence, or return a permuted range.\
            \
            If `x` is a multi-dimensional array, it is only shuffled along its first index.\
            \
            Parameters:\
            x : int or array_like\
            If `x` is an integer, randomly permute `np.arange(x)`.\
            If `x` is an array, make a copy and shuffle the elements randomly.\
            \
            Returns:\
            out : ndarray\
            Permuted sequence or array range.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.permutation.html',
    },
    {
        name: 'numpy.random.beta',
        description:
            'beta(a, b, size=None)\
            \
            Draw samples from a Beta distribution.\
            \
            The Beta distribution is a special case of the Dirichlet distribution, and is related to the Gamma distribution.\
            \
            Parameters:\
            a : float or array_like of floats\
            Alpha, positive (>0).\
            b : float or array_like of floats\
            Beta, positive (>0).\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `a` and `b` are both scalars.\
            Otherwise, `np.broadcast(a, b).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized beta distribution.\
            \
            See Also:\
            random.Generator.beta: which should be used for new code.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.beta.html',
    },
    {
        name: 'numpy.random.binomial',
        description:
            'binomial(n, p, size=None)\
            \
            Draw samples from a binomial distribution.\
            \
            Samples are drawn from a binomial distribution with specified parameters, n trials and p probability of success where n an integer >= 0 and p is in the interval [0,1]. (n may be input as a float, but it is truncated to an integer in use)\
            \
            Parameters:\
            n : int or array_like of ints\
            Parameter of the distribution, >= 0. Floats are also accepted, but they will be truncated to integers.\
            p : float or array_like of floats\
            Parameter of the distribution, >= 0 and <=1.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default), a single value is returned if `n` and `p` are both scalars.\
            Otherwise, `np.broadcast(n, p).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized binomial distribution, where each sample is equal to the number of successes over the n trials.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.binomial.html',
    },
    {
        name: 'numpy.random.chisquare',
        description:
            'chisquare(df, size=None)\
            \
            Draw samples from a chi-square distribution.\
            \
            When `df` independent random variables, each with standard normal distributions (mean 0, variance 1), are squared and summed, the resulting distribution is chi-square. This distribution is often used in hypothesis testing.\
            \
            Parameters:\
            df : float or array_like of floats\
            Number of degrees of freedom, must be > 0.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `df` is a scalar. Otherwise, `np.array(df).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized chi-square distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.chisquare.html',
    },
    {
        name: 'numpy.random.dirichlet',
        description:
            'dirichlet(alpha, size=None)\
            \
            Draw samples from the Dirichlet distribution.\
            \
            Draw `size` samples of dimension k from a Dirichlet distribution. A Dirichlet-distributed random variable can be seen as a multivariate generalization of a Beta distribution. The Dirichlet distribution is a conjugate prior of a multinomial distribution in Bayesian inference.\
            \
            Parameters:\
            alpha : sequence of floats, length k Parameter of the distribution (length `k` for sample of length `k`).\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n)`, then `m * n * k` samples are drawn. Default is None, in which case a vector of length `k` is returned.\
            \
            Returns:\
            samples : ndarray,\
            The drawn samples, of shape `(size, k)`.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.dirichlet.html',
    },
    {
        name: 'numpy.random.exponential',
        description:
            'exponential(scale=1.0, size=None)\
            \
            Draw samples from an exponential distribution.\
            \
            Parameters:\
            scale : float or array_like of floats\
            The scale parameter, `beta = 1/lambda`. Must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape. If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default),\
            a single value is returned if ``scale`` is a scalar. Otherwise, `np.array(scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized exponential distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.exponential.html',
    },
    {
        name: 'numpy.random.f',
        description:
            'f(dfnum, dfden, size=None)\
            \
            Draw samples from an F distribution.\
            \
            Samples are drawn from an F distribution with specified parameters,\
            `dfnum` (degrees of freedom in numerator) and `dfden` (degrees of\
            freedom in denominator), where both parameters must be greater than\
            zero.\
            \
            The random variate of the F distribution (also known as the\
            Fisher distribution) is a continuous probability distribution\
            that arises in ANOVA tests, and is the ratio of two chi-square\
            variates.\
            \
            Parameters:\
            dfnum : float or array_like of floats\
            Degrees of freedom in numerator, must be > 0.\
            dfden : float or array_like of float\
            Degrees of freedom in denominator, must be > 0.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default), a single value is returned if `dfnum` and `dfden` are both scalars.\
            Otherwise, `np.broadcast(dfnum, dfden).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Fisher distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.f.html',
    },
    {
        name: 'numpy.random.gamma',
        description:
            'gamma(shape, scale=1.0, size=None)\
            \
            Draw samples from a Gamma distribution.\
            \
            Samples are drawn from a Gamma distribution with specified parameters,\
            `shape` (sometimes designated "k") and `scale` (sometimes designated\
            "theta"), where both parameters are > 0.\
            \
            Parameters:\
            shape : float or array_like of floats\
            The shape of the gamma distribution. Must be non-negative.\
            scale : float or array_like of floats, optional\
            The scale of the gamma distribution. Must be non-negative.\
            Default is equal to 1.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `shape` and `scale` are both scalars.\
            Otherwise, `np.broadcast(shape, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized gamma distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.gamma.html',
    },
    {
        name: 'numpy.random.geometric',
        description:
            'geometric(p, size=None)\
            \
            Draw samples from the geometric distribution.\
            \
            Bernoulli trials are experiments with one of two outcomes:\
            success or failure (an example of such an experiment is flipping a coin).  The geometric distribution models the number of trials that must be run in order to achieve success.  It is therefore supported on the positive integers, `k = 1, 2, ...`.\
            \
            Parameters:\
            p : float or array_like of floats\
            The probability of success of an individual trial.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `p` is a scalar.  Otherwise, `np.array(p).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized geometric distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.geometric.html',
    },
    {
        name: 'numpy.random.gumbel',
        description:
            'gumbel(loc=0.0, scale=1.0, size=None)\
            \
            Draw samples from a Gumbel distribution.\
            \
            Draw samples from a Gumbel distribution with specified location and scale.  For more information on the Gumbel distribution, see Notes and References below.\
            \
            Parameters:\
            loc : float or array_like of floats, optional\
            The location of the mode of the distribution. Default is 0.\
            scale : float or array_like of floats, optional\
            The scale parameter of the distribution. Default is 1. Must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `loc` and `scale` are both scalars.\
            Otherwise, `np.broadcast(loc, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Gumbel distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.gumbel.html',
    },
    {
        name: 'numpy.random.hypergeometric',
        description:
            'hypergeometric(ngood, nbad, nsample, size=None)\
            \
            Draw samples from a Hypergeometric distribution.\
            \
            Samples are drawn from a hypergeometric distribution with specified\
            parameters, `ngood` (ways to make a good selection), `nbad` (ways to make\
            a bad selection), and `nsample` (number of items sampled, which is less\
            than or equal to the sum `ngood + nbad`).\
            \
            Parameters:\
            ngood : int or array_like of ints\
            Number of ways to make a good selection. Must be nonnegative.\
            nbad : int or array_like of ints\
            Number of ways to make a bad selection. Must be nonnegative.\
            nsample : int or array_like of ints\
            Number of items sampled.  Must be at least 1 and at most `ngood + nbad`.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `ngood`, `nbad`, and `nsample` are all scalars. Otherwise, `np.broadcast(ngood, nbad, nsample).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized hypergeometric distribution. Each sample is the number of good items within a randomly selected subset of size `nsample` taken from a set of `ngood` good items and `nbad` bad items.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.hypergeometric.html',
    },
    {
        name: 'numpy.random.laplace',
        description:
            'laplace(loc=0.0, scale=1.0, size=None)\
            \
            Draw samples from the Laplace or double exponential distribution with specified location (or mean) and scale (decay).\
            \
            The Laplace distribution is similar to the Gaussian/normal distribution, but is sharper at the peak and has fatter tails. It represents the difference between two independent, identically distributed exponential random variables.\
            \
            Parameters:\
            loc : float or array_like of floats, optional\
            The position, `mu`, of the distribution peak. Default is 0.\
            scale : float or array_like of floats, optional\
            `lambda`, the exponential decay. Default is 1. Must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default), a single value is returned if `loc` and `scale` are both scalars.\
            Otherwise, `np.broadcast(loc, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Laplace distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.laplace.html',
    },
    {
        name: 'numpy.random.logistic',
        description:
            'logistic(loc=0.0, scale=1.0, size=None)\
            \
            Draw samples from a logistic distribution.\
            \
            Samples are drawn from a logistic distribution with specified parameters, loc (location or mean, also median), and scale (>0).\
            \
            Parameters:\
            loc : float or array_like of floats, optional Parameter of the distribution. Default is 0.\
            scale : float or array_like of floats, optional\
            Parameter of the distribution. Must be non-negative. Default is 1.\
            size : int or tuple of ints, optional\
            Output shape. If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default), a single value is returned if `loc` and `scale` are both scalars.\
            Otherwise, `np.broadcast(loc, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized logistic distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.logistic.html',
    },
    {
        name: 'numpy.random.lognormal',
        description:
            'lognormal(mean=0.0, sigma=1.0, size=None)\
            \
            Draw samples from a log-normal distribution.\
            \
            Draw samples from a log-normal distribution with specified mean, standard deviation, and array shape.  Note that the mean and standard deviation are not the values for the distribution itself, but of the underlying normal distribution it is derived from.\
            \
            Parameters:\
            mean : float or array_like of floats, optional\
            Mean value of the underlying normal distribution. Default is 0.\
            sigma : float or array_like of floats, optional\
            Standard deviation of the underlying normal distribution. Must be non-negative. Default is 1.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn. If size is `None` (default), a single value is returned if `mean` and `sigma` are both scalars.\
            Otherwise, `np.broadcast(mean, sigma).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized log-normal distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.lognormal.html',
    },
    {
        name: 'numpy.random.logseries',
        description:
            'logseries(p, size=None)\
            \
            Draw samples from a logarithmic series distribution.\
            \
            Samples are drawn from a log series distribution with specified shape parameter, 0 <= `p` < 1.\
            \
            Parameters:\
            p : float or array_like of floats\
            Shape parameter for the distribution.  Must be in the range [0, 1).\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `p` is a scalar.  Otherwise, `np.array(p).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized logarithmic series distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.logseries.html',
    },
    {
        name: 'numpy.random.multinomial',
        description:
            'multinomial(n, pvals, size=None)\
            \
            Draw samples from a multinomial distribution.\
            \
            The multinomial distribution is a multivariate generalization of the binomial distribution. Take an experiment with one of `p` possible outcomes. An example of such an experiment is throwing a dice, where the outcome can be 1 through 6. Each sample drawn from the distribution represents `n` such experiments. Its values, `X_i = [X_0, X_1, ..., X_p]`, represent the number of times the outcome was `i`.\
            \
            Parameters:\
            n : int\
            Number of experiments.\
            pvals : sequence of floats, length p\
            Probabilities of each of the `p` different outcomes. These must sum to 1 (however, the last element is always assumed to account for the remaining probability, as long as `sum(pvals[:-1]) <= 1)`.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            \
            Returns:\
            out : ndarray\
            The drawn samples, of shape `size`, if that was provided. If not, the shape is `(N,)`.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.multinomial.html',
    },
    {
        name: 'numpy.random.multivariate_normal',
        description:
            "multivariate_normal(mean, cov, size=None, check_valid='warn', tol=1e-8)\
            \
            Draw random samples from a multivariate normal distribution.\
            \
            The multivariate normal, multinormal or Gaussian distribution is a generalization of the one-dimensional normal distribution to higher dimensions.  Such a distribution is specified by its mean and covariance matrix.  These parameters are analogous to the mean (average or \"center\") and variance (standard deviation, or \"width,\" squared) of the one-dimensional normal distribution.\
            \
            Parameters:\
            mean : 1-D array_like, of length N\
            Mean of the N-dimensional distribution.\
            cov : 2-D array_like, of shape (N, N)\
            Covariance matrix of the distribution. It must be symmetric and positive-semidefinite for proper sampling.\
            size : int or tuple of ints, optional\
            Given a shape of, for example, `(m,n,k)`, `m*n*k` samples are generated, and packed in an `m`-by-`n`-by-`k` arrangement. Because each sample is `N`-dimensional, the output shape is `(m,n,k,N)`.\
            If no shape is specified, a single (`N`-D) sample is returned.\
            check_valid : { 'warn', 'raise', 'ignore' }, optional\
            Behavior when the covariance matrix is not positive semidefinite.\
            tol : float, optional\
            Tolerance when checking the singular values in covariance matrix. cov is cast to double before the check.\
            \
            Returns:\
            out : ndarray\
            The drawn samples, of shape *size*, if that was provided. If not, the shape is `(N,)`.",
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.multivariate_normal.html',
    },
    {
        name: 'numpy.random.negative_binomial',
        description:
            'negative_binomial(n, p, size=None)\
            \
            Draw samples from a negative binomial distribution.\
            \
            Samples are drawn from a negative binomial distribution with specified parameters, `n` successes and `p` probability of success where `n` is > 0 and `p` is in the interval [0, 1].\
            \
            Parameters:\
            n : float or array_like of floats\
            Parameter of the distribution, > 0.\
            p : float or array_like of floats\
            Parameter of the distribution, >= 0 and <=1.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `n` and `p` are both scalars. Otherwise, `np.broadcast(n, p).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized negative binomial distribution, where each sample is equal to N, the number of failures that occurred before a total of n successes was reached.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.negative_binomial.html',
    },
    {
        name: 'numpy.random.noncentral_chisquare',
        description:
            'noncentral_chisquare(df, nonc, size=None)\
            \
            Draw samples from a noncentral chi-square distribution.\
            \
            The noncentral :math:`chi^2` distribution is a generalization of the `chi^2` distribution.\
            \
            Parameters:\
            df : float or array_like of floats\
            Degrees of freedom, must be > 0.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized noncentral chi-square distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.noncentral_chisquare.html',
    },
    {
        name: 'numpy.random.noncentral_f',
        description:
            'noncentral_f(dfnum, dfden, nonc, size=None)\
            \
            Draw samples from the noncentral F distribution.\
            \
            Samples are drawn from an F distribution with specified parameters, `dfnum` (degrees of freedom in numerator) and `dfden` (degrees of\
            freedom in denominator), where both parameters > 1. `nonc` is the non-centrality parameter.\
            \
            Parameters:\
            dfnum : float or array_like of floats\
            Numerator degrees of freedom, must be > 0.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized noncentral Fisher distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.noncentral_f.html',
    },
    {
        name: 'numpy.random.normal',
        description:
            'normal(loc=0.0, scale=1.0, size=None)\
            \
            Draw random samples from a normal (Gaussian) distribution.\
            \
            The probability density function of the normal distribution, first derived by De Moivre and 200 years later by both Gauss and Laplace independently, is often called the bell curve because of its characteristic shape (see the example below).\
            \
            The normal distributions occurs often in nature.  For example, it describes the commonly occurring distribution of samples influenced by a large number of tiny, random disturbances, each with its own unique distribution.\
            \
            Parameters:\
            loc : float or array_like of floats\
            Mean ("centre") of the distribution.\
            scale : float or array_like of floats\
            Standard deviation (spread or "width") of the distribution. Must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `loc` and `scale` are both scalars.\
            Otherwise, `np.broadcast(loc, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized normal distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.normal.html',
    },
    {
        name: 'numpy.random.pareto',
        description:
            'pareto(a, size=None)\
            \
            Draw samples from a Pareto II or Lomax distribution with specified shape.\
            \
            The Lomax or Pareto II distribution is a shifted Pareto distribution. The classical Pareto distribution can be obtained from the Lomax distribution by adding 1 and multiplying by the scale parameter `m`. The smallest value of the Lomax distribution is zero while for the classical Pareto distribution it is `mu`, where the standard Pareto distribution has location `mu = 1`.  Lomax can also be considered as a simplified version of the Generalized Pareto distribution (available in SciPy), with the scale set to one and the location set to zero.\
            \
            The Pareto distribution must be greater than zero, and is unbounded above.  It is also known as the "80-20 rule". In this distribution, 80 percent of the weights are in the lowest 20 percent of the range, while the other 20 percent fill the remaining 80 percent of the range.\
            \
            Parameters:\
            a : float or array_like of floats\
            Shape of the distribution. Must be positive.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `a` is a scalar. Otherwise, `np.array(a).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Pareto distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.pareto.html',
    },
    {
        name: 'numpy.random.poisson',
        description:
            'poisson(lam=1.0, size=None)\
            \
            Draw samples from a Poisson distribution.\
            \
            The Poisson distribution is the limit of the binomial distribution for large N.\
            \
            Parameters:\
            lam : float or array_like of floats\
            Expected number of events occurring in a fixed-time interval, must be >= 0. A sequence must be broadcastable over the requested size.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if ``lam`` is a scalar. Otherwise,\
            `np.array(lam).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Poisson distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.poisson.html',
    },
    {
        name: 'numpy.random.power',
        description:
            'power(a, size=None)\
            \
            Draws samples in [0, 1] from a power distribution with positive exponent a - 1.\
            \
            Also known as the power function distribution.\
            \
            Parameters:\
            a : float or array_like of floats\
            Parameter of the distribution. Must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape. If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if ``a`` is a scalar.  Otherwise, `np.array(a).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized power distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.power.html',
    },
    {
        name: 'numpy.random.rayleigh',
        description:
            'rayleigh(scale=1.0, size=None)\
            \
            Draw samples from a Rayleigh distribution.\
            \
            The `chi` and Weibull distributions are generalizations of the Rayleigh.\
            \
            Parameters:\
            scale : float or array_like of floats, optional\
            Scale, also equals the mode. Must be non-negative. Default is 1.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if ``scale`` is a scalar.  Otherwise, `np.array(scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Rayleigh distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.rayleigh.html',
    },
    {
        name: 'numpy.random.standard_cauchy',
        description:
            'standard_cauchy(size=None)\
            \
            Draw samples from a standard Cauchy distribution with mode = 0.\
            \
            Also known as the Lorentz distribution.\
            \
            Parameters:\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            \
            Returns:\
            samples : ndarray or scalar\
            The drawn samples.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.standard_cauchy.html',
    },
    {
        name: 'numpy.random.standard_exponential',
        description:
            'standard_exponential(size=None)\
            \
            Draw samples from the standard exponential distribution.\
            \
            `standard_exponential` is identical to the exponential distribution with a scale parameter of 1.\
            \
            Parameters:\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            \
            Returns:\
            out : float or ndarray\
            Drawn samples.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.standard_exponential.html',
    },
    {
        name: 'numpy.random.standard_gamma',
        description:
            'standard_gamma(shape, size=None)\
            \
            Draw samples from a standard Gamma distribution.\
            \
            Samples are drawn from a Gamma distribution with specified parameters, shape (sometimes designated "k") and scale=1.\
            \
            Parameters:\
            shape : float or array_like of floats\
            Parameter, must be non-negative.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `shape` is a scalar. Otherwise, `np.array(shape).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized standard gamma distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.standard_gamma.html',
    },
    {
        name: 'numpy.random.standard_normal',
        description:
            'standard_normal(size=None)\
            \
            Draw samples from a standard Normal distribution (mean=0, stdev=1).\
            \
            Parameters:\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  Default is None, in which case a single value is returned.\
            \
            Returns:\
            out : float or ndarray\
            A floating-point array of shape `size` of drawn samples, or a single sample if ``size`` was not specified.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.standard_normal.html',
    },
    {
        name: 'numpy.random.standard_t',
        description:
            'standard_t(df, size=None)\
            \
            Draw samples from a standard Student"s t distribution with `df` degrees of freedom.\
            \
            A special case of the hyperbolic distribution.  As `df` gets large, the result resembles that of the standard normal distribution (`standard_normal`).\
            \
            Parameters:\
            df : float or array_like of floats\
            Degrees of freedom, must be > 0.\
            size : int or tuple of ints, optional\
            Output shape. If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `df` is a scalar. Otherwise, `np.array(df).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized standard Student"s t distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.standard_t.html',
    },
    {
        name: 'numpy.random.triangular',
        description:
            'triangular(left, mode, right, size=None)\
            \
            Draw samples from the triangular distribution over the interval `[left, right]`.\
            \
            The triangular distribution is a continuous probability distribution with lower limit left, peak at mode, and upper limit right. Unlike the other distributions, these parameters directly define the shape of the pdf.\
            \
            Parameters:\
            left : float or array_like of floats\
            Lower limit.\
            mode : float or array_like of floats\
            The value where the peak of the distribution occurs.\
            The value must fulfill the condition `left <= mode <= right`.\
            right : float or array_like of floats\
            Upper limit, must be larger than `left`.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `left`, `mode`, and `right` are all scalars.  Otherwise, `np.broadcast(left, mode, right).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized triangular distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.triangular.html',
    },
    {
        name: 'numpy.random.uniform',
        description:
            'uniform(low=0.0, high=1.0, size=None)\
            \
            Draw samples from a uniform distribution.\
            \
            Samples are uniformly distributed over the half-open interval `[low, high)` (includes low, but excludes high). In other words, any value within the given interval is equally likely to be drawn by `uniform`.\
            \
            Parameters:\
            low : float or array_like of floats, optional\
            Lower boundary of the output interval. All values generated will be greater than or equal to low. The default value is 0.\
            high : float or array_like of floats\
            Upper boundary of the output interval. All values generated will be less than or equal to high.  The high limit may be included in the returned array of floats due to floating-point rounding in the equation `low + (high-low) * random_sample()`. The default value  is 1.0.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `low` and `high` are both scalars.\
            Otherwise, `np.broadcast(low, high).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized uniform distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.uniform.html',
    },
    {
        name: 'numpy.random.vonmises',
        description:
            'vonmises(mu, kappa, size=None)\
            \
            Draw samples from a von Mises distribution.\
            \
            Samples are drawn from a von Mises distribution with specified mode (mu) and dispersion (kappa), on the interval [-pi, pi].\
            \
            The von Mises distribution (also known as the circular normal distribution) is a continuous probability distribution on the unit circle.  It may be thought of as the circular analogue of the normal distribution.\
            \
            Parameters:\
            mu : float or array_like of floats\
            Mode ("center") of the distribution.\
            kappa : float or array_like of floats\
            Dispersion of the distribution, has to be >=0.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `mu` and `kappa` are both scalars.\
            Otherwise, `np.broadcast(mu, kappa).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized von Mises distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.vonmises.html',
    },
    {
        name: 'numpy.random.wald',
        description:
            'wald(mean, scale, size=None)\
            \
            Draw samples from a Wald, or inverse Gaussian, distribution.\
            \
            As the scale approaches infinity, the distribution becomes more like a Gaussian. Some references claim that the Wald is an inverse Gaussian with mean equal to 1, but this is by no means universal.\
            \
            The inverse Gaussian distribution was first studied in relationship to Brownian motion. In 1956 M.C.K. Tweedie used the name inverse Gaussian because there is an inverse relationship between the time to cover a unit distance and distance covered in unit time.\
            \
            Parameters:\
            mean : float or array_like of floats\
            Distribution mean, must be > 0.\
            scale : float or array_like of floats\
            Scale parameter, must be > 0.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `mean` and `scale` are both scalars.\
            Otherwise, `np.broadcast(mean, scale).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Wald distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.wald.html',
    },
    {
        name: 'numpy.random.weibull',
        description:
            'weibull(a, size=None)\
            \
            Draw samples from a Weibull distribution.\
            \
            Draw samples from a 1-parameter Weibull distribution with the given shape parameter `a`.\
            \
            \
            Here, U is drawn from the uniform distribution over (0,1].\
            \
            Parameters:\
            a : float or array_like of floats\
            Shape parameter of the distribution. Must be nonnegative.\
            size : int or tuple of ints, optional\
            Output shape.  If the given shape is, e.g., `(m, n, k)`, then `m * n * k` samples are drawn.  If size is `None` (default), a single value is returned if `a` is a scalar.  Otherwise, `np.array(a).size` samples are drawn.\
            \
            Returns:\
            out : ndarray or scalar\
            Drawn samples from the parameterized Weibull distribution.',
        link: 'https://numpy.org/doc/stable/reference/random/generated/numpy.random.weibull.html',
    },
];

export const PARAMETER_TYPES = [
    'int',
    'float',
    'string',
    'array_int',
    'array_float',
    'array_string',
    'numpy_function',
    'function',
];
