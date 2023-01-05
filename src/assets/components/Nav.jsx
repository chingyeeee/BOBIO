import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./common/Footer";
import { NavBar } from "./common/NavBar";

export const Nav = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<h1 className="h-screen">loading...</h1>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
