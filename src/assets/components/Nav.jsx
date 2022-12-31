import { Outlet } from "react-router-dom";
import { Footer } from "./common/Footer";
import { NavBar } from "./common/NavBar";

export const Nav = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
