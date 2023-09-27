import React, { useEffect } from "react"
import { useAuth } from "react-oidc-context"

function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    auth.signinSilent();
  }, [])

  let button;

  if (auth.isAuthenticated) {
    button = (
      <button onClick={() => void auth.signoutSilent()} >logout</button>
    )
  } else {
    button = (<button onClick={() => void auth.signinRedirect()}>login</button>)
  }
  return (
    <>
      {auth.user?.profile.preferred_username}
      <h1>Welcome on the homepage of my app</h1>
      {button}
    </>
  )
}

export default HomePage
