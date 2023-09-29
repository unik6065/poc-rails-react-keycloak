import React from "react";
import { useAuth } from "react-oidc-context";

function AuthorizedPage({ children }) {
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return (children)
  } else {
    return (
      <h1>Not authorised</h1>
    )
  }
}

export default AuthorizedPage
