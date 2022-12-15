import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Auth0Provider
    domain="dev-rdbgynu8c6tbjmxl.us.auth0.com"
    clientId="DDUWBVkJrx56fMo3s1HWObF1Afppu3fG"
    redirectUri={window.location.origin}
    audience="https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>
);
