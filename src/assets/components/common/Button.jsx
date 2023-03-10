import { Link } from "react-router-dom";

export const Button = ({ href, text, icon, className = "", handleClick }) => {
  return (
    <Link
      className={`${className} bg-p1 px-5 w-max py-2 text-caption md:text-normal text-p3 hover:text-n1 flex items-center gap-3 rounded-btn shadow-lv1`}
      to={href}
      onClick={handleClick}
    >
      {text}
      {icon}
    </Link>
  );
};
