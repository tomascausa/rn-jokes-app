import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://icanhazdadjoke.com/graphql',
    cache: new InMemoryCache(),
});
