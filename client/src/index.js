import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const HOST = window.location.hostname;

const client = new ApolloClient({
  uri: `https://${HOST}`,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
