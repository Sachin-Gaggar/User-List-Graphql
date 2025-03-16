import React from 'react';
import {StatusBar} from 'react-native';
import {ApolloProvider, client} from './src/graphql/client';
import AppNavigator from './src/route';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
