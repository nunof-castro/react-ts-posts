import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/index.scss";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
