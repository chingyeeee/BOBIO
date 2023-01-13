import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink } from "./NavLink";
import Logo from "../../images/logo.svg";
import { HiShoppingCart, HiUserCircle, HiMenuAlt3 } from "react-icons/hi";
import { Fragment, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState([]);

  function handleDisplayMenu() {
    setShowMenu(!showMenu);
  }

  function getSessionItems() {
    setShowCart(!showCart);
    const items = JSON.parse(sessionStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
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
          } transition-translate duration-700 bg-p2 md:bg-transparent  md:h-auto md:static md:flex-row md:ml-5 md:gap-6 flex-1`}
        >
          <li>
            <NavLink color="text-p3" text="立即祈願" href={"/pray"} />
          </li>
          <li>
            <NavLink color="text-p3" text="線上求籤" href={"/draw-lots"} />
          </li>
          <li>
            <NavLink color="text-p3" text="平安符願" href={"/amulets"} />
          </li>
          <li>
            <NavLink color="text-p3" text="添香結緣" href={"/donate-money"} />
          </li>
        </ul>
        <Link className="relative" onClick={getSessionItems}>
          <HiShoppingCart className="fill-p3 hover:fill-p1" size={"1.35rem"} />
          <Transition
            show={showCart}
            as={Fragment}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0">
              <div className="bg-n1 shadow-lv1 flex flex-col absolute top-[55px] right-[34px] rounded-xl w-60 overflow-hidden">
                {items.length === 0 ? (
                  <div className="flex items-center justify-center text-p3 text-lg py-5">
                    目前尚無商品
                  </div>
                ) : (
                  <Fragment>
                    {items.map((item, i) => {
                      return (
                        <div
                          className="flex gap-2 w-fit items-center p-3 hover:bg-p2"
                          key={i}
                        >
                          <div className="relative rounded-xl overflow-hidden w-1/3">
                            <img
                              src={getImageUrl("amulets", item.zodiacImage)}
                              alt="amulet"
                            />
                            <img
                              className="absolute inset-0 m-auto w-1/2 translate-y-1"
                              src={getImageUrl("pray/gods", item.godImage)}
                              alt="god"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-caption text-p3">客製化平安符</p>
                            <div className="flex gap-2 text-xs text-s1 items-center">
                              {item.category} | {item.zodiac}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between p-3">
                      <p className="text-caption text-p3">訂單總金額</p>
                      <p className="text-caption text-s1">
                        ${items.length * 399}
                      </p>
                    </div>
                    <Link
                      to={"/shopping-cart"}
                      className="w-full bg-p1 w-max py-3 text-caption md:text-normal text-p3 hover:text-n1 flex items-center justify-center gap-3"
                    >
                      立即結帳
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
          </Transition>
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
