import { Link } from "react-router-dom";

export const Button = ({ text, icon, className = "" }) => {
  return (
    <Link
      className={`${className} bg-p1 px-5 w-max py-2 text-lg text-p3 hover:text-n1 flex items-center gap-3 rounded-btn shadow-lv1`}
    >
      {text}
      {icon}
    </Link>
  );
};
