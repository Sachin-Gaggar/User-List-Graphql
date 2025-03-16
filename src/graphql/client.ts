import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:9002/'}), // Replace with your API
  cache: new InMemoryCache(),
});

export {ApolloProvider, client};
