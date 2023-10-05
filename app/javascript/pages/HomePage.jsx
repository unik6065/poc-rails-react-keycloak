import React, { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import { redirect } from "react-router-dom";

function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    auth.signinSilent();
  }, [])

  let button;
  let links;

  if (auth.isAuthenticated) {
    button = (
      <button onClick={() => void auth.signoutSilent()} >logout</button>
    )
    links = (
      <>
        <a href="/protected">go to protected page</a>
        <a href="/doctor">go to doctor page</a>
      </>
    )
  } else {
    button = (<button onClick={() => void auth.signinRedirect()}>login</button>)
  }
  return (
    <>
      {auth.user?.profile.preferred_username}
      <h1>Welcome on the homepage of my app</h1>
      {links}
      {button}
    </>
  )
}

export default HomePage
