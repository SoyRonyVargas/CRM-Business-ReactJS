import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { createUploadLink } from 'apollo-upload-client'

const URI = 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
    uri: URI,
})

// const uploadLink = createUploadLink({ uri : URI })

const authLink = setContext( (_, { headers } ) => {
    
    const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
        'Apollo-Require-Preflight': 'true'
      }
    }
});
  
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    
    cache: new InMemoryCache({
      addTypename: false,
    }),
});