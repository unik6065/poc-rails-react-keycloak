import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

function AuthorizedPage({ children }) {
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return (children)
  } else if (!auth.isLoading) {
    auth.signinRedirect()
  }
}

export default AuthorizedPage
