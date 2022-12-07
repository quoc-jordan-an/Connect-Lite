import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

const link = new HttpLink({uri: "http://localhost:4000/"});
const cache = new InMemoryCache();

const client = new ApolloClient({
    link, cache
})

const query = gql`
{
    users {
        name
        skills {
          skill_name
        }
    }
}
`

client.query({query})
    .then(result = console.log(result))

export default client;