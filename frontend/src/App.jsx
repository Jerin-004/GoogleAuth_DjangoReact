
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import UserContext from "./context/UserContext";

import Navbar from "./components/Navbar";
import LogoutPage from "./pages/LogoutPage";



function App() {
  const clientId = '994128976416-65j28pbuce6cie3vsqih8kbgkgngs9cj.apps.googleusercontent.com'

  const [userInfo, setUserInfo] = useState([]);

  const verifyToken = async () => {
    const access_key = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");

    fetch("http://127.0.0.1:8000/core/token/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access_key }),
    }).then((response) => {
      if (response.ok) {
        setUserInfo({
          ...userInfo,
          access_token: access_key,
          username: username,
        });
      } else {
        setUserInfo({ ...userInfo, access_token: null, username: null });
      }
    });
  };

  const updateUserInfo = (value) => {
    setUserInfo(value);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/logout/" element={<LogoutPage />} />
            </Routes>
          </div>
        </GoogleOAuthProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
