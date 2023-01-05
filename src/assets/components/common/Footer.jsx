import Logo from "../../images/logo.svg";
import { FooLink, SocailLink } from "./NavLink";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-s1 p-3 w-full border-b-2 border-p3 relative z-10">
      <div className="container flex gap-8 mx-auto items-center justify-between">
        <div className="mx-auto md:m-0 w-auto lg:flex items-center gap-12">
          <img className="w-52 md:w-36" src={Logo} alt="BOBIO" />
          <p className="text-n1 hidden lg:block text-h1 font-rocknroll">
            用BOBIO就有庇佑
          </p>
        </div>

        <div className="flex flex-col flex-1 md:flex-initial">
          <ul className="hidden flex-col border-b border-n1 pb-4 gap-4 items-end md:flex-row md:gap-12 md:flex">
            <li>
              <FooLink text={"立即祈願"} color={"text-n1"} href={"/pray"} />
            </li>
            <li>
              <FooLink text={"線上求籤"} color={"text-n1"} />
            </li>
            <li>
              <FooLink text={"平安符願"} color={"text-n1"} />
            </li>
            <li>
              <FooLink text={"添香結緣"} color={"text-n1"} />
            </li>
          </ul>
          <div className="flex flex-col md:flex-row justify-between border-b border-n1 py-4 gap-6 md:items-end">
            <div className="flex flex-col gap-2">
              <p className="text-n1 text-base">bobio@temple.com</p>
              <p className="text-n1 text-base">02-1090-1090</p>
            </div>
            <div className="flex gap-4">
              <SocailLink icon={<FaFacebookF className="fill-n1" />} />
              <SocailLink icon={<FaInstagram className="fill-n1" />} />
              <SocailLink icon={<FaYoutube className="fill-n1" />} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
