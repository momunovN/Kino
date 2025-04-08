import React from "react";
import "./header.scss";
import "../App.css";
import Logo from "../assets/images/logo.svg";

const Header = () => {
  return (
    <div className="header-items">
      <div className="logo-logIn">
        <div>
          <img src={Logo} alt="" />
          KINO
        </div>

        <button className="btn-login">Войти</button>
      </div>
    </div>
  );
};

export default Header;
