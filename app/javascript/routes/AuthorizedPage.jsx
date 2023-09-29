import React from "react";
import { useAuth } from "react-oidc-context";

function AuthorizedPage({ children }) {
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return (children)
  } else {
    auth.signinRedirect()
  }
}

export default AuthorizedPage
