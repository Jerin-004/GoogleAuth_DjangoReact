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
            <div style={{position:"fixed", right:"90%"}}>
              Welcome {userInfo?.username} !
              <div style={{position:"fixed",left:"90%"}}>
                <Link to="/logout/">
                  Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <GoogleLoginButton />
          </div>
        )}
      </span>

    </div>
  );
};

export default Navbar;
