// src/component/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar/>
      <div className="p-1">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
