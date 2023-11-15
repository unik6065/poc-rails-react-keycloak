import axios from "axios";
import React from "react";
import { useAuth } from "react-oidc-context";

function ProtectedRoute() {
  const auth = useAuth();
  function getUserInfo() {
    axios.get('/user-infos', {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      }
    })
  }

  function getDoctorInfo() {
    axios.get('/doctor-infos', {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`
      }
    })
  }
  return (
    <>
      <h1>this route is protected</h1>
      <a href="/">go to homepage</a>
      <button onClick={() => getUserInfo()}>get user info</button>
      <button onClick={() => getDoctorInfo()}>get doctor info</button>
    </>
  )
}

export default ProtectedRoute
