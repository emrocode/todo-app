import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
