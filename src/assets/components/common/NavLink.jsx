import { Link } from "react-router-dom";

export const NavLink = ({ href, text, color }) => {
  return (
    <Link
      className={`p-1.5 ${color} relative before:absolute before:w-5/6 before:mx-auto before:bg-p1 before:rounded-lg before:bottom-0 before:h-0.5 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-1000 hover:text-p1 `}
      to={href}
    >
      {text}
    </Link>
  );
};
