import { Link } from "react-router-dom";
import { NavLink } from "./common/NavLink";
import Logo from "../images/logo.svg";

export const Nav = () => {
  return (
    <header className="bg-nav border-t-2 border-p1 p-3.5">
      <nav className="container mx-auto flex items-center gap-12">
        <Link to={"/"}>
          <img src={Logo} alt="BOBIO" />
        </Link>
        <ul className="flex flex-col md:flex-row gap-4">
          <li>
            <NavLink color="text-p3" text="立即祈願" />
          </li>
          <li>
            <NavLink color="text-p3" text="線上求籤" />
          </li>
          <li>
            <NavLink color="text-p3" text="平安符願" />
          </li>
          <li>
            <NavLink color="text-p3" text="立即結緣" />
          </li>
        </ul>
        <Link to={"#"}></Link>
        <Link to={"#"}></Link>
      </nav>
    </header>
  );
};
