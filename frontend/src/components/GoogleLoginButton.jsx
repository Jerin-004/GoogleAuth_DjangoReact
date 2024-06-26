import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { useNavigate } from 'react-router-dom'

const GoogleLoginButton = () => {
  const navigate = useNavigate()
  const handleSuccess = (codeResponse) => {
    const authorizationCode = codeResponse.code;

    fetch("http://127.0.0.1:8000/core/login-with-google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("access_token", data["access_token"]);
        localStorage.setItem("username", data["username"]);
        navigate('/')
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors in communicating with your backend server
        console.error("Error exchanging authorization code:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });

  return (
    <div>
      {/* <button onClick={() => login()}>Sign in with Google 🚀</button> */}
      <GoogleButton onClick={login} label="Sign in with Google" />
    </div>
  );
};

export default GoogleLoginButton;
