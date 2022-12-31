import { Link } from "react-router-dom";

export const NavLink = ({ href, text, color }) => {
  return (
    <Link
      className={`p-1.5 ${color} relative text-xl md:text-base before:absolute before:w-5/6 before:mx-auto before:bg-p1 before:rounded-lg before:bottom-0 before:h-0.5 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-700 hover:text-p1 `}
      to={href}
    >
      {text}
    </Link>
  );
};

export const FooLink = ({ href, text, color }) => {
  return (
    <Link className={`${color} text-base hover:text-p1 `} to={href}>
      {text}
    </Link>
  );
};

export const SocailLink = ({ icon }) => {
  return <Link className="p-2 border rounded-full">{icon}</Link>;
};
