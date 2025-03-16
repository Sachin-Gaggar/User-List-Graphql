import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import awsExports from './aws-exports';

const client = new ApolloClient({
  link: new HttpLink({
    uri: awsExports.aws_appsync_graphqlEndpoint,
    headers: {
      'x-api-key': awsExports.aws_appsync_apiKey,
    },
  }),
  cache: new InMemoryCache(),
});

export {ApolloProvider, client};
