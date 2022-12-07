import React from 'react';
import App from './components/App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {ApolloProvider} from 'react-apollo';
// import client from './client';

const link = new HttpLink({uri: "http://localhost:4000/"});
const cache = new InMemoryCache();

const client = new ApolloClient({
    link, cache
})

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    // <ApolloProvider client={client}>
        <App />
    // </ApolloProvider>
    );