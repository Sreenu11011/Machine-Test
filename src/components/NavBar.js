import React from "react";
import { withRouter } from "react-router-dom";

const NavBar = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
    console.log(props);
  };
  return (
    <div className="navbar">
      <ul>
        <li>
          <a onClick={logoutHandler}>LogOut</a>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavBar);
