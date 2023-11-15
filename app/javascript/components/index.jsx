import React from "react";
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "react-oidc-context";
import App from './App'
import axios from "axios";

const oidcConfig = {
  authority: "http://localhost:8080/realms/SecondRealm",
  client_id: "localApp",
  redirect_uri: "http://localhost:3000/"
}

document.addEventListener('turbo:load', () => {
  const root = createRoot(
    document.body.appendChild(document.createElement('div'))
  );
  root.render(
    <>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </>
  )
});
