import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_API_KEY, // Backend URL
  }),
  cache: new InMemoryCache(),
});
