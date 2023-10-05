import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

function AuthorizedPage({ children, role = null }) {
  const auth = useAuth()


  useEffect(() => {
    console.log(auth.user?.profile?.resource_access?.[auth.settings.client_id]?.roles || [])
  }, [auth.user])


  if (auth.isAuthenticated) {
    if (role == null) {
      return (children)
    } else if (role != null) {
      console.log(auth.user?.profile.resource_access.clientId)
    }
  } else if (!auth.isLoading) {
    auth.signinRedirect()
  }
}

export default AuthorizedPage
