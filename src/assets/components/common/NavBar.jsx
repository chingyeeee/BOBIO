import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";
import Logo from "../../images/logo.svg";
import { HiShoppingCart, HiUserCircle, HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  function handleDisplayMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header className="bg-nav border-t-2 border-p1 p-3 md:p-2 fixed z-10 w-full">
      <nav className="container mx-auto flex items-center gap-4">
        <Link to={"/"} className="flex-1 md:flex-initial md:w-12">
          <img src={Logo} alt="BOBIO" />
        </Link>
        <ul
          className={`flex flex-col absolute h-[calc(100vh_-_66px)] w-screen top-16 items-center gap-10 pt-20 md:pt-0 md:items-start ${
            showMenu ? "left-0" : "left-full"
          } transition-translate duration-700 bg-nav md:bg-transparent  md:h-auto md:static md:flex-row md:ml-5 md:gap-6 flex-1`}
        >
          <li>
            <NavLink color="text-p3" text="立即祈願" href={"/pray"} />
          </li>
          <li>
            <NavLink color="text-p3" text="線上求籤" />
          </li>
          <li>
            <NavLink color="text-p3" text="平安符願" />
          </li>
          <li>
            <NavLink color="text-p3" text="添香結緣" />
          </li>
        </ul>
        <Link to={"#"}>
          <HiShoppingCart className="fill-p3 hover:fill-p1" size={"1.35rem"} />
        </Link>
        <Link to={"#"}>
          <HiUserCircle className="fill-p3 hover:fill-p1" size={"1.35rem"} />
        </Link>
        <HiMenuAlt3
          className="block md:hidden fill-p3 cursor-pointer hover:fill-p1"
          size={"1.35rem"}
          onClick={handleDisplayMenu}
        />
      </nav>
    </header>
  );
};
