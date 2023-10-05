import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

function AuthorizedPage({ children, role = null }) {
  const auth = useAuth()
  const [userRoles, setUserRoles] = useState([])

  useEffect(() => {
    setUserRoles(auth.user?.profile?.resource_access?.[auth.settings.client_id]?.roles)
  }, [auth.user?.profile?.resource_access?.[auth.settings.client_id]?.roles])


  if (auth.isAuthenticated) {
    if (role == null) {
      return (children)
    } else if (role != null) {
      if (userRoles?.includes(role)) {
        return (children)
      } else {
        return (
          <h1>sorry, you are not authorized to see this page</h1>
        )
      }
    }
  } else if (!auth.isLoading) {
    auth.signinRedirect()
  }
}

export default AuthorizedPage
