import React from "react";

import '../components/header.scss'

import Header from "../components/header";
import HomePage from "../pages/HomePage";

const Main = () => {
  return (
    <main>
      <header className="header ">
        <div className="container">
          <Header />
        </div>
      </header>
      <div className="container">
        <HomePage />
      </div>
    </main>
  );
};

export default Main;
