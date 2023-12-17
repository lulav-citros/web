import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CITROS_API_URL } from '../config';

const getAppoloClinet = () => {
    if (!CITROS_API_URL) {
        console.error('Please add CITROS_API_URL to the environment.');
    }

    // console.info("getAppoloClinet: connecting to uri", CITROS_API_URL);
    const httpLink = createHttpLink({
        uri: CITROS_API_URL,
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('accessToken');
        // return the headers to the context so httpLink can read them
        if (token) {
            // console.log("authonticated :)");
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } else {
            // console.log("NOT! authonticated");
            return headers;
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
    // let client = new ApolloClient({
    //   cache: new InMemoryCache(),
    //   uri: process.env.CITROS_API_URL
    // });

    return client;
};

export default getAppoloClinet;
