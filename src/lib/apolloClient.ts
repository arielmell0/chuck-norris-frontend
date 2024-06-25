import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.CHUCK_NORRIS_GATEWAY_URL,  
  cache: new InMemoryCache()
});

export default client;