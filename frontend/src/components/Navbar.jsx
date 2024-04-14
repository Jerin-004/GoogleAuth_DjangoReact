import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

import GoogleLoginButton from "./GoogleLoginButton";

const Navbar = () => {
  const { userInfo } = useContext(UserContext);
  console.log(userInfo);

  return (
    <div>
      <span>
        {userInfo.access_token ? (
          <>
            <div>
              <div style={{ position: "fixed", right: "78%"}}>
                <div style={{ paddingTop:"30px", paddingLeft:"30px"}}>Welcome {userInfo?.username} !</div>
                <div
                  style={{
                    position: "fixed",
                    left: "90%",
                    bottom:"92%",
                    backgroundColor: "aquamarine",
                    padding: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderRadius: "30px",
                  }}
                >
                  <Link to="/logout/">Logout</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="login">
            <GoogleLoginButton />
          </div>
        )}
      </span>
    </div>
  );
};

export default Navbar;
